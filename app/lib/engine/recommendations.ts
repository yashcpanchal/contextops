import type { RecStatus, Recommendation, State, Tool } from '../types';
import { TOOL_LABEL, tokenCostUsd } from '../pricing';
import { addDays } from '../dates';
import { detectWaste, type WasteFinding } from './waste';
import { usd } from '../format';

const money = (n: number) => usd(n, { cents: false });

const rec = (r: Omit<Recommendation, 'status'>): Recommendation => ({ ...r, status: 'identified' });
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const round = (n: number) => Math.round(n);

function toolLabel(t: Tool | undefined): string {
  return t ? TOOL_LABEL[t] : 'AI tool';
}

/** Recommendations derived from the current data, all with status 'identified'. */
export function deriveRecommendations(state: State): Recommendation[] {
  const findings = detectWaste(state, 30);
  const teamName = new Map(state.teams.map((t) => [t.id, t.name]));
  const out: Recommendation[] = [];
  const by = (kind: WasteFinding['kind']) => findings.filter((f) => f.kind === kind);

  // R1: inactive seats, per tool
  for (const tool of ['claude_code', 'cursor', 'copilot'] as Tool[]) {
    const fs = by('inactive_seat').filter((f) => f.tool === tool);
    if (!fs.length) continue;
    const total = sum(fs.map((f) => f.monthlyImpactUsd));
    out.push(
      rec({
        id: `R1:${tool}`,
        type: 'R1',
        title: `Reclaim ${fs.length} inactive ${toolLabel(tool)} seats`,
        detail: `${fs.length} ${toolLabel(tool)} seats show no activity for 30+ days.`,
        scope: { tool },
        estMonthlySavingsUsd: { low: round(total * 0.9), high: round(total) },
        confidence: 'high',
        formula: `sum of seat price over N_inactive = ${fs.length} seats = ${money(total)}/mo (low case nets 10% for replacement overage)`,
        evidenceRefs: fs.flatMap((f) => f.seatIds ?? []).slice(0, 40),
        action: {
          kind: 'release_seats',
          payload: { seatIds: fs.flatMap((f) => f.seatIds ?? []), tool },
          summary: `Release ${toolLabel(tool)} seat for ${fs.length} inactive users; est. saving ${money(total)}/mo`,
        },
      }),
    );
  }

  // R2: duplicate tools, per tool of the lower-usage seat
  for (const tool of ['cursor', 'copilot', 'claude_code'] as Tool[]) {
    const fs = by('duplicate_tools').filter((f) => f.tool === tool);
    if (!fs.length) continue;
    const total = sum(fs.map((f) => f.monthlyImpactUsd));
    out.push(
      rec({
        id: `R2:${tool}`,
        type: 'R2',
        title: `Consolidate ${fs.length} duplicate ${toolLabel(tool)} seats`,
        detail: `${fs.length} engineers hold ${toolLabel(tool)} alongside another paid tool and used it 4 days or fewer in 30 days.`,
        scope: { tool },
        estMonthlySavingsUsd: { low: round(total * 0.35), high: round(total * 0.65) },
        confidence: 'medium',
        formula: `sum of p_lower_usage_tool = ${money(total)} x f_realizable (0.35 to 0.65, default 0.5 because engineers resist) `,
        evidenceRefs: fs.flatMap((f) => f.seatIds ?? []).slice(0, 40),
        action: {
          kind: 'release_seats',
          payload: { seatIds: fs.flatMap((f) => f.seatIds ?? []), tool },
          summary: `Release ${fs.length} barely used ${toolLabel(tool)} seats held alongside another tool; est. saving ${money(total * 0.5)}/mo`,
        },
      }),
    );
  }

  // R3: downgrade tier, per tool
  for (const tool of ['claude_code', 'copilot'] as Tool[]) {
    const fs = by('downgradable_tier').filter((f) => f.tool === tool);
    if (!fs.length) continue;
    const total = sum(fs.map((f) => f.monthlyImpactUsd));
    const to = tool === 'claude_code' ? 'standard' : 'business';
    out.push(
      rec({
        id: `R3:${tool}`,
        type: 'R3',
        title: `Downgrade ${fs.length} ${toolLabel(tool)} seats to ${to}`,
        detail: `30-day usage on these seats fits the ${to} tier.`,
        scope: { tool },
        estMonthlySavingsUsd: { low: round(total * 0.9), high: round(total) },
        confidence: 'high',
        formula: `N_downgradable x (p_high - p_std) = ${fs.length} seats = ${money(total)}/mo`,
        evidenceRefs: fs.flatMap((f) => f.seatIds ?? []).slice(0, 40),
        action: {
          kind: 'downgrade_seats',
          payload: { seatIds: fs.flatMap((f) => f.seatIds ?? []), tool, toTier: to },
          summary: `Move ${fs.length} ${toolLabel(tool)} seats to the ${to} tier; est. saving ${money(total)}/mo`,
        },
      }),
    );
  }

  // R4: model default shift, per team
  for (const team of state.teams) {
    const fs = by('top_model_small_task').filter((f) => f.teamId === team.id);
    const saving = sum(fs.map((f) => f.monthlyImpactUsd));
    if (saving < 150) continue;
    const spend = sum(fs.map((f) => f.costUsd));
    out.push(
      rec({
        id: `R4:${team.id}`,
        type: 'R4',
        title: `Default ${team.name} to Sonnet for small tasks`,
        detail: `${fs.length} Opus sessions changed under 40 lines each in 30 days.`,
        scope: { teamId: team.id, tool: 'claude_code' },
        estMonthlySavingsUsd: { low: round(saving * 0.6), high: round(saving * 0.8) },
        confidence: 'medium',
        formula: `S_top_tier_small_tasks (${money(spend)}) x (1 - price_mid/price_top) = ${money(saving)}; x f_quality_safe (0.6 to 0.8)`,
        evidenceRefs: fs.slice(0, 40).map((f) => f.sessionId as string),
        action: {
          kind: 'set_model_default',
          payload: { teamId: team.id, from: 'opus', to: 'sonnet', maxLines: 40 },
          summary: `Set ${team.name} default model to Sonnet for sessions under 40 lines; est. saving ${money(saving * 0.7)}/mo`,
        },
      }),
    );
  }

  // R6: runaway guard, per team
  for (const team of state.teams) {
    const fs = by('runaway_session').filter((f) => f.teamId === team.id);
    if (!fs.length) continue;
    const over = sum(fs.map((f) => f.monthlyImpactUsd));
    const cap = 100;
    out.push(
      rec({
        id: `R6:${team.id}`,
        type: 'R6',
        title: `Add a session cost guard for ${team.name}`,
        detail: `${fs.length} sessions with no merged outcome ran past the cost cap in 30 days.`,
        scope: { teamId: team.id },
        estMonthlySavingsUsd: { low: round(over * 0.5), high: round(over * 0.8) },
        confidence: 'medium',
        formula: `S_over_cap = sum(max(0, session_cost - cap)) = ${money(over)}; x f_prevented (0.5 to 0.8)`,
        evidenceRefs: fs.map((f) => f.sessionId as string),
        action: {
          kind: 'set_runaway_cap',
          payload: { teamId: team.id, capUsd: cap },
          summary: `Alert and pause sessions above ${money(cap)} for ${team.name}; est. saving ${money(over * 0.65)}/mo`,
        },
      }),
    );
  }

  // R7: idle scheduled loops
  for (const f of by('idle_loop')) {
    const loopId = f.loopId as string;
    out.push(
      rec({
        id: `R7:${loopId}`,
        type: 'R7',
        title: `Pause idle scheduled loop "${loopId}"`,
        detail: f.detail,
        scope: { teamId: f.teamId ?? undefined, repo: f.repo },
        estMonthlySavingsUsd: { low: round(f.monthlyImpactUsd * 0.8), high: round(f.monthlyImpactUsd) },
        confidence: 'high',
        formula: `sum(loop_total_cost) = ${money(f.costUsd)} x f_zero_value (0.8 to 1.0)`,
        evidenceRefs: [loopId],
        action: {
          kind: 'disable_loop',
          payload: { loopId },
          summary: `Disable scheduled loop "${loopId}" (${teamName.get(f.teamId ?? '') ?? 'team'}); est. saving ${money(f.monthlyImpactUsd * 0.9)}/mo`,
        },
      }),
    );
  }

  // R8: cache hygiene, per team
  for (const f of by('cache_regression')) {
    const team = teamName.get(f.teamId ?? '') ?? 'Team';
    out.push(
      rec({
        id: `R8:${f.teamId}`,
        type: 'R8',
        title: `Fix prompt-cache misses on ${team}`,
        detail: f.label,
        scope: { teamId: f.teamId ?? undefined, tool: 'claude_code' },
        estMonthlySavingsUsd: { low: round(f.monthlyImpactUsd * 0.4), high: round(f.monthlyImpactUsd * 0.7) },
        confidence: 'medium',
        formula: `S_recache_tokens x (input_price - cache_read_price) = ${money(f.monthlyImpactUsd)}/mo; x f_avoidable (0.4 to 0.7)`,
        evidenceRefs: [`team:${f.teamId}`],
        action: {
          kind: 'set_cache_hygiene',
          payload: { teamId: f.teamId },
          summary: `Enable compact/clear discipline and cache-aware defaults for ${team}; est. saving ${money(f.monthlyImpactUsd * 0.55)}/mo`,
        },
      }),
    );
  }

  // R10: subagent model downshift, per team (Opus subagents)
  const from30 = addDays(state.asOf, -29);
  for (const team of state.teams) {
    let spend = 0;
    let saving = 0;
    let n = 0;
    const refs: string[] = [];
    for (const s of state.sessions) {
      if (s.teamId !== team.id || s.kind !== 'subagent' || s.model !== 'opus' || s.startedAt.slice(0, 10) < from30) continue;
      spend += s.costUsd;
      saving += s.costUsd - tokenCostUsd('sonnet', s.inputTokens, s.outputTokens, s.cacheReadTokens);
      n++;
      if (refs.length < 40) refs.push(s.id);
    }
    if (saving < 150) continue;
    out.push(
      rec({
        id: `R10:${team.id}`,
        type: 'R10',
        title: `Run ${team.name} subagents on Sonnet`,
        detail: `${n} subagent runs inherited Opus in the last 30 days.`,
        scope: { teamId: team.id, tool: 'claude_code' },
        estMonthlySavingsUsd: { low: round(saving * 0.4), high: round(saving * 0.6) },
        confidence: 'medium',
        formula: `S_subagent_tokens (${money(spend)}) x (1 - price_small/price_top) = ${money(saving)}; x f_task_fit (0.4 to 0.6)`,
        evidenceRefs: refs,
        action: {
          kind: 'set_subagent_model',
          payload: { teamId: team.id, to: 'sonnet' },
          summary: `Set ${team.name} subagent model to Sonnet; est. saving ${money(saving * 0.5)}/mo`,
        },
      }),
    );
  }

  // R11: abandoned-PR prevention, per team
  for (const team of state.teams) {
    const fs = by('abandoned_pr').filter((f) => f.teamId === team.id);
    const abandoned = sum(fs.map((f) => f.costUsd));
    if (abandoned < 300) continue;
    out.push(
      rec({
        id: `R11:${team.id}`,
        type: 'R11',
        title: `Cut abandoned-PR spend on ${team.name}`,
        detail: `${fs.length} AI-assisted PRs were closed unmerged, carrying ${money(abandoned)} of attributed spend.`,
        scope: { teamId: team.id },
        estMonthlySavingsUsd: { low: round(abandoned * 0.2), high: round(abandoned * 0.4) },
        confidence: 'low',
        formula: `S_abandoned_PRs (${money(abandoned)}) x f_reduction (0.2 to 0.4); not all closed PRs are waste`,
        evidenceRefs: fs.slice(0, 40).map((f) => f.prId as string),
        action: {
          kind: 'enable_plan_mode',
          payload: { teamId: team.id },
          summary: `Default ${team.name} to plan mode with a verification target before large edits; est. saving ${money(abandoned * 0.3)}/mo`,
        },
      }),
    );
  }

  // R15: Copilot hard stop
  for (const f of by('copilot_stop_usage_disabled')) {
    out.push(
      rec({
        id: 'R15:copilot',
        type: 'R15',
        title: 'Turn on Copilot stop-usage at the premium-request budget',
        detail: f.detail,
        scope: { tool: 'copilot' },
        estMonthlySavingsUsd: { low: round(f.monthlyImpactUsd * 0.2), high: round(f.monthlyImpactUsd * 0.4) },
        confidence: 'low',
        formula: `S_over_wallet (${money(f.monthlyImpactUsd)}/mo Copilot premium requests) x f_unapproved (0.2 to 0.4); soft cap`,
        evidenceRefs: ['config:copilot-stop-usage'],
        action: {
          kind: 'set_copilot_stop_usage',
          payload: { enabled: true },
          summary: `Enable "stop usage" on the Copilot premium-request budget; est. saving ${money(f.monthlyImpactUsd * 0.3)}/mo`,
        },
      }),
    );
  }

  return out;
}

/** Derived recommendations merged with stored statuses (applied / dismissed / accepted survive data changes). */
export function getRecommendations(state: State): Recommendation[] {
  const derived = deriveRecommendations(state);
  const out: Recommendation[] = [];
  const seen = new Set<string>();
  for (const r of derived) {
    const stored = state.recommendationLog[r.id];
    if (stored) {
      out.push({ ...stored.rec, status: stored.status });
    } else out.push(r);
    seen.add(r.id);
  }
  for (const [id, stored] of Object.entries(state.recommendationLog)) {
    if (!seen.has(id)) out.push({ ...stored.rec, status: stored.status });
  }
  return out.sort((a, b) => b.estMonthlySavingsUsd.high - a.estMonthlySavingsUsd.high);
}

export interface SavingsTotals {
  identified: { low: number; high: number; count: number };
  accepted: { low: number; high: number; count: number };
  realized: { low: number; high: number; count: number };
}

/** Funnel: identified = every non-dismissed rec; accepted = accepted or applied; realized = applied (demo estimate). */
export function savingsTotals(recs: Recommendation[]): SavingsTotals {
  const agg = (pred: (s: RecStatus) => boolean) => {
    const rs = recs.filter((r) => pred(r.status));
    return {
      low: sum(rs.map((r) => r.estMonthlySavingsUsd.low)),
      high: sum(rs.map((r) => r.estMonthlySavingsUsd.high)),
      count: rs.length,
    };
  };
  return {
    identified: agg((s) => s !== 'dismissed'),
    accepted: agg((s) => s === 'accepted' || s === 'applied'),
    realized: agg((s) => s === 'applied'),
  };
}

export function dismissRecommendation(state: State, id: string, at = new Date()): Recommendation {
  const rec = getRecommendations(state).find((r) => r.id === id);
  if (!rec) throw new Error(`Recommendation not found: ${id}`);
  if (rec.status === 'applied') throw new Error('Applied recommendations cannot be dismissed; undo first.');
  state.recommendationLog[id] = { rec: { ...rec, status: 'dismissed' }, status: 'dismissed', updatedAt: at.toISOString() };
  state.rev++;
  return { ...rec, status: 'dismissed' };
}
