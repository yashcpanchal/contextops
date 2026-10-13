import type { PullRequest, Session, State } from '../types';
import { DAY_MS } from '../dates';

export type AttributionMethod = 'explicit' | 'window' | 'none';

export interface Attribution {
  sessionId: string;
  prId: string | null;
  ticketId: string | null;
  epicId: string | null;
  method: AttributionMethod;
  /** 0..1 */
  confidence: number;
}

export const WINDOW_BEFORE_DAYS = 21;
export const WINDOW_AFTER_DAYS = 2;

/**
 * Join one session to a PR. Explicit prId wins; otherwise the nearest PR (by close time) for the same
 * engineer + repo whose close time lies within [-21d, +2d] of the session start.
 */
export function attributeSession(
  s: Session,
  prsById: Map<string, PullRequest>,
  prsByAuthorRepo: Map<string, PullRequest[]>,
): { pr: PullRequest | null; method: AttributionMethod; confidence: number } {
  if (s.prId) {
    const pr = prsById.get(s.prId);
    if (pr) return { pr, method: 'explicit', confidence: 0.95 };
  }
  const cands = prsByAuthorRepo.get(`${s.engineerId}|${s.repo}`);
  if (!cands) return { pr: null, method: 'none', confidence: 0 };
  const t = Date.parse(s.startedAt);
  let best: PullRequest | null = null;
  let bestGap = Infinity;
  for (const pr of cands) {
    if (!pr.closedAt) continue;
    const closed = Date.parse(pr.closedAt);
    const delta = closed - t; // positive when PR closed after the session
    if (delta > WINDOW_BEFORE_DAYS * DAY_MS || delta < -WINDOW_AFTER_DAYS * DAY_MS) continue;
    const gap = Math.abs(delta);
    if (gap < bestGap) {
      bestGap = gap;
      best = pr;
    }
  }
  if (!best) return { pr: null, method: 'none', confidence: 0 };
  const confidence = Math.max(0.3, 0.8 - (bestGap / (WINDOW_BEFORE_DAYS * DAY_MS)) * 0.5);
  return { pr: best, method: 'window', confidence };
}

const cache = new WeakMap<State, { rev: number; sessions: number; prs: number; map: Map<string, Attribution> }>();

/** Attribution for every session (memoised per state revision). */
export function attributeAll(state: State): Map<string, Attribution> {
  const hit = cache.get(state);
  if (hit && hit.rev === state.rev && hit.sessions === state.sessions.length && hit.prs === state.prs.length) {
    return hit.map;
  }
  const prsById = new Map(state.prs.map((p) => [p.id, p]));
  const byAuthorRepo = new Map<string, PullRequest[]>();
  for (const pr of state.prs) {
    const k = `${pr.authorId}|${pr.repo}`;
    const list = byAuthorRepo.get(k);
    if (list) list.push(pr);
    else byAuthorRepo.set(k, [pr]);
  }
  const ticketsById = new Map(state.tickets.map((t) => [t.id, t]));
  const map = new Map<string, Attribution>();
  for (const s of state.sessions) {
    const { pr, method, confidence } = attributeSession(s, prsById, byAuthorRepo);
    const ticket = pr?.ticketId ? ticketsById.get(pr.ticketId) : undefined;
    map.set(s.id, {
      sessionId: s.id,
      prId: pr?.id ?? null,
      ticketId: ticket?.id ?? null,
      epicId: ticket?.epicId ?? null,
      method,
      confidence,
    });
  }
  cache.set(state, { rev: state.rev, sessions: state.sessions.length, prs: state.prs.length, map });
  return map;
}

/** Attributed AI cost per PR / ticket / epic. */
export function costRollups(state: State): {
  byPr: Map<string, number>;
  byTicket: Map<string, number>;
  byEpic: Map<string, number>;
} {
  const att = attributeAll(state);
  const byPr = new Map<string, number>();
  const byTicket = new Map<string, number>();
  const byEpic = new Map<string, number>();
  for (const s of state.sessions) {
    const a = att.get(s.id);
    if (!a || !a.prId) continue;
    byPr.set(a.prId, (byPr.get(a.prId) ?? 0) + s.costUsd);
    if (a.ticketId) byTicket.set(a.ticketId, (byTicket.get(a.ticketId) ?? 0) + s.costUsd);
    if (a.epicId) byEpic.set(a.epicId, (byEpic.get(a.epicId) ?? 0) + s.costUsd);
  }
  return { byPr, byTicket, byEpic };
}
