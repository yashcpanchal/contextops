import type { Session, State } from '../types';
import { normalizeModel } from './csv';

// OTLP/HTTP JSON receiver for Claude Code metrics.
// Verified metric names: claude_code.cost.usage (USD), claude_code.token.usage (attribute type =
// input | output | cacheRead | cacheCreation), claude_code.lines_of_code.count (attribute type = added | removed).

export const METRIC_COST = 'claude_code.cost.usage';
export const METRIC_TOKENS = 'claude_code.token.usage';
export const METRIC_LINES = 'claude_code.lines_of_code.count';

interface OtlpValue {
  stringValue?: string;
  intValue?: string | number;
  doubleValue?: number;
  boolValue?: boolean;
}
interface OtlpAttr {
  key: string;
  value?: OtlpValue;
}
interface OtlpPoint {
  attributes?: OtlpAttr[];
  asDouble?: number;
  asInt?: string | number;
  timeUnixNano?: string | number;
  startTimeUnixNano?: string | number;
}
interface OtlpMetric {
  name?: string;
  sum?: { dataPoints?: OtlpPoint[] };
  gauge?: { dataPoints?: OtlpPoint[] };
}
export interface OtlpMetricsRequest {
  resourceMetrics?: Array<{
    resource?: { attributes?: OtlpAttr[] };
    scopeMetrics?: Array<{ metrics?: OtlpMetric[] }>;
  }>;
}

export interface OtelSession {
  sessionId: string;
  email: string | null;
  model: string;
  team: string | null;
  repo: string | null;
  costUsd: number;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  linesChanged: number;
  firstMs: number;
  lastMs: number;
}

export interface ParsedOtel {
  sessions: OtelSession[];
  dataPoints: number;
  ignoredMetrics: number;
}

function attrMap(attrs: OtlpAttr[] | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  for (const a of attrs ?? []) {
    const v = a.value;
    if (!v) continue;
    const val = v.stringValue ?? (v.intValue !== undefined ? String(v.intValue) : v.doubleValue !== undefined ? String(v.doubleValue) : v.boolValue !== undefined ? String(v.boolValue) : undefined);
    if (val !== undefined) out[a.key] = val;
  }
  return out;
}

function pointValue(p: OtlpPoint): number {
  if (p.asDouble !== undefined) return Number(p.asDouble);
  if (p.asInt !== undefined) return Number(p.asInt);
  return 0;
}

function nanoToMs(n: string | number | undefined): number | null {
  if (n === undefined || n === null || n === '') return null;
  const v = Number(n);
  return Number.isFinite(v) && v > 0 ? Math.floor(v / 1e6) : null;
}

/** Parse an OTLP JSON metrics export into per-session aggregates. Data points are treated as deltas. */
export function parseOtlpMetrics(body: unknown, nowMs = Date.now()): ParsedOtel {
  const req = (body ?? {}) as OtlpMetricsRequest;
  const sessions = new Map<string, OtelSession>();
  let dataPoints = 0;
  let ignored = 0;
  for (const rm of req.resourceMetrics ?? []) {
    const res = attrMap(rm.resource?.attributes);
    for (const sm of rm.scopeMetrics ?? []) {
      for (const metric of sm.metrics ?? []) {
        const name = metric.name ?? '';
        if (name !== METRIC_COST && name !== METRIC_TOKENS && name !== METRIC_LINES) {
          ignored++;
          continue;
        }
        const points = metric.sum?.dataPoints ?? metric.gauge?.dataPoints ?? [];
        for (const p of points) {
          const a = { ...res, ...attrMap(p.attributes) };
          const email = (a['user.email'] ?? null)?.toLowerCase() ?? null;
          const t = nanoToMs(p.timeUnixNano) ?? nanoToMs(p.startTimeUnixNano) ?? nowMs;
          const sessionId = a['session.id'] ?? `${email ?? 'unknown'}|${new Date(t).toISOString().slice(0, 10)}`;
          let s = sessions.get(sessionId);
          if (!s) {
            s = {
              sessionId,
              email,
              model: 'unknown',
              team: a['team'] ?? a['team.id'] ?? null,
              repo: a['repo'] ?? a['vcs.repository.name'] ?? null,
              costUsd: 0,
              inputTokens: 0,
              outputTokens: 0,
              cacheReadTokens: 0,
              cacheCreationTokens: 0,
              linesChanged: 0,
              firstMs: t,
              lastMs: t,
            };
            sessions.set(sessionId, s);
          }
          if (a['model'] && (s.model === 'unknown' || name === METRIC_COST)) s.model = normalizeModel(a['model']);
          s.firstMs = Math.min(s.firstMs, nanoToMs(p.startTimeUnixNano) ?? t);
          s.lastMs = Math.max(s.lastMs, t);
          const v = pointValue(p);
          dataPoints++;
          if (name === METRIC_COST) s.costUsd += v;
          else if (name === METRIC_LINES) {
            if ((a['type'] ?? 'added') === 'added') s.linesChanged += v;
          } else {
            const type = a['type'] ?? 'input';
            if (type === 'input') s.inputTokens += v;
            else if (type === 'output') s.outputTokens += v;
            else if (type === 'cacheRead') s.cacheReadTokens += v;
            else if (type === 'cacheCreation') s.cacheCreationTokens += v;
          }
        }
      }
    }
  }
  return { sessions: Array.from(sessions.values()), dataPoints, ignoredMetrics: ignored };
}

export interface OtelIngestResult {
  dataPoints: number;
  sessionsCreated: number;
  sessionsUpdated: number;
  sessionsRejected: number;
  rejectedReasons: string[];
  addedCostUsd: number;
}

function resolveTeamId(state: State, hint: string | null, fallback: string): string {
  if (!hint) return fallback;
  const h = hint.toLowerCase();
  const t = state.teams.find((x) => x.id === h || x.name.toLowerCase() === h);
  return t ? t.id : fallback;
}

/** Merge parsed OTel sessions into state as source 'otel' events; same session.id accumulates. */
export function ingestOtel(state: State, parsed: ParsedOtel): OtelIngestResult {
  const byEmail = new Map(state.engineers.map((e) => [e.email.toLowerCase(), e]));
  const byId = new Map<string, Session>();
  for (const s of state.sessions) if (s.source === 'otel') byId.set(s.id, s);
  const result: OtelIngestResult = { dataPoints: parsed.dataPoints, sessionsCreated: 0, sessionsUpdated: 0, sessionsRejected: 0, rejectedReasons: [], addedCostUsd: 0 };
  for (const o of parsed.sessions) {
    const eng = o.email ? byEmail.get(o.email) : undefined;
    if (!eng) {
      result.sessionsRejected++;
      if (result.rejectedReasons.length < 10) result.rejectedReasons.push(`Unknown user.email: ${o.email ?? '(missing)'}`);
      continue;
    }
    const id = `otel_${o.sessionId}`;
    const existing = byId.get(id);
    result.addedCostUsd += o.costUsd;
    if (existing) {
      existing.costUsd += o.costUsd;
      existing.inputTokens += Math.round(o.inputTokens);
      existing.outputTokens += Math.round(o.outputTokens);
      existing.cacheReadTokens += Math.round(o.cacheReadTokens);
      existing.linesChanged += Math.round(o.linesChanged);
      const startMs = Math.min(Date.parse(existing.startedAt), o.firstMs);
      existing.startedAt = new Date(startMs).toISOString();
      existing.durationMin = Math.max(existing.durationMin, Math.round((o.lastMs - startMs) / 60000));
      result.sessionsUpdated++;
    } else {
      const ev: Session = {
        id,
        tool: 'claude_code',
        engineerId: eng.id,
        teamId: resolveTeamId(state, o.team, eng.teamId),
        repo: o.repo ?? 'unknown',
        model: o.model,
        startedAt: new Date(o.firstMs).toISOString(),
        durationMin: Math.round((o.lastMs - o.firstMs) / 60000),
        inputTokens: Math.round(o.inputTokens),
        outputTokens: Math.round(o.outputTokens),
        cacheReadTokens: Math.round(o.cacheReadTokens),
        costUsd: o.costUsd,
        linesChanged: Math.round(o.linesChanged),
        prId: null,
        kind: 'interactive',
        source: 'otel',
        loopId: null,
      };
      state.sessions.push(ev);
      byId.set(id, ev);
      result.sessionsCreated++;
    }
    const seat = state.seats.find((s) => s.engineerId === eng.id && s.tool === 'claude_code' && s.status === 'active');
    if (seat && seat.lastActiveAt < new Date(o.lastMs).toISOString()) seat.lastActiveAt = new Date(o.lastMs).toISOString();
  }
  state.ingest.otelRequests++;
  state.ingest.otelDataPoints += parsed.dataPoints;
  state.ingest.otelSessions += result.sessionsCreated;
  state.ingest.lastOtelAt = new Date().toISOString();
  state.rev++;
  return result;
}
