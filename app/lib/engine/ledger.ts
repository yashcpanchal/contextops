import type { State, Tool } from '../types';
import { addDays, dayKey, daysInMonth, diffDays, monthStart, rangeDays } from '../dates';

export interface SpendSplit {
  usageUsd: number;
  seatUsd: number;
  totalUsd: number;
}
export interface LedgerFilter {
  teamId?: string;
  tool?: Tool;
}
export interface DailyPoint extends SpendSplit {
  date: string;
  byTool: Record<Tool, number>;
}
export interface MonthProjection {
  month: string;
  asOf: string;
  daysElapsed: number;
  daysInMonth: number;
  mtdUsd: number;
  mtdUsageUsd: number;
  mtdSeatUsd: number;
  /** Mean daily usage cost over the last 14 days. */
  usageRunRatePerDay: number;
  /** Daily seat cost of active seats at asOf. */
  seatPerDay: number;
  burnPerDay: number;
  projectedMonthEndUsd: number;
}

interface Cell {
  usage: number;
  seat: number;
}
type Index = Map<string, Cell>; // key: day|team|tool

const cache = new WeakMap<State, { rev: number; sessions: number; seats: number; idx: Index }>();
const SEAT_LOOKBACK_DAYS = 130;

export const TOOLS: Tool[] = ['claude_code', 'cursor', 'copilot', 'codex'];

function key(day: string, team: string, tool: string): string {
  return `${day}|${team}|${tool}`;
}

function buildIndex(state: State): Index {
  const idx: Index = new Map();
  const cell = (k: string): Cell => {
    let c = idx.get(k);
    if (!c) {
      c = { usage: 0, seat: 0 };
      idx.set(k, c);
    }
    return c;
  };
  for (const s of state.sessions) {
    cell(key(s.startedAt.slice(0, 10), s.teamId, s.tool)).usage += s.costUsd;
  }
  const teamOf = new Map(state.engineers.map((e) => [e.id, e.teamId]));
  const earliest = addDays(state.asOf, -SEAT_LOOKBACK_DAYS);
  for (const seat of state.seats) {
    const teamId = teamOf.get(seat.engineerId);
    if (!teamId) continue;
    const start = seat.assignedAt.slice(0, 10) > earliest ? seat.assignedAt.slice(0, 10) : earliest;
    const end = seat.releasedAt ? addDays(seat.releasedAt.slice(0, 10), -1) : state.asOf;
    const last = end < state.asOf ? end : state.asOf;
    const perDay = seat.monthlyPriceUsd / 30;
    for (let d = start; d <= last; d = addDays(d, 1)) cell(key(d, teamId, seat.tool)).seat += perDay;
  }
  return idx;
}

function getIndex(state: State): Index {
  const hit = cache.get(state);
  if (hit && hit.rev === state.rev && hit.sessions === state.sessions.length && hit.seats === state.seats.length) {
    return hit.idx;
  }
  const idx = buildIndex(state);
  cache.set(state, { rev: state.rev, sessions: state.sessions.length, seats: state.seats.length, idx });
  return idx;
}

const emptyByTool = (): Record<Tool, number> => ({ claude_code: 0, cursor: 0, copilot: 0, codex: 0 });

/** Day-by-day spend (usage + prorated seat cost) from `from` to `to` inclusive. */
export function dailySeries(state: State, from: string, to: string, filter: LedgerFilter = {}): DailyPoint[] {
  const idx = getIndex(state);
  const teams = filter.teamId ? [filter.teamId] : state.teams.map((t) => t.id);
  const tools = filter.tool ? [filter.tool] : TOOLS;
  const out: DailyPoint[] = [];
  const n = diffDays(to, from);
  for (let i = 0; i <= n; i++) {
    const date = addDays(from, i);
    const byTool = emptyByTool();
    let usage = 0;
    let seat = 0;
    for (const team of teams) {
      for (const tool of tools) {
        const c = idx.get(key(date, team, tool));
        if (!c) continue;
        usage += c.usage;
        seat += c.seat;
        byTool[tool] += c.usage + c.seat;
      }
    }
    out.push({ date, usageUsd: usage, seatUsd: seat, totalUsd: usage + seat, byTool });
  }
  return out;
}

export function spendInRange(state: State, from: string, to: string, filter: LedgerFilter = {}): SpendSplit {
  let usageUsd = 0;
  let seatUsd = 0;
  for (const p of dailySeries(state, from, to, filter)) {
    usageUsd += p.usageUsd;
    seatUsd += p.seatUsd;
  }
  return { usageUsd, seatUsd, totalUsd: usageUsd + seatUsd };
}

/** Last `days` days ending at asOf. */
export function windowRange(state: State, days: number): { from: string; to: string } {
  return { from: addDays(state.asOf, -(days - 1)), to: state.asOf };
}

export function spendByTool(state: State, days = 30): Record<Tool, SpendSplit> {
  const { from, to } = windowRange(state, days);
  const out = {} as Record<Tool, SpendSplit>;
  for (const tool of TOOLS) out[tool] = spendInRange(state, from, to, { tool });
  return out;
}

export function spendByTeam(state: State, days = 30): Record<string, SpendSplit> {
  const { from, to } = windowRange(state, days);
  const out: Record<string, SpendSplit> = {};
  for (const t of state.teams) out[t.id] = spendInRange(state, from, to, { teamId: t.id });
  return out;
}

/** Usage-only spend by model (seats have no model). */
export function spendByModel(state: State, days = 30): Record<string, number> {
  const { from, to } = windowRange(state, days);
  const out: Record<string, number> = {};
  for (const s of state.sessions) {
    const d = s.startedAt.slice(0, 10);
    if (d < from || d > to) continue;
    out[s.model] = (out[s.model] ?? 0) + s.costUsd;
  }
  return out;
}

export function spendByDay(state: State, days = 90): DailyPoint[] {
  const { from, to } = windowRange(state, days);
  return dailySeries(state, from, to);
}

/** MTD and projected month-end: MTD + remaining days x (14-day usage run rate + current seat cost/day). */
export function monthProjection(state: State, filter: LedgerFilter = {}): MonthProjection {
  const asOf = state.asOf;
  const start = monthStart(asOf);
  const mtd = spendInRange(state, start, asOf, filter);
  const recent = spendInRange(state, addDays(asOf, -13), asOf, filter);
  const usageRate = recent.usageUsd / 14;
  const seatToday = dailySeries(state, asOf, asOf, filter)[0]?.seatUsd ?? 0;
  const dim = daysInMonth(asOf);
  const elapsed = diffDays(asOf, start) + 1;
  const remaining = dim - elapsed;
  const burn = usageRate + seatToday;
  return {
    month: asOf.slice(0, 7),
    asOf,
    daysElapsed: elapsed,
    daysInMonth: dim,
    mtdUsd: mtd.totalUsd,
    mtdUsageUsd: mtd.usageUsd,
    mtdSeatUsd: mtd.seatUsd,
    usageRunRatePerDay: usageRate,
    seatPerDay: seatToday,
    burnPerDay: burn,
    projectedMonthEndUsd: mtd.totalUsd + burn * remaining,
  };
}

/** Seat vs usage split for a trailing window. */
export function seatVsUsage(state: State, days = 30): SpendSplit & { seatShare: number } {
  const { from, to } = windowRange(state, days);
  const s = spendInRange(state, from, to);
  return { ...s, seatShare: s.totalUsd > 0 ? s.seatUsd / s.totalUsd : 0 };
}

/** Rolling 30-day total ending at asOf (the "monthly spend" figure). */
export function trailing30(state: State, filter: LedgerFilter = {}): SpendSplit {
  const { from, to } = windowRange(state, 30);
  return spendInRange(state, from, to, filter);
}

export function eventCountsBySource(state: State): Record<'seed' | 'csv' | 'otel', number> {
  const out = { seed: 0, csv: 0, otel: 0 };
  for (const s of state.sessions) out[s.source]++;
  return out;
}

export { dayKey, rangeDays };
