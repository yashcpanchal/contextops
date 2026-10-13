import type { BudgetRequest, State } from '../types';
import { addDays, daysInMonth, monthStart } from '../dates';
import { dailySeries, monthProjection } from './ledger';
import { pushAudit, snapshotBudget, type Snapshot } from './actions';

export type BudgetStatus = 'on_track' | 'at_risk' | 'over';

export interface BudgetSeriesPoint {
  date: string;
  /** Actual cumulative spend up to asOf, null afterwards. */
  actualCumulativeUsd: number | null;
  /** Projected cumulative from asOf onwards (equals actual at asOf), null before. */
  projectedCumulativeUsd: number | null;
  budgetUsd: number;
  /** Straight-line pace: budget x day / days in month. */
  paceUsd: number;
}

export interface TeamBudget {
  teamId: string;
  budgetUsd: number;
  mtdUsd: number;
  /** MTD / budget */
  mtdPct: number;
  projectedMonthEndUsd: number;
  /** projected / budget (1.3 = 130%) */
  projectedPct: number;
  burnPerDayUsd: number;
  daysLeft: number;
  status: BudgetStatus;
  /** Date the projection crosses the budget, or null when it stays under. */
  projectedOverageDate: string | null;
  series: BudgetSeriesPoint[];
}

export const AT_RISK_THRESHOLD = 0.8;

export function budgetStatus(projectedPct: number, mtdPct: number): BudgetStatus {
  if (projectedPct > 1 || mtdPct > 1) return 'over';
  if (projectedPct >= AT_RISK_THRESHOLD) return 'at_risk';
  return 'on_track';
}

export function teamBudget(state: State, teamId: string): TeamBudget {
  const team = state.teams.find((t) => t.id === teamId);
  if (!team) throw new Error(`Unknown team: ${teamId}`);
  const mp = monthProjection(state, { teamId });
  const budget = team.monthlyBudgetUsd;
  const start = monthStart(state.asOf);
  const dim = daysInMonth(state.asOf);
  const daily = dailySeries(state, start, state.asOf, { teamId });
  const series: BudgetSeriesPoint[] = [];
  let cum = 0;
  let overDate: string | null = null;
  for (let i = 0; i < dim; i++) {
    const date = addDays(start, i);
    const day = daily[i];
    let actual: number | null = null;
    let projected: number | null = null;
    if (date <= state.asOf) {
      cum += day?.totalUsd ?? 0;
      actual = cum;
      if (date === state.asOf) projected = cum;
    } else {
      cum += mp.burnPerDay;
      projected = cum;
    }
    if (!overDate && cum > budget) overDate = date;
    series.push({ date, actualCumulativeUsd: actual, projectedCumulativeUsd: projected, budgetUsd: budget, paceUsd: (budget * (i + 1)) / dim });
  }
  const projectedPct = budget > 0 ? mp.projectedMonthEndUsd / budget : 0;
  const mtdPct = budget > 0 ? mp.mtdUsd / budget : 0;
  return {
    teamId,
    budgetUsd: budget,
    mtdUsd: mp.mtdUsd,
    mtdPct,
    projectedMonthEndUsd: mp.projectedMonthEndUsd,
    projectedPct,
    burnPerDayUsd: mp.burnPerDay,
    daysLeft: mp.daysInMonth - mp.daysElapsed,
    status: budgetStatus(projectedPct, mtdPct),
    projectedOverageDate: overDate,
    series,
  };
}

export function allTeamBudgets(state: State): TeamBudget[] {
  return state.teams.map((t) => teamBudget(state, t.id));
}

export function setTeamBudget(state: State, teamId: string, amountUsd: number, at = new Date()): void {
  const team = state.teams.find((t) => t.id === teamId);
  if (!team) throw new Error(`Unknown team: ${teamId}`);
  if (!Number.isFinite(amountUsd) || amountUsd < 0) throw new Error('Budget must be a non-negative number.');
  const before = snapshotBudget(state, teamId);
  team.monthlyBudgetUsd = Math.round(amountUsd);
  const after = snapshotBudget(state, teamId);
  pushAudit(state, { action: 'set_budget', target: teamId, before, after, at });
  state.rev++;
}

/** Approve (raises the team budget by the requested amount) or deny a pending request. */
export function decideBudgetRequest(state: State, id: string, decision: 'approved' | 'denied', at = new Date()): BudgetRequest {
  const br = state.budgetRequests.find((b) => b.id === id);
  if (!br) throw new Error(`Budget request not found: ${id}`);
  if (br.status !== 'pending') throw new Error('Request already decided.');
  const team = state.teams.find((t) => t.id === br.teamId);
  if (!team) throw new Error(`Unknown team: ${br.teamId}`);
  const before: Snapshot = { kind: 'budget_request', requestId: id, status: br.status, decidedAt: br.decidedAt, teamId: team.id, monthlyBudgetUsd: team.monthlyBudgetUsd };
  br.status = decision;
  br.decidedAt = at.toISOString();
  if (decision === 'approved') team.monthlyBudgetUsd += br.amountUsd;
  const after: Snapshot = { kind: 'budget_request', requestId: id, status: br.status, decidedAt: br.decidedAt, teamId: team.id, monthlyBudgetUsd: team.monthlyBudgetUsd };
  pushAudit(state, { action: `budget_request:${decision}`, target: id, before, after, at });
  state.rev++;
  return br;
}
