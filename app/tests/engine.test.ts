import { describe, expect, it } from 'vitest';
import { seedState } from '@/lib/seed';
import type { State } from '@/lib/types';
import { monthProjection, spendByTool, spendByTeam, trailing30, spendInRange, dailySeries } from '@/lib/engine/ledger';
import { attributeAll, costRollups, attributeSession } from '@/lib/engine/attribution';
import { teamOutcomes } from '@/lib/engine/outcomes';
import { detectWaste, THRESHOLDS } from '@/lib/engine/waste';
import { getRecommendations, savingsTotals, dismissRecommendation } from '@/lib/engine/recommendations';
import { applyRecommendation, undoAudit } from '@/lib/engine/actions';
import { allTeamBudgets, decideBudgetRequest, teamBudget, budgetStatus } from '@/lib/engine/budgets';
import { forecastOpenEpics } from '@/lib/engine/forecast';
import { buildDigest, digestToMarkdown } from '@/lib/engine/digest';
import { usd, pct } from '@/lib/format';

const AS_OF = '2026-10-13';
const fresh = (): State => seedState(AS_OF);
const base = fresh();

describe('seed', () => {
  it('is deterministic for the same date', () => {
    const a = seedState(AS_OF);
    expect(a.sessions.length).toBe(base.sessions.length);
    expect(a.sessions[100]).toEqual(base.sessions[100]);
    expect(a.teams.map((t) => t.monthlyBudgetUsd)).toEqual(base.teams.map((t) => t.monthlyBudgetUsd));
  });
  it('builds Northwind Labs with 120 engineers across 8 teams', () => {
    expect(base.org.name).toBe('Northwind Labs');
    expect(base.engineers).toHaveLength(120);
    expect(base.teams).toHaveLength(8);
  });
  it('gives about a third of engineers 2+ tools', () => {
    const n = new Map<string, number>();
    base.seats.forEach((s) => n.set(s.engineerId, (n.get(s.engineerId) ?? 0) + 1));
    const multi = Array.from(n.values()).filter((c) => c >= 2).length / 120;
    expect(multi).toBeGreaterThan(0.3);
    expect(multi).toBeLessThan(0.4);
  });
});

describe('ledger', () => {
  it('lands monthly spend in the $45-70K band', () => {
    const t = trailing30(base).totalUsd;
    expect(t).toBeGreaterThan(45_000);
    expect(t).toBeLessThan(70_000);
  });
  it('splits by tool and by team consistently', () => {
    const total = trailing30(base).totalUsd;
    const tools = Object.values(spendByTool(base, 30)).reduce((a, b) => a + b.totalUsd, 0);
    const teams = Object.values(spendByTeam(base, 30)).reduce((a, b) => a + b.totalUsd, 0);
    expect(tools).toBeCloseTo(total, 4);
    expect(teams).toBeCloseTo(total, 4);
  });
  it('projects month-end as MTD plus run rate over remaining days', () => {
    const p = monthProjection(base);
    const remaining = p.daysInMonth - p.daysElapsed;
    expect(p.projectedMonthEndUsd).toBeCloseTo(p.mtdUsd + p.burnPerDay * remaining, 4);
    expect(p.projectedMonthEndUsd).toBeGreaterThan(p.mtdUsd);
  });
  it('median Claude Code spend per active engineer-day is $8-20', () => {
    const per = new Map<string, number>();
    for (const s of base.sessions) {
      if (s.tool !== 'claude_code' || s.kind === 'scheduled') continue;
      const k = s.engineerId + s.startedAt.slice(0, 10);
      per.set(k, (per.get(k) ?? 0) + s.costUsd);
    }
    const v = Array.from(per.values()).sort((a, b) => a - b);
    const med = v[Math.floor(v.length / 2)];
    expect(med).toBeGreaterThan(8);
    expect(med).toBeLessThan(20);
  });
  it('stops charging for released seats from the release date', () => {
    const s = fresh();
    const seat = s.seats.find((x) => x.tool === 'claude_code' && x.tier === 'premium')!;
    const before = spendInRange(s, '2026-10-13', '2026-10-13').seatUsd;
    seat.status = 'released';
    seat.releasedAt = '2026-10-13T00:00:00.000Z';
    s.rev++;
    const after = spendInRange(s, '2026-10-13', '2026-10-13').seatUsd;
    expect(before - after).toBeCloseTo(seat.monthlyPriceUsd / 30, 4);
    expect(dailySeries(s, '2026-10-12', '2026-10-12')[0].seatUsd).toBeGreaterThan(after);
  });
});

describe('attribution and outcomes', () => {
  it('uses explicit prId first and a window join otherwise', () => {
    const att = attributeAll(base);
    const methods = new Set(Array.from(att.values()).map((a) => a.method));
    expect(methods.has('explicit')).toBe(true);
    expect(methods.has('window')).toBe(true);
  });
  it('applies the 21-days-before / 2-days-after window and picks the nearest PR', () => {
    const pr = (id: string, closedAt: string) => ({ id, number: 1, repo: 'r', teamId: 't', authorId: 'e', title: '', ticketId: null, state: 'merged' as const, reverted: false, reviewRounds: 0, openedAt: closedAt, closedAt, linesChanged: 1, aiAssisted: true });
    const near = pr('near', '2026-10-10T12:00:00.000Z');
    const far = pr('far', '2026-10-20T12:00:00.000Z');
    const idx = new Map([['e|r', [far, near]]]);
    const byId = new Map([['near', near], ['far', far]]);
    const sess = { id: 's', tool: 'claude_code' as const, engineerId: 'e', teamId: 't', repo: 'r', model: 'sonnet', startedAt: '2026-10-09T12:00:00.000Z', durationMin: 1, inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, costUsd: 1, linesChanged: 1, prId: null, kind: 'interactive' as const, source: 'seed' as const };
    expect(attributeSession(sess, byId, idx).pr?.id).toBe('near');
    // PR closed 3 days before the session: outside the +2 day tail
    expect(attributeSession({ ...sess, startedAt: '2026-10-14T00:00:00.000Z' }, byId, new Map([['e|r', [near]]])).pr).toBeNull();
    // PR closed more than 21 days after the session
    expect(attributeSession({ ...sess, startedAt: '2026-09-01T00:00:00.000Z' }, byId, idx).pr).toBeNull();
  });
  it('rolls ticket cost up to epics', () => {
    const { byTicket, byEpic } = costRollups(base);
    expect(byTicket.size).toBeGreaterThan(50);
    const t = base.tickets.find((x) => byTicket.has(x.id))!;
    expect(byEpic.get(t.epicId)).toBeGreaterThanOrEqual(byTicket.get(t.id)!);
  });
  it('shows about 22% of resolved AI-assisted PRs closed unmerged', () => {
    const ai = base.prs.filter((p) => p.aiAssisted && p.state !== 'open');
    const rate = ai.filter((p) => p.state === 'closed_unmerged').length / ai.length;
    expect(rate).toBeGreaterThan(0.17);
    expect(rate).toBeLessThan(0.27);
  });
  it('computes team outcomes with a 4-week trend', () => {
    const o = teamOutcomes(base, 'growth', 30);
    expect(o.trend).toHaveLength(4);
    expect(o.costPerMergedPrUsd).toBeGreaterThan(0);
    expect(o.abandonedSpendUsd).toBeGreaterThan(0);
    expect(o.mergedWorkShare).toBeGreaterThan(0);
    expect(o.mergedWorkShare).toBeLessThanOrEqual(1);
  });
});

describe('waste detectors', () => {
  const findings = detectWaste(base, 30);
  const kinds = new Set(findings.map((f) => f.kind));
  it('fires every detector on the seeded org', () => {
    for (const k of ['inactive_seat', 'duplicate_tools', 'downgradable_tier', 'top_model_small_task', 'runaway_session', 'idle_loop', 'abandoned_pr', 'cache_regression', 'copilot_stop_usage_disabled'] as const) {
      expect(kinds.has(k), k).toBe(true);
    }
  });
  it('finds roughly 18% of seats inactive', () => {
    const n = findings.filter((f) => f.kind === 'inactive_seat').length;
    const share = n / base.seats.length;
    expect(share).toBeGreaterThan(0.14);
    expect(share).toBeLessThan(0.22);
  });
  it('finds about 25 duplicate Cursor+Copilot holders', () => {
    const n = findings.filter((f) => f.kind === 'duplicate_tools').length;
    expect(n).toBeGreaterThanOrEqual(20);
    expect(n).toBeLessThanOrEqual(30);
  });
  it('flags 6-12 runaway sessions above the cap, including scheduled loops, all unmerged', () => {
    const r = findings.filter((f) => f.kind === 'runaway_session');
    expect(r.length).toBeGreaterThanOrEqual(6);
    expect(r.length).toBeLessThanOrEqual(12);
    expect(r.every((f) => f.costUsd > THRESHOLDS.runawayMinUsd)).toBe(true);
    expect(r.filter((f) => f.loopId).length).toBeGreaterThanOrEqual(2);
  });
  it('flags Opus on small tasks at roughly 40% of small sessions', () => {
    const small = base.sessions.filter((s) => s.tool === 'claude_code' && s.kind === 'interactive' && s.linesChanged < 40 && s.startedAt.slice(0, 10) >= '2026-09-14');
    const opus = small.filter((s) => s.model === 'opus').length / small.length;
    expect(opus).toBeGreaterThan(0.3);
    expect(opus).toBeLessThan(0.5);
  });
  it('detects the Data team cache regression only', () => {
    const c = findings.filter((f) => f.kind === 'cache_regression');
    expect(c.map((f) => f.teamId)).toEqual(['data']);
  });
  it('never puts an engineer id on session-level findings', () => {
    const ev = findings.filter((f) => ['runaway_session', 'top_model_small_task', 'idle_loop', 'abandoned_pr'].includes(f.kind));
    expect(ev.every((f) => f.engineerId === undefined)).toBe(true);
  });
});

describe('recommendations and actions', () => {
  it('produces a non-empty catalogue with ranges and formulas', () => {
    const recs = getRecommendations(base);
    expect(recs.length).toBeGreaterThanOrEqual(10);
    for (const r of recs) {
      expect(r.estMonthlySavingsUsd.high).toBeGreaterThanOrEqual(r.estMonthlySavingsUsd.low);
      expect(r.formula.length).toBeGreaterThan(10);
      expect(r.status).toBe('identified');
    }
    expect(new Set(recs.map((r) => r.type)).size).toBeGreaterThanOrEqual(7);
  });
  it('applies then undoes a seat release and restores savings and spend', () => {
    const s = fresh();
    const rec = getRecommendations(s).find((r) => r.type === 'R1')!;
    const ids = rec.action!.payload.seatIds as string[];
    const before = monthProjection(s).seatPerDay;
    const entry = applyRecommendation(s, rec.id);
    expect(entry.dryRun).toBe(true);
    expect(s.seats.filter((x) => ids.includes(x.id)).every((x) => x.status === 'released')).toBe(true);
    expect(monthProjection(s).seatPerDay).toBeLessThan(before);
    expect(getRecommendations(s).find((r) => r.id === rec.id)!.status).toBe('applied');
    expect(savingsTotals(getRecommendations(s)).realized.count).toBe(1);
    undoAudit(s, entry.id);
    expect(s.seats.filter((x) => ids.includes(x.id)).every((x) => x.status === 'active')).toBe(true);
    expect(monthProjection(s).seatPerDay).toBeCloseTo(before, 6);
    expect(getRecommendations(s).find((r) => r.id === rec.id)!.status).toBe('identified');
    expect(s.audit.length).toBe(2);
  });
  it('rejects double apply and undo, and supports dismiss', () => {
    const s = fresh();
    const recs = getRecommendations(s);
    const e = applyRecommendation(s, recs[0].id);
    expect(() => applyRecommendation(s, recs[0].id)).toThrow();
    undoAudit(s, e.id);
    expect(() => undoAudit(s, e.id)).toThrow();
    dismissRecommendation(s, recs[1].id);
    expect(getRecommendations(s).find((r) => r.id === recs[1].id)!.status).toBe('dismissed');
  });
  it('applies a controls-type action (loop disable) and undoes it', () => {
    const s = fresh();
    const rec = getRecommendations(s).find((r) => r.type === 'R7')!;
    const e = applyRecommendation(s, rec.id);
    expect(s.controls.disabledLoops).toContain(rec.action!.payload.loopId);
    undoAudit(s, e.id);
    expect(s.controls.disabledLoops).toHaveLength(0);
  });
});

describe('budgets', () => {
  it('has at least one team over budget (Growth near 130%) and a projected overage date', () => {
    const bs = allTeamBudgets(base);
    const growth = bs.find((b) => b.teamId === 'growth')!;
    expect(growth.status).toBe('over');
    expect(growth.projectedPct).toBeGreaterThan(1.15);
    expect(growth.projectedPct).toBeLessThan(1.5);
    expect(growth.projectedOverageDate).not.toBeNull();
  });
  it('classifies status from pacing', () => {
    expect(budgetStatus(0.5, 0.2)).toBe('on_track');
    expect(budgetStatus(0.85, 0.3)).toBe('at_risk');
    expect(budgetStatus(1.01, 0.4)).toBe('over');
  });
  it('approving a budget request raises the budget and is undoable', () => {
    const s = fresh();
    const before = s.teams.find((t) => t.id === 'growth')!.monthlyBudgetUsd;
    decideBudgetRequest(s, 'br_1', 'approved');
    expect(s.teams.find((t) => t.id === 'growth')!.monthlyBudgetUsd).toBe(before + 4000);
    expect(teamBudget(s, 'growth').budgetUsd).toBe(before + 4000);
    expect(() => decideBudgetRequest(s, 'br_1', 'denied')).toThrow();
    undoAudit(s, s.audit[0].id);
    expect(s.teams.find((t) => t.id === 'growth')!.monthlyBudgetUsd).toBe(before);
    expect(s.budgetRequests.find((b) => b.id === 'br_1')!.status).toBe('pending');
  });
});

describe('forecast', () => {
  it('returns ordered percentiles, sample sizes and a baseline for open epics', () => {
    const f = forecastOpenEpics(base);
    expect(f.length).toBeGreaterThan(5);
    for (const e of f) {
      expect(e.p10Usd).toBeLessThanOrEqual(e.p50Usd);
      expect(e.p50Usd).toBeLessThanOrEqual(e.p90Usd);
      expect(e.lowConfidence).toBe(e.sampleSize < 15);
    }
    expect(f.some((e) => e.baselineMedianUsd > 0)).toBe(true);
  });
  it('is deterministic (seeded Monte Carlo)', () => {
    expect(forecastOpenEpics(base)[0].p50Usd).toBe(forecastOpenEpics(base)[0].p50Usd);
  });
});

describe('digest and format', () => {
  it('builds a digest with the key sections and a markdown rendering without names', () => {
    const d = buildDigest(base, 'growth');
    expect(d.headline.status).toBe('over');
    expect(d.cacheHygiene.flaggedRepos.map((r) => r.repo)).toContain('growth-web');
    const md = digestToMarkdown(d);
    expect(md).toContain('Weekly AI spend digest: Growth');
    expect(md).toContain('metadata only');
    for (const e of base.engineers.slice(0, 40)) expect(md.includes(e.displayName)).toBe(false);
  });
  it('formats currency and percent', () => {
    expect(usd(1234.5)).toBe('$1,235');
    expect(usd(12.345)).toBe('$12.35');
    expect(pct(0.425, 1)).toBe('42.5%');
  });
});
