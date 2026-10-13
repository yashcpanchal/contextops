import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { seedState } from '@/lib/seed';
import { importCsvRows, normalizeModel, normalizeTool, parseCsv, tokenizeCsv } from '@/lib/ingest/csv';
import { ingestOtel, parseOtlpMetrics } from '@/lib/ingest/otel';
import { assertNoPersonIdentifiers, publicSession, selfView, teamViews, K_ANON_MIN } from '@/lib/engine/privacy';
import { eventCountsBySource } from '@/lib/engine/ledger';
import { detectWaste } from '@/lib/engine/waste';
import { publicFinding, teamRows } from '@/lib/views';
import type { Team } from '@/lib/types';

const fresh = () => seedState('2026-10-13');
const sample = (f: string) => fs.readFileSync(path.join(process.cwd(), 'samples', f), 'utf8');

describe('csv parser', () => {
  it('handles quotes, escaped quotes and CRLF', () => {
    const t = tokenizeCsv('a,b\r\n"x,1","he said ""hi"""\r\n');
    expect(t).toEqual([['a', 'b'], ['x,1', 'he said "hi"']]);
  });
  it('requires all documented columns', () => {
    const r = parseCsv('date,tool\n2026-10-01,cursor\n');
    expect(r.rows).toHaveLength(0);
    expect(r.errors[0]).toMatch(/Missing required column/);
  });
  it('reports bad rows but keeps good ones', () => {
    const h = 'date,tool,user_email,model,input_tokens,output_tokens,cost_usd,repo\n';
    const r = parseCsv(h + '2026-10-01,cursor,a@b.co,auto,1,1,2.5,r\nnot-a-date,cursor,a@b.co,auto,1,1,2.5,r\n2026-10-01,cursor,a@b.co,auto,1,1,abc,r\n');
    expect(r.rows).toHaveLength(1);
    expect(r.errors).toHaveLength(2);
  });
  it('normalises tools and models', () => {
    expect(normalizeTool('GitHub Copilot')).toBe('copilot');
    expect(normalizeTool('Claude')).toBe('claude_code');
    expect(normalizeTool('vim')).toBeNull();
    expect(normalizeModel('claude-opus-4-1')).toBe('opus');
  });
  it('imports the sample CSV by email, raises counts, and is idempotent', () => {
    const s = fresh();
    const before = eventCountsBySource(s).csv;
    const parsed = parseCsv(sample('spend-sample.csv'));
    expect(parsed.errors).toHaveLength(0);
    const r1 = importCsvRows(s, parsed);
    expect(r1.eventsAdded).toBe(parsed.rows.length);
    expect(r1.unmatchedRows).toBe(0);
    expect(eventCountsBySource(s).csv).toBe(before + parsed.rows.length);
    const r2 = importCsvRows(s, parsed);
    expect(r2.eventsAdded).toBe(0);
    expect(r2.duplicatesSkipped).toBe(parsed.rows.length);
    expect(s.ingest.csvEvents).toBe(parsed.rows.length);
  });
  it('rejects unknown emails', () => {
    const s = fresh();
    const r = importCsvRows(s, parseCsv('date,tool,user_email,model,input_tokens,output_tokens,cost_usd,repo\n2026-10-01,cursor,ghost@nowhere.io,auto,1,1,2,r\n'));
    expect(r.eventsAdded).toBe(0);
    expect(r.unmatchedEmails).toEqual(['ghost@nowhere.io']);
  });
});

describe('otel parser', () => {
  const body = JSON.parse(sample('otel-sample.json'));
  it('aggregates cost, token types and lines per session.id', () => {
    const p = parseOtlpMetrics(body);
    expect(p.sessions).toHaveLength(3);
    const s = p.sessions.find((x) => x.sessionId === 'sample-sess-0001')!;
    expect(s.costUsd).toBeCloseTo(3.42, 6);
    expect(s.inputTokens).toBe(182000);
    expect(s.outputTokens).toBe(24100);
    expect(s.cacheReadTokens).toBe(1250000);
    expect(s.cacheCreationTokens).toBe(52000);
    expect(s.linesChanged).toBe(86);
    expect(s.team).toBe('payments');
    expect(s.repo).toBe('pay-api');
    expect(s.model).toBe('sonnet');
  });
  it('ignores unrelated metrics and tolerates garbage', () => {
    expect(parseOtlpMetrics({}).sessions).toHaveLength(0);
    expect(parseOtlpMetrics(null).sessions).toHaveLength(0);
    const p = parseOtlpMetrics({ resourceMetrics: [{ scopeMetrics: [{ metrics: [{ name: 'claude_code.session.count', sum: { dataPoints: [{ asInt: '1' }] } }] }] }] });
    expect(p.sessions).toHaveLength(0);
    expect(p.ignoredMetrics).toBe(1);
  });
  it('creates otel events, then accumulates repeated posts of the same session', () => {
    const s = fresh();
    const n = s.sessions.length;
    const r1 = ingestOtel(s, parseOtlpMetrics(body));
    expect(r1.sessionsCreated).toBe(3);
    expect(s.sessions.length).toBe(n + 3);
    expect(eventCountsBySource(s).otel).toBe(3);
    const ev = s.sessions.find((x) => x.id === 'otel_sample-sess-0001')!;
    expect(ev.source).toBe('otel');
    expect(ev.teamId).toBe('payments');
    const r2 = ingestOtel(s, parseOtlpMetrics(body));
    expect(r2.sessionsUpdated).toBe(3);
    expect(s.sessions.length).toBe(n + 3);
    expect(ev.costUsd).toBeCloseTo(6.84, 6);
    expect(s.ingest.otelRequests).toBe(2);
  });
  it('rejects sessions from unknown users', () => {
    const s = fresh();
    const clone = JSON.parse(JSON.stringify(body));
    clone.resourceMetrics = clone.resourceMetrics.slice(0, 1);
    for (const a of clone.resourceMetrics[0].scopeMetrics[0].metrics[0].sum.dataPoints[0].attributes) if (a.key === 'user.email') a.value.stringValue = 'x@y.z';
    for (const m of clone.resourceMetrics[0].scopeMetrics[0].metrics.slice(1)) for (const p of m.sum.dataPoints) for (const a of p.attributes) if (a.key === 'user.email') a.value.stringValue = 'x@y.z';
    const r = ingestOtel(s, parseOtlpMetrics(clone));
    expect(r.sessionsRejected).toBe(1);
    expect(r.sessionsCreated).toBe(0);
  });
});

describe('privacy', () => {
  const s = fresh();
  it('rolls teams under k=5 into Other', () => {
    const mk = (id: string, n: number): Team => ({ id, name: id, emName: 'x', memberIds: Array.from({ length: n }, (_, i) => `${id}${i}`), monthlyBudgetUsd: 1000 });
    const v = teamViews([mk('a', 8), mk('b', 3), mk('c', 4)]);
    expect(v.map((x) => x.id)).toEqual(['a', 'other']);
    const other = v.find((x) => x.id === 'other')!;
    expect(other.memberCount).toBe(7);
    expect(other.suppressed).toBe(false);
    expect(teamViews([mk('b', 3)])[0].suppressed).toBe(true);
    expect(K_ANON_MIN).toBe(5);
  });
  it('public sessions carry no person identifiers', () => {
    const pub = publicSession(s.sessions[0]);
    expect(() => assertNoPersonIdentifiers(pub)).not.toThrow();
    expect(pub.label).toMatch(/^(Session|Scheduled run) in /);
    expect(() => assertNoPersonIdentifiers({ a: [{ engineerId: 'e' }] })).toThrow();
  });
  it('waste findings and team rows pass the identifier guard once made public', () => {
    const f = detectWaste(s, 30).map(publicFinding);
    expect(() => assertNoPersonIdentifiers(f)).not.toThrow();
    expect(() => assertNoPersonIdentifiers(teamRows(s))).not.toThrow();
  });
  it('self view returns only that engineer data', () => {
    const e = s.engineers.find((x) => s.sessions.some((y) => y.engineerId === x.id && y.startedAt >= '2026-09-20'))!;
    const v = selfView(s, e.id, 30);
    const expected = s.sessions.filter((y) => y.engineerId === e.id && y.startedAt.slice(0, 10) >= '2026-09-14').reduce((a, y) => a + y.costUsd, 0);
    expect(v.totalUsd).toBeCloseTo(expected, 4);
    expect(v.daily).toHaveLength(30);
    expect(() => selfView(s, 'nobody')).toThrow();
  });
});
