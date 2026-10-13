import type { PullRequest, Seat, Session, State, Tool } from '../types';
import { addDays, diffDays } from '../dates';
import { TOP_TIER_MODEL, tokenCostUsd, priceFor } from '../pricing';
import { attributeAll } from './attribution';

export type WasteKind =
  | 'inactive_seat'
  | 'duplicate_tools'
  | 'downgradable_tier'
  | 'top_model_small_task'
  | 'runaway_session'
  | 'idle_loop'
  | 'abandoned_pr'
  | 'reverted_pr'
  | 'cache_regression'
  | 'copilot_stop_usage_disabled';

export const SEAT_KINDS: WasteKind[] = ['inactive_seat', 'duplicate_tools', 'downgradable_tier'];

export interface WasteFinding {
  id: string;
  kind: WasteKind;
  teamId: string | null;
  tool?: Tool;
  repo?: string;
  at?: string;
  sessionId?: string;
  prId?: string;
  loopId?: string;
  /** Seat-level kinds only. */
  seatIds?: string[];
  /** Seat-level kinds only: used by the audited admin seat view, stripped from event APIs. */
  engineerId?: string;
  /** Observed spend tied to this finding. */
  costUsd: number;
  /** Estimated monthly dollars recoverable before recommendation haircuts. */
  monthlyImpactUsd: number;
  label: string;
  detail: string;
  outcome?: string;
}

export const THRESHOLDS = {
  inactiveDays: 30,
  runawayMinUsd: 100,
  runawayP50Multiple: 5,
  smallTaskLines: 40,
  duplicateLowUsageDays: 4,
  duplicateHighUsageDays: 8,
  downgradeFitUsd: { claude_code: 60, copilot: 4, cursor: 0, codex: 0 } as Record<Tool, number>,
  idleLoopMinRuns: 5,
  abandonedMinUsd: 15,
  cacheGapPts: 0.15,
};

export function median(xs: number[]): number {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function sessionsSince(state: State, days: number): Session[] {
  const from = addDays(state.asOf, -(days - 1));
  return state.sessions.filter((s) => s.startedAt.slice(0, 10) >= from);
}

export function cacheHitRate(sessions: Session[]): number | null {
  let cache = 0;
  let input = 0;
  for (const s of sessions) {
    if (s.tool !== 'claude_code') continue;
    cache += s.cacheReadTokens;
    input += s.inputTokens;
  }
  return cache + input > 0 ? cache / (cache + input) : null;
}

export interface SeatUsage {
  days: number;
  costUsd: number;
}
/** Per (engineer, tool) activity in the trailing window. Keyed `${engineerId}|${tool}`. */
export function seatUsage(state: State, days = 30): Map<string, SeatUsage> {
  const out = new Map<string, { dayset: Set<string>; costUsd: number }>();
  for (const s of sessionsSince(state, days)) {
    const k = `${s.engineerId}|${s.tool}`;
    let e = out.get(k);
    if (!e) {
      e = { dayset: new Set(), costUsd: 0 };
      out.set(k, e);
    }
    e.dayset.add(s.startedAt.slice(0, 10));
    e.costUsd += s.costUsd;
  }
  const res = new Map<string, SeatUsage>();
  out.forEach((v, k) => res.set(k, { days: v.dayset.size, costUsd: v.costUsd }));
  return res;
}

function isInactive(state: State, seat: Seat): boolean {
  return seat.status === 'active' && diffDays(state.asOf, seat.lastActiveAt.slice(0, 10)) >= THRESHOLDS.inactiveDays;
}

export function teamRunawayThresholds(state: State): Record<string, number> {
  const out: Record<string, number> = {};
  for (const t of state.teams) {
    const costs = state.sessions.filter((s) => s.teamId === t.id && s.tool === 'claude_code' && s.kind !== 'scheduled').map((s) => s.costUsd);
    out[t.id] = Math.max(THRESHOLDS.runawayP50Multiple * median(costs), THRESHOLDS.runawayMinUsd);
  }
  return out;
}

export function detectWaste(state: State, days = 30): WasteFinding[] {
  const findings: WasteFinding[] = [];
  const att = attributeAll(state);
  const prsById = new Map<string, PullRequest>(state.prs.map((p) => [p.id, p]));
  const engById = new Map(state.engineers.map((e) => [e.id, e]));
  const recent = sessionsSince(state, days);
  const usage = seatUsage(state, 30);
  const activeSeats = state.seats.filter((s) => s.status === 'active');

  // 1. Inactive seats
  const inactiveIds = new Set<string>();
  for (const seat of activeSeats) {
    if (!isInactive(state, seat)) continue;
    inactiveIds.add(seat.id);
    const eng = engById.get(seat.engineerId);
    findings.push({
      id: `inactive:${seat.id}`,
      kind: 'inactive_seat',
      teamId: eng?.teamId ?? null,
      tool: seat.tool,
      seatIds: [seat.id],
      engineerId: seat.engineerId,
      at: seat.lastActiveAt,
      costUsd: seat.monthlyPriceUsd,
      monthlyImpactUsd: seat.monthlyPriceUsd,
      label: `Inactive ${seat.tool} seat`,
      detail: `No activity for ${diffDays(state.asOf, seat.lastActiveAt.slice(0, 10))} days.`,
    });
  }

  // 2. Duplicate tools: lowest-use seat among engineers holding 2+ tools
  const seatsByEng = new Map<string, Seat[]>();
  for (const s of activeSeats) {
    const l = seatsByEng.get(s.engineerId);
    if (l) l.push(s);
    else seatsByEng.set(s.engineerId, [s]);
  }
  seatsByEng.forEach((seats, engineerId) => {
    if (seats.length < 2) return;
    const withUse = seats
      .filter((s) => !inactiveIds.has(s.id))
      .map((s) => ({ seat: s, u: usage.get(`${engineerId}|${s.tool}`) ?? { days: 0, costUsd: 0 } }))
      .sort((a, b) => a.u.days - b.u.days);
    if (withUse.length < 2) return;
    const low = withUse[0];
    const high = withUse[withUse.length - 1];
    if (low.u.days <= THRESHOLDS.duplicateLowUsageDays && high.u.days >= THRESHOLDS.duplicateHighUsageDays) {
      findings.push({
        id: `dup:${low.seat.id}`,
        kind: 'duplicate_tools',
        teamId: engById.get(engineerId)?.teamId ?? null,
        tool: low.seat.tool,
        seatIds: [low.seat.id],
        engineerId,
        costUsd: low.seat.monthlyPriceUsd,
        monthlyImpactUsd: low.seat.monthlyPriceUsd,
        label: `Duplicate tool seat (${low.seat.tool})`,
        detail: `Holds ${seats.length} paid tools; ${low.seat.tool} was used ${low.u.days} day(s) vs ${high.u.days} for ${high.seat.tool} in 30 days.`,
      });
    }
  });

  // 3. Downgradable tiers
  for (const seat of activeSeats) {
    if (inactiveIds.has(seat.id)) continue;
    const isHigh = (seat.tool === 'claude_code' && seat.tier === 'premium') || (seat.tool === 'copilot' && seat.tier === 'enterprise');
    if (!isHigh) continue;
    const u = usage.get(`${seat.engineerId}|${seat.tool}`) ?? { days: 0, costUsd: 0 };
    if (u.costUsd >= THRESHOLDS.downgradeFitUsd[seat.tool]) continue;
    const target = seat.tool === 'claude_code' ? 30 : 19;
    findings.push({
      id: `down:${seat.id}`,
      kind: 'downgradable_tier',
      teamId: engById.get(seat.engineerId)?.teamId ?? null,
      tool: seat.tool,
      seatIds: [seat.id],
      engineerId: seat.engineerId,
      costUsd: seat.monthlyPriceUsd,
      monthlyImpactUsd: seat.monthlyPriceUsd - target,
      label: `Downgradable ${seat.tool} ${seat.tier} seat`,
      detail: `30-day usage of $${u.costUsd.toFixed(0)} fits the standard tier.`,
    });
  }

  // 4. Top-tier model on small tasks
  for (const s of recent) {
    if (s.tool !== 'claude_code' || s.model !== TOP_TIER_MODEL || s.kind !== 'interactive') continue;
    if (s.linesChanged >= THRESHOLDS.smallTaskLines) continue;
    const alt = tokenCostUsd('sonnet', s.inputTokens, s.outputTokens, s.cacheReadTokens);
    findings.push({
      id: `model:${s.id}`,
      kind: 'top_model_small_task',
      teamId: s.teamId,
      tool: s.tool,
      repo: s.repo,
      sessionId: s.id,
      at: s.startedAt,
      costUsd: s.costUsd,
      monthlyImpactUsd: Math.max(0, s.costUsd - alt) * (30 / days),
      label: `Opus session in ${s.repo}`,
      detail: `${s.linesChanged} lines changed on the top-tier model.`,
    });
  }

  // 5. Runaway sessions
  const thresholds = teamRunawayThresholds(state);
  for (const s of recent) {
    if (s.costUsd <= (thresholds[s.teamId] ?? THRESHOLDS.runawayMinUsd)) continue;
    const a = att.get(s.id);
    const pr = a?.prId ? prsById.get(a.prId) : undefined;
    if (pr?.state === 'merged') continue;
    const cap = thresholds[s.teamId] ?? THRESHOLDS.runawayMinUsd;
    findings.push({
      id: `runaway:${s.id}`,
      kind: 'runaway_session',
      teamId: s.teamId,
      tool: s.tool,
      repo: s.repo,
      sessionId: s.id,
      loopId: s.loopId ?? undefined,
      at: s.startedAt,
      costUsd: s.costUsd,
      monthlyImpactUsd: Math.max(0, s.costUsd - cap) * (30 / days),
      label: `${s.kind === 'scheduled' ? 'Scheduled loop run' : 'Session'} in ${s.repo}`,
      detail: `Cost $${s.costUsd.toFixed(0)} against a cap of $${cap.toFixed(0)}.`,
      outcome: pr ? (pr.state === 'closed_unmerged' ? 'PR closed unmerged' : 'PR still open') : 'No PR',
    });
  }

  // 6. Idle scheduled loops
  const loops = new Map<string, Session[]>();
  for (const s of recent) {
    if (s.kind !== 'scheduled' || !s.loopId) continue;
    const l = loops.get(s.loopId);
    if (l) l.push(s);
    else loops.set(s.loopId, [s]);
  }
  loops.forEach((runs, loopId) => {
    if (runs.length < THRESHOLDS.idleLoopMinRuns) return;
    if (state.controls.disabledLoops.includes(loopId)) return;
    const merged = runs.filter((r) => {
      const a = att.get(r.id);
      return a?.prId ? prsById.get(a.prId)?.state === 'merged' : false;
    }).length;
    if (merged > 0) return;
    const cost = runs.reduce((a, r) => a + r.costUsd, 0);
    findings.push({
      id: `loop:${loopId}`,
      kind: 'idle_loop',
      teamId: runs[0].teamId,
      tool: runs[0].tool,
      repo: runs[0].repo,
      loopId,
      at: runs[runs.length - 1].startedAt,
      costUsd: cost,
      monthlyImpactUsd: cost * (30 / days),
      label: `Scheduled loop "${loopId}"`,
      detail: `${runs.length} runs in ${days} days and no merged outcome.`,
      outcome: 'No merged PR',
    });
  });

  // 7. Abandoned / reverted PR spend
  const from = addDays(state.asOf, -(days - 1));
  const prCost = new Map<string, number>();
  for (const s of state.sessions) {
    const a = att.get(s.id);
    if (a?.prId) prCost.set(a.prId, (prCost.get(a.prId) ?? 0) + s.costUsd);
  }
  for (const pr of state.prs) {
    if (!pr.closedAt || pr.closedAt.slice(0, 10) < from) continue;
    const cost = prCost.get(pr.id) ?? 0;
    if (pr.state === 'closed_unmerged' && pr.aiAssisted && cost >= THRESHOLDS.abandonedMinUsd) {
      findings.push({
        id: `abandoned:${pr.id}`,
        kind: 'abandoned_pr',
        teamId: pr.teamId,
        repo: pr.repo,
        prId: pr.id,
        at: pr.closedAt,
        costUsd: cost,
        monthlyImpactUsd: cost * (30 / days),
        label: `PR #${pr.number} in ${pr.repo}`,
        detail: `Closed unmerged after ${pr.reviewRounds} review round(s).`,
        outcome: 'Closed unmerged',
      });
    } else if (pr.state === 'merged' && pr.reverted && cost >= THRESHOLDS.abandonedMinUsd) {
      findings.push({
        id: `reverted:${pr.id}`,
        kind: 'reverted_pr',
        teamId: pr.teamId,
        repo: pr.repo,
        prId: pr.id,
        at: pr.closedAt,
        costUsd: cost,
        monthlyImpactUsd: 0,
        label: `PR #${pr.number} in ${pr.repo}`,
        detail: 'Merged then reverted.',
        outcome: 'Reverted',
      });
    }
  }

  // 8. Cache regression (21-day window vs org median across teams)
  const claude21 = sessionsSince(state, 21).filter((s) => s.tool === 'claude_code');
  const rates = new Map<string, number>();
  for (const t of state.teams) {
    const r = cacheHitRate(claude21.filter((s) => s.teamId === t.id));
    if (r !== null) rates.set(t.id, r);
  }
  const baseline = median(Array.from(rates.values()));
  rates.forEach((rate, teamId) => {
    if (rate >= baseline - THRESHOLDS.cacheGapPts) return;
    let excess = 0;
    for (const s of claude21) {
      if (s.teamId !== teamId) continue;
      const ctx = s.inputTokens + s.cacheReadTokens;
      const extraInput = Math.max(0, s.inputTokens - ctx * (1 - baseline));
      const p = priceFor(s.model);
      excess += (extraInput * (p.input - p.cacheRead)) / 1e6;
    }
    findings.push({
      id: `cache:${teamId}`,
      kind: 'cache_regression',
      teamId,
      tool: 'claude_code',
      costUsd: excess,
      monthlyImpactUsd: excess * (30 / 21),
      label: `Cache hit rate ${(rate * 100).toFixed(0)}% vs org median ${(baseline * 100).toFixed(0)}%`,
      detail: 'Prompt cache is being missed, so context is re-billed at the full input rate.',
    });
  });

  // 9. Copilot stop-usage disabled
  if (!state.org.config.copilotStopUsageEnabled) {
    const spend = recent.filter((s) => s.tool === 'copilot').reduce((a, s) => a + s.costUsd, 0);
    findings.push({
      id: 'config:copilot-stop-usage',
      kind: 'copilot_stop_usage_disabled',
      teamId: null,
      tool: 'copilot',
      costUsd: spend,
      monthlyImpactUsd: spend * (30 / days),
      label: 'Copilot premium requests have no hard stop',
      detail: 'The org budget does not stop usage at the limit, so overage is uncapped.',
    });
  }

  return findings;
}

export interface WasteSummary {
  byKind: Record<string, { count: number; costUsd: number; monthlyImpactUsd: number }>;
  totalMonthlyImpactUsd: number;
}
export function summarizeWaste(findings: WasteFinding[]): WasteSummary {
  const byKind: WasteSummary['byKind'] = {};
  let total = 0;
  for (const f of findings) {
    const e = (byKind[f.kind] ??= { count: 0, costUsd: 0, monthlyImpactUsd: 0 });
    e.count++;
    e.costUsd += f.costUsd;
    e.monthlyImpactUsd += f.monthlyImpactUsd;
    total += f.monthlyImpactUsd;
  }
  return { byKind, totalMonthlyImpactUsd: total };
}
