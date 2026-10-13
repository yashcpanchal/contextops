import type { State, TicketType } from '../types';
import { mulberry32 } from '../seed';
import { costRollups } from './attribution';
import { median } from './waste';

export const MIN_TEAM_SAMPLE = 8;
export const LOW_CONFIDENCE_BELOW = 15;
export const MONTE_CARLO_DRAWS = 1000;

export interface TypeBreakdown {
  type: TicketType;
  tickets: number;
  pool: 'team' | 'org' | 'none';
  sampleSize: number;
  medianUsd: number;
}

export interface EpicForecast {
  epicId: string;
  key: string;
  name: string;
  teamId: string;
  ticketsTotal: number;
  ticketsDone: number;
  ticketsRemaining: number;
  spentToDateUsd: number;
  /** Remaining cost percentiles from Monte Carlo. */
  p10Usd: number;
  p50Usd: number;
  p90Usd: number;
  /** Baseline: sum of per-type medians for remaining tickets. */
  baselineMedianUsd: number;
  /** Smallest pool used across ticket types. */
  sampleSize: number;
  lowConfidence: boolean;
  breakdown: TypeBreakdown[];
  beta: true;
}

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function percentile(sorted: number[], p: number): number {
  if (!sorted.length) return 0;
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.floor(p * (sorted.length - 1))));
  return sorted[idx];
}

/** Attributed AI cost of closed tickets, keyed by team and type. Tickets with no AI cost are excluded. */
export function historicalTicketCosts(state: State): { org: Map<TicketType, number[]>; team: Map<string, number[]> } {
  const { byTicket } = costRollups(state);
  const epicTeam = new Map(state.epics.map((e) => [e.id, e.teamId]));
  const org = new Map<TicketType, number[]>();
  const team = new Map<string, number[]>();
  for (const t of state.tickets) {
    if (t.status !== 'done') continue;
    const cost = byTicket.get(t.id) ?? 0;
    if (cost <= 0) continue;
    (org.get(t.type) ?? org.set(t.type, []).get(t.type)!).push(cost);
    const k = `${epicTeam.get(t.epicId)}|${t.type}`;
    (team.get(k) ?? team.set(k, []).get(k)!).push(cost);
  }
  return { org, team };
}

export function forecastEpic(state: State, epicId: string): EpicForecast {
  const epic = state.epics.find((e) => e.id === epicId);
  if (!epic) throw new Error(`Unknown epic: ${epicId}`);
  const { byTicket } = costRollups(state);
  const hist = historicalTicketCosts(state);
  const tickets = state.tickets.filter((t) => epic.ticketIds.includes(t.id));
  const remaining = tickets.filter((t) => t.status !== 'done');
  const done = tickets.filter((t) => t.status === 'done');
  const spent = done.reduce((a, t) => a + (byTicket.get(t.id) ?? 0), 0);

  const breakdown: TypeBreakdown[] = [];
  const pools: number[][] = [];
  const types = Array.from(new Set(remaining.map((t) => t.type)));
  for (const type of types) {
    const teamPool = hist.team.get(`${epic.teamId}|${type}`) ?? [];
    const orgPool = hist.org.get(type) ?? [];
    const usingTeam = teamPool.length >= MIN_TEAM_SAMPLE;
    const pool = usingTeam ? teamPool : orgPool;
    breakdown.push({
      type,
      tickets: remaining.filter((t) => t.type === type).length,
      pool: pool.length === 0 ? 'none' : usingTeam ? 'team' : 'org',
      sampleSize: pool.length,
      medianUsd: median(pool),
    });
    pools.push(pool);
  }
  const poolByType = new Map<TicketType, number[]>(types.map((t, i) => [t, pools[i]]));

  const rand = mulberry32(hashString(epic.id));
  const totals: number[] = [];
  for (let d = 0; d < MONTE_CARLO_DRAWS; d++) {
    let total = 0;
    for (const t of remaining) {
      const pool = poolByType.get(t.type) ?? [];
      if (pool.length) total += pool[Math.floor(rand() * pool.length)];
    }
    totals.push(total);
  }
  totals.sort((a, b) => a - b);
  const baseline = breakdown.reduce((a, b) => a + b.medianUsd * b.tickets, 0);
  const sample = breakdown.length ? Math.min(...breakdown.map((b) => b.sampleSize)) : 0;
  return {
    epicId: epic.id,
    key: epic.key,
    name: epic.name,
    teamId: epic.teamId,
    ticketsTotal: tickets.length,
    ticketsDone: done.length,
    ticketsRemaining: remaining.length,
    spentToDateUsd: spent,
    p10Usd: percentile(totals, 0.1),
    p50Usd: percentile(totals, 0.5),
    p90Usd: percentile(totals, 0.9),
    baselineMedianUsd: baseline,
    sampleSize: sample,
    lowConfidence: sample < LOW_CONFIDENCE_BELOW,
    breakdown,
    beta: true,
  };
}

export function forecastOpenEpics(state: State): EpicForecast[] {
  return state.epics.filter((e) => e.status === 'open').map((e) => forecastEpic(state, e.id));
}
