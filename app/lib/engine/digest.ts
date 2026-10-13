import type { BudgetRequest, Recommendation, State } from '../types';
import { addDays, diffDays } from '../dates';
import { teamBudget, type BudgetStatus } from './budgets';
import { spendInRange } from './ledger';
import { teamOutcomes, type WeeklyOutcomePoint } from './outcomes';
import { cacheHitRate, detectWaste, median, seatUsage } from './waste';
import { getRecommendations } from './recommendations';
import { usd, pct } from '../format';

export interface DigestData {
  teamId: string;
  teamName: string;
  emName: string;
  weekEnding: string;
  headline: {
    spend7dUsd: number;
    prior7dUsd: number;
    deltaPct: number | null;
    budgetUsd: number;
    mtdUsd: number;
    projectedMonthEndUsd: number;
    projectedPct: number;
    status: BudgetStatus;
  };
  outcomes: {
    costPerMergedPrUsd: number | null;
    mergedPrs: number;
    trend: WeeklyOutcomePoint[];
  };
  waste: {
    abandonedSpendUsd: number;
    revertedSpendUsd: number;
    topRunaway: Array<{ label: string; costUsd: number; outcome: string; date: string }>;
  };
  modelMix: {
    topTierSpendShare: number;
    smallSessionShare: number;
    recommendation: string;
  };
  seats: { inactiveCount: number; inactiveUsd: number; duplicateHolders: number };
  cacheHygiene: {
    teamHitRate: number | null;
    orgMedianHitRate: number | null;
    flaggedRepos: Array<{ repo: string; claudeMdLines: number }>;
  };
  openBudgetRequests: BudgetRequest[];
  recommendedAction: Recommendation | null;
  footer: string;
}

export const DIGEST_FOOTER =
  'ContextOps collects metadata only (counts, tokens, cost, PR and ticket ids). No prompts, no code, no per-person rankings. Engineers can see their own meter at any time.';

export function buildDigest(state: State, teamId: string): DigestData {
  const team = state.teams.find((t) => t.id === teamId);
  if (!team) throw new Error(`Unknown team: ${teamId}`);
  const end = state.asOf;
  const cur = spendInRange(state, addDays(end, -6), end, { teamId }).totalUsd;
  const prior = spendInRange(state, addDays(end, -13), addDays(end, -7), { teamId }).totalUsd;
  const b = teamBudget(state, teamId);
  const out = teamOutcomes(state, teamId, 30);
  const findings = detectWaste(state, 30).filter((f) => f.teamId === teamId);

  const topRunaway = findings
    .filter((f) => f.kind === 'runaway_session')
    .sort((a, c) => c.costUsd - a.costUsd)
    .slice(0, 3)
    .map((f) => ({ label: f.label, costUsd: f.costUsd, outcome: f.outcome ?? 'No PR', date: (f.at ?? end).slice(0, 10) }));

  const last7 = state.sessions.filter((s) => s.teamId === teamId && s.tool === 'claude_code' && diffDays(end, s.startedAt.slice(0, 10)) < 30 && s.kind !== 'scheduled');
  const total = last7.reduce((a, s) => a + s.costUsd, 0);
  const topTier = last7.filter((s) => s.model === 'opus').reduce((a, s) => a + s.costUsd, 0);
  const small = last7.filter((s) => s.linesChanged < 40).length;
  const modelRec = findings.some((f) => f.kind === 'top_model_small_task')
    ? `${findings.filter((f) => f.kind === 'top_model_small_task').length} small sessions ran on the top-tier model; defaulting small tasks to Sonnet is the biggest lever.`
    : 'Model mix looks balanced for task size.';

  const inactive = findings.filter((f) => f.kind === 'inactive_seat');
  const dups = findings.filter((f) => f.kind === 'duplicate_tools');
  void seatUsage;

  const orgRates = state.teams
    .map((t) => cacheHitRate(state.sessions.filter((s) => s.teamId === t.id && diffDays(end, s.startedAt.slice(0, 10)) < 21)))
    .filter((x): x is number => x !== null);
  const teamRate = cacheHitRate(state.sessions.filter((s) => s.teamId === teamId && diffDays(end, s.startedAt.slice(0, 10)) < 21));

  const recs = getRecommendations(state).filter((r) => r.status === 'identified' && (r.scope.teamId === teamId || !r.scope.teamId));
  const teamRecs = recs.filter((r) => r.scope.teamId === teamId);
  const best = (teamRecs.length ? teamRecs : recs)[0] ?? null;

  return {
    teamId,
    teamName: team.name,
    emName: team.emName,
    weekEnding: end,
    headline: {
      spend7dUsd: cur,
      prior7dUsd: prior,
      deltaPct: prior > 0 ? (cur - prior) / prior : null,
      budgetUsd: b.budgetUsd,
      mtdUsd: b.mtdUsd,
      projectedMonthEndUsd: b.projectedMonthEndUsd,
      projectedPct: b.projectedPct,
      status: b.status,
    },
    outcomes: { costPerMergedPrUsd: out.costPerMergedPrUsd, mergedPrs: out.mergedAiPrs, trend: out.trend },
    waste: { abandonedSpendUsd: out.abandonedSpendUsd, revertedSpendUsd: out.revertedSpendUsd, topRunaway },
    modelMix: { topTierSpendShare: total > 0 ? topTier / total : 0, smallSessionShare: last7.length ? small / last7.length : 0, recommendation: modelRec },
    seats: { inactiveCount: inactive.length, inactiveUsd: inactive.reduce((a, f) => a + f.monthlyImpactUsd, 0), duplicateHolders: dups.length },
    cacheHygiene: {
      teamHitRate: teamRate,
      orgMedianHitRate: orgRates.length ? median(orgRates) : null,
      flaggedRepos: state.repoConfigs.filter((r) => r.teamId === teamId && r.claudeMdLines > 200).map((r) => ({ repo: r.repo, claudeMdLines: r.claudeMdLines })),
    },
    openBudgetRequests: state.budgetRequests.filter((r) => r.teamId === teamId && r.status === 'pending'),
    recommendedAction: best,
    footer: DIGEST_FOOTER,
  };
}

const STATUS_TEXT: Record<BudgetStatus, string> = { on_track: 'on track', at_risk: 'at risk', over: 'projected over budget' };

/** Deterministic narrative used when no LLM key is configured. */
export function templateNarrative(d: DigestData): string {
  const dir = d.headline.deltaPct === null ? '' : d.headline.deltaPct >= 0 ? `up ${pct(d.headline.deltaPct)}` : `down ${pct(-d.headline.deltaPct)}`;
  const parts = [
    `${d.teamName} spent ${usd(d.headline.spend7dUsd)} on AI coding tools in the last 7 days${dir ? ` (${dir} on the prior week)` : ''}. The team is ${STATUS_TEXT[d.headline.status]}: ${usd(d.headline.projectedMonthEndUsd)} projected against a ${usd(d.headline.budgetUsd)} budget (${pct(d.headline.projectedPct)}).`,
  ];
  if (d.outcomes.costPerMergedPrUsd !== null) parts.push(`Cost per merged AI-assisted PR is ${usd(d.outcomes.costPerMergedPrUsd)} across ${d.outcomes.mergedPrs} merged PRs in 30 days.`);
  if (d.waste.abandonedSpendUsd > 0) parts.push(`${usd(d.waste.abandonedSpendUsd)} went into PRs that were closed unmerged.`);
  if (d.recommendedAction) parts.push(`Top suggested action: ${d.recommendedAction.title}, worth ${usd(d.recommendedAction.estMonthlySavingsUsd.low)} to ${usd(d.recommendedAction.estMonthlySavingsUsd.high)} per month.`);
  return parts.join(' ');
}

export function digestToMarkdown(d: DigestData, narrative?: string): string {
  const L: string[] = [];
  L.push(`# Weekly AI spend digest: ${d.teamName}`, `Week ending ${d.weekEnding} | for ${d.emName}`, '');
  L.push(narrative ?? templateNarrative(d), '');
  L.push('## 1. Headline');
  L.push(`- Last 7 days: ${usd(d.headline.spend7dUsd)} (prior week ${usd(d.headline.prior7dUsd)}${d.headline.deltaPct === null ? '' : `, ${d.headline.deltaPct >= 0 ? '+' : ''}${pct(d.headline.deltaPct)}`})`);
  L.push(`- Month to date: ${usd(d.headline.mtdUsd)} of ${usd(d.headline.budgetUsd)} budget; projected ${usd(d.headline.projectedMonthEndUsd)} (${pct(d.headline.projectedPct)}), ${STATUS_TEXT[d.headline.status]}`);
  L.push('', '## 2. Cost per merged PR');
  L.push(`- ${d.outcomes.costPerMergedPrUsd === null ? 'n/a' : usd(d.outcomes.costPerMergedPrUsd)} over ${d.outcomes.mergedPrs} merged PRs (30 days)`);
  L.push(`- 4-week trend: ${d.outcomes.trend.map((t) => (t.costPerMergedPrUsd === null ? 'n/a' : usd(t.costPerMergedPrUsd))).join(' > ')}`);
  L.push('', '## 3. Wasted spend');
  L.push(`- Closed unmerged: ${usd(d.waste.abandonedSpendUsd)}; reverted: ${usd(d.waste.revertedSpendUsd)}`);
  for (const r of d.waste.topRunaway) L.push(`- ${r.label}: ${usd(r.costUsd)} on ${r.date} (${r.outcome})`);
  L.push('', '## 4. Model mix');
  L.push(`- ${pct(d.modelMix.topTierSpendShare)} of Claude Code spend is on the top-tier model; ${pct(d.modelMix.smallSessionShare)} of sessions were small (under 40 lines).`);
  L.push(`- ${d.modelMix.recommendation}`);
  L.push('', '## 5. Seats');
  L.push(`- ${d.seats.inactiveCount} seats inactive 30+ days (${usd(d.seats.inactiveUsd)}/mo); ${d.seats.duplicateHolders} duplicate-tool holders (names in the audited admin view)`);
  L.push('', '## 6. Context and caching hygiene');
  L.push(`- Cache hit rate ${d.cacheHygiene.teamHitRate === null ? 'n/a' : pct(d.cacheHygiene.teamHitRate)} vs org median ${d.cacheHygiene.orgMedianHitRate === null ? 'n/a' : pct(d.cacheHygiene.orgMedianHitRate)}`);
  if (d.cacheHygiene.flaggedRepos.length) L.push(`- CLAUDE.md over 200 lines: ${d.cacheHygiene.flaggedRepos.map((r) => `${r.repo} (${r.claudeMdLines})`).join(', ')}`);
  L.push('', '## 7. Budget requests awaiting approval');
  if (!d.openBudgetRequests.length) L.push('- None');
  for (const r of d.openBudgetRequests) L.push(`- ${usd(r.amountUsd)}: ${r.requesterNote}`);
  L.push('', '## 8. Recommended action');
  L.push(d.recommendedAction ? `- ${d.recommendedAction.title} (est. ${usd(d.recommendedAction.estMonthlySavingsUsd.low)} to ${usd(d.recommendedAction.estMonthlySavingsUsd.high)}/mo). Apply in ContextOps.` : '- None right now');
  L.push('', '---', d.footer);
  return L.join('\n');
}
