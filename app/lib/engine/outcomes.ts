import type { PullRequest, State } from '../types';
import { addDays } from '../dates';
import { attributeAll } from './attribution';

export interface WeeklyOutcomePoint {
  weekStart: string;
  usageSpendUsd: number;
  mergedPrs: number;
  costPerMergedPrUsd: number | null;
}

export interface TeamOutcomes {
  teamId: string;
  windowDays: number;
  usageSpendUsd: number;
  mergedAiPrs: number;
  closedUnmergedAiPrs: number;
  revertedPrs: number;
  /** usage spend / merged AI-assisted PRs (team aggregate, DX-style). */
  costPerMergedPrUsd: number | null;
  /** attributed cost of merged PRs / merged AI-assisted PRs (session-level join). */
  attributedCostPerMergedPrUsd: number | null;
  abandonedSpendUsd: number;
  revertedSpendUsd: number;
  /** merged / (merged + closed unmerged) among AI-assisted PRs closed in window. */
  aiAssistedMergeRate: number | null;
  /** Share of usage spend attributed to merged, non-reverted PRs (0..1). */
  mergedWorkShare: number;
  trend: WeeklyOutcomePoint[];
}

function inWindow(iso: string | null, from: string, to: string): boolean {
  if (!iso) return false;
  const d = iso.slice(0, 10);
  return d >= from && d <= to;
}

/** Outcomes for a team, or the whole org when teamId is omitted. */
export function teamOutcomes(state: State, teamId?: string, days = 30): TeamOutcomes {
  const to = state.asOf;
  const from = addDays(to, -(days - 1));
  const att = attributeAll(state);
  const prsById = new Map<string, PullRequest>(state.prs.map((p) => [p.id, p]));

  let usageSpend = 0;
  let abandoned = 0;
  let revertedSpend = 0;
  let mergedWork = 0;
  let mergedAttributed = 0;
  for (const s of state.sessions) {
    if (teamId && s.teamId !== teamId) continue;
    if (!inWindow(s.startedAt, from, to)) continue;
    usageSpend += s.costUsd;
    const a = att.get(s.id);
    const pr = a?.prId ? prsById.get(a.prId) : undefined;
    if (!pr) continue;
    if (pr.state === 'closed_unmerged') abandoned += s.costUsd;
    else if (pr.state === 'merged') {
      if (pr.reverted) revertedSpend += s.costUsd;
      else mergedWork += s.costUsd;
      mergedAttributed += s.costUsd;
    }
  }

  const prs = state.prs.filter((p) => (!teamId || p.teamId === teamId) && p.aiAssisted && inWindow(p.closedAt, from, to));
  const merged = prs.filter((p) => p.state === 'merged');
  const unmerged = prs.filter((p) => p.state === 'closed_unmerged');
  const reverted = merged.filter((p) => p.reverted);

  const trend: WeeklyOutcomePoint[] = [];
  for (let w = 3; w >= 0; w--) {
    const wTo = addDays(to, -7 * w);
    const wFrom = addDays(wTo, -6);
    let spend = 0;
    for (const s of state.sessions) {
      if (teamId && s.teamId !== teamId) continue;
      if (inWindow(s.startedAt, wFrom, wTo)) spend += s.costUsd;
    }
    const mergedN = state.prs.filter(
      (p) => (!teamId || p.teamId === teamId) && p.aiAssisted && p.state === 'merged' && inWindow(p.closedAt, wFrom, wTo),
    ).length;
    trend.push({
      weekStart: wFrom,
      usageSpendUsd: spend,
      mergedPrs: mergedN,
      costPerMergedPrUsd: mergedN > 0 ? spend / mergedN : null,
    });
  }

  const closedN = merged.length + unmerged.length;
  return {
    teamId: teamId ?? 'org',
    windowDays: days,
    usageSpendUsd: usageSpend,
    mergedAiPrs: merged.length,
    closedUnmergedAiPrs: unmerged.length,
    revertedPrs: reverted.length,
    costPerMergedPrUsd: merged.length ? usageSpend / merged.length : null,
    attributedCostPerMergedPrUsd: merged.length ? mergedAttributed / merged.length : null,
    abandonedSpendUsd: abandoned,
    revertedSpendUsd: revertedSpend,
    aiAssistedMergeRate: closedN ? merged.length / closedN : null,
    mergedWorkShare: usageSpend > 0 ? mergedWork / usageSpend : 0,
    trend,
  };
}
