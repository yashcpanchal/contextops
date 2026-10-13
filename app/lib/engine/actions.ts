import type { AuditLogEntry, Controls, Seat, SeatTier, State } from '../types';
import { SEAT_PRICES } from '../pricing';
import { getRecommendations } from './recommendations';

// Demo-mode action layer. Applying mutates state, writes an audit entry (dryRun = true) and can be undone.

interface SeatSnapshot {
  id: string;
  status: Seat['status'];
  releasedAt: string | null;
  tier: SeatTier;
  monthlyPriceUsd: number;
}
export type Snapshot =
  | { kind: 'seats'; items: SeatSnapshot[] }
  | { kind: 'controls'; controls: Controls; copilotStopUsageEnabled: boolean }
  | { kind: 'budget'; teamId: string; monthlyBudgetUsd: number }
  | { kind: 'budget_request'; requestId: string; status: string; decidedAt: string | null; teamId: string; monthlyBudgetUsd: number };

function snapshotSeats(seats: Seat[]): Snapshot {
  return {
    kind: 'seats',
    items: seats.map((s) => ({ id: s.id, status: s.status, releasedAt: s.releasedAt ?? null, tier: s.tier, monthlyPriceUsd: s.monthlyPriceUsd })),
  };
}
function snapshotControls(state: State): Snapshot {
  return {
    kind: 'controls',
    controls: structuredClone(state.controls),
    copilotStopUsageEnabled: state.org.config.copilotStopUsageEnabled,
  };
}

let auditSeq = 0;
export function pushAudit(state: State, e: Omit<AuditLogEntry, 'id' | 'at' | 'actor' | 'dryRun'> & { at?: Date }): AuditLogEntry {
  const entry: AuditLogEntry = {
    id: `aud_${Date.now().toString(36)}_${(++auditSeq).toString(36)}_${state.audit.length + 1}`,
    at: (e.at ?? new Date()).toISOString(),
    actor: 'demo-admin',
    action: e.action,
    target: e.target,
    before: e.before,
    after: e.after,
    dryRun: true,
    undone: false,
    recommendationId: e.recommendationId ?? null,
  };
  state.audit.unshift(entry);
  return entry;
}

export function applyRecommendation(state: State, id: string, at = new Date()): AuditLogEntry {
  const rec = getRecommendations(state).find((r) => r.id === id);
  if (!rec) throw new Error(`Recommendation not found: ${id}`);
  if (rec.status === 'applied') throw new Error('Recommendation already applied.');
  if (rec.status === 'dismissed') throw new Error('Recommendation was dismissed.');
  if (!rec.action) throw new Error('Recommendation has no automated action.');
  const { kind, payload } = rec.action;
  let before: Snapshot;
  let after: Snapshot;

  switch (kind) {
    case 'release_seats':
    case 'downgrade_seats': {
      const ids = new Set(payload.seatIds as string[]);
      const seats = state.seats.filter((s) => ids.has(s.id) && s.status === 'active');
      before = snapshotSeats(seats);
      for (const s of seats) {
        if (kind === 'release_seats') {
          s.status = 'released';
          s.releasedAt = `${state.asOf}T00:00:00.000Z`;
        } else {
          const to = payload.toTier as SeatTier;
          s.tier = to;
          s.monthlyPriceUsd = SEAT_PRICES[s.tool][to] ?? s.monthlyPriceUsd;
        }
      }
      after = snapshotSeats(seats);
      break;
    }
    default: {
      before = snapshotControls(state);
      const c = state.controls;
      const teamId = payload.teamId as string | undefined;
      if (kind === 'set_model_default' && teamId) c.teamModelDefault[teamId] = payload.to as string;
      else if (kind === 'set_subagent_model' && teamId) c.subagentModel[teamId] = payload.to as string;
      else if (kind === 'set_runaway_cap' && teamId) c.runawayCapUsd[teamId] = payload.capUsd as number;
      else if (kind === 'disable_loop') {
        const loopId = payload.loopId as string;
        if (!c.disabledLoops.includes(loopId)) c.disabledLoops.push(loopId);
      } else if (kind === 'set_cache_hygiene' && teamId) {
        if (!c.cacheHygieneTeams.includes(teamId)) c.cacheHygieneTeams.push(teamId);
      } else if (kind === 'enable_plan_mode' && teamId) {
        if (!c.planModeTeams.includes(teamId)) c.planModeTeams.push(teamId);
      } else if (kind === 'set_copilot_stop_usage') state.org.config.copilotStopUsageEnabled = Boolean(payload.enabled);
      after = snapshotControls(state);
    }
  }

  state.recommendationLog[id] = { rec: { ...rec, status: 'applied' }, status: 'applied', updatedAt: at.toISOString() };
  const entry = pushAudit(state, { action: `apply:${kind}`, target: id, before, after, recommendationId: id, at });
  state.rev++;
  return entry;
}

function restore(state: State, snap: Snapshot): void {
  switch (snap.kind) {
    case 'seats':
      for (const item of snap.items) {
        const seat = state.seats.find((s) => s.id === item.id);
        if (!seat) continue;
        seat.status = item.status;
        seat.releasedAt = item.releasedAt;
        seat.tier = item.tier;
        seat.monthlyPriceUsd = item.monthlyPriceUsd;
      }
      break;
    case 'controls':
      state.controls = structuredClone(snap.controls);
      state.org.config.copilotStopUsageEnabled = snap.copilotStopUsageEnabled;
      break;
    case 'budget': {
      const t = state.teams.find((x) => x.id === snap.teamId);
      if (t) t.monthlyBudgetUsd = snap.monthlyBudgetUsd;
      break;
    }
    case 'budget_request': {
      const br = state.budgetRequests.find((x) => x.id === snap.requestId);
      if (br) {
        br.status = snap.status as typeof br.status;
        br.decidedAt = snap.decidedAt;
      }
      const t = state.teams.find((x) => x.id === snap.teamId);
      if (t) t.monthlyBudgetUsd = snap.monthlyBudgetUsd;
      break;
    }
  }
}

/** Restore the `before` snapshot of an audit entry. */
export function undoAudit(state: State, auditId: string, at = new Date()): AuditLogEntry {
  const entry = state.audit.find((a) => a.id === auditId);
  if (!entry) throw new Error(`Audit entry not found: ${auditId}`);
  if (entry.undone) throw new Error('Already undone.');
  if (entry.action.startsWith('undo:')) throw new Error('Undo entries cannot be undone.');
  restore(state, entry.before as Snapshot);
  entry.undone = true;
  if (entry.recommendationId) delete state.recommendationLog[entry.recommendationId];
  const undo = pushAudit(state, { action: `undo:${entry.action}`, target: entry.target, before: entry.after, after: entry.before, recommendationId: entry.recommendationId ?? null, at });
  state.rev++;
  return undo;
}

export function snapshotBudget(state: State, teamId: string): Snapshot {
  const t = state.teams.find((x) => x.id === teamId);
  return { kind: 'budget', teamId, monthlyBudgetUsd: t?.monthlyBudgetUsd ?? 0 };
}

/** Ad hoc bulk seat release (admin action, audited, undoable). */
export function releaseSeats(state: State, seatIds: string[], at = new Date()): AuditLogEntry {
  const ids = new Set(seatIds);
  const seats = state.seats.filter((s) => ids.has(s.id) && s.status === 'active');
  if (!seats.length) throw new Error('No active seats matched.');
  const before = snapshotSeats(seats);
  for (const s of seats) {
    s.status = 'released';
    s.releasedAt = `${state.asOf}T00:00:00.000Z`;
  }
  const entry = pushAudit(state, { action: 'release_seats', target: `${seats.length} seats`, before, after: snapshotSeats(seats), at });
  state.rev++;
  return entry;
}
