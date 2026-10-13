// View builders used by API routes. Response types here are the contract documented in app/README-API.md.
import type { BudgetRequest, Recommendation, State, Tool } from './types';
import { eventCountsBySource, monthProjection, spendByDay, spendByModel, spendByTool, spendInRange, trailing30, windowRange, TOOLS } from './engine/ledger';
import { allTeamBudgets, teamBudget, type BudgetStatus, type TeamBudget } from './engine/budgets';
import { teamOutcomes, type TeamOutcomes } from './engine/outcomes';
import { detectWaste, seatUsage, summarizeWaste, SEAT_KINDS, type WasteFinding, type WasteSummary } from './engine/waste';
import { getRecommendations, savingsTotals, type SavingsTotals } from './engine/recommendations';
import { K_ANON_MIN, OTHER_TEAM_ID, teamViews } from './engine/privacy';

export interface TeamRow {
  id: string;
  name: string;
  emName: string | null;
  memberCount: number;
  /** True when this row is the k-anonymity "Other" roll-up. */
  rolledUp: boolean;
  spend30dUsd: number;
  mtdUsd: number;
  budgetUsd: number;
  projectedMonthEndUsd: number;
  projectedPct: number;
  status: BudgetStatus;
  costPerMergedPrUsd: number | null;
  abandonedSpendUsd: number;
  aiAssistedMergeRate: number | null;
  wasteMonthlyUsd: number;
  pendingBudgetRequests: number;
}

export type PublicFinding = Omit<WasteFinding, 'engineerId'>;
export function publicFinding(f: WasteFinding): PublicFinding {
  const { engineerId, ...rest } = f;
  void engineerId;
  return rest;
}

export function teamRows(state: State, days = 30): TeamRow[] {
  const views = teamViews(state.teams, K_ANON_MIN);
  const findings = detectWaste(state, 30);
  const budgets = new Map(allTeamBudgets(state).map((b) => [b.teamId, b]));
  const { from, to } = windowRange(state, days);
  const rows: TeamRow[] = [];
  for (const v of views) {
    if (v.id === OTHER_TEAM_ID) {
      const ids = v.rolledUpFrom;
      const spend = ids.reduce((a, id) => a + spendInRange(state, from, to, { teamId: id }).totalUsd, 0);
      const bs = ids.map((id) => budgets.get(id) as TeamBudget);
      const budget = bs.reduce((a, b) => a + b.budgetUsd, 0);
      const projected = bs.reduce((a, b) => a + b.projectedMonthEndUsd, 0);
      const mtd = bs.reduce((a, b) => a + b.mtdUsd, 0);
      rows.push({
        id: v.id,
        name: v.name,
        emName: null,
        memberCount: v.memberCount,
        rolledUp: true,
        spend30dUsd: spend,
        mtdUsd: mtd,
        budgetUsd: budget,
        projectedMonthEndUsd: projected,
        projectedPct: budget ? projected / budget : 0,
        status: projected > budget ? 'over' : 'on_track',
        costPerMergedPrUsd: null,
        abandonedSpendUsd: 0,
        aiAssistedMergeRate: null,
        wasteMonthlyUsd: findings.filter((f) => f.teamId && ids.includes(f.teamId)).reduce((a, f) => a + f.monthlyImpactUsd, 0),
        pendingBudgetRequests: state.budgetRequests.filter((r) => r.status === 'pending' && ids.includes(r.teamId)).length,
      });
      continue;
    }
    const b = budgets.get(v.id) as TeamBudget;
    const o = teamOutcomes(state, v.id, days);
    rows.push({
      id: v.id,
      name: v.name,
      emName: v.emName,
      memberCount: v.memberCount,
      rolledUp: false,
      spend30dUsd: spendInRange(state, from, to, { teamId: v.id }).totalUsd,
      mtdUsd: b.mtdUsd,
      budgetUsd: b.budgetUsd,
      projectedMonthEndUsd: b.projectedMonthEndUsd,
      projectedPct: b.projectedPct,
      status: b.status,
      costPerMergedPrUsd: o.costPerMergedPrUsd,
      abandonedSpendUsd: o.abandonedSpendUsd,
      aiAssistedMergeRate: o.aiAssistedMergeRate,
      wasteMonthlyUsd: findings.filter((f) => f.teamId === v.id).reduce((a, f) => a + f.monthlyImpactUsd, 0),
      pendingBudgetRequests: state.budgetRequests.filter((r) => r.status === 'pending' && r.teamId === v.id).length,
    });
  }
  return rows;
}

export interface TeamDetail {
  team: TeamRow;
  budget: TeamBudget;
  outcomes: TeamOutcomes;
  wasteFindings: PublicFinding[];
  wasteSummary: WasteSummary;
  budgetRequests: BudgetRequest[];
  recommendations: Recommendation[];
}

export function teamDetail(state: State, teamId: string, days = 30): TeamDetail | null {
  const row = teamRows(state, days).find((r) => r.id === teamId);
  if (!row || row.rolledUp) return null;
  const findings = detectWaste(state, 30).filter((f) => f.teamId === teamId && !SEAT_KINDS.includes(f.kind));
  return {
    team: row,
    budget: teamBudget(state, teamId),
    outcomes: teamOutcomes(state, teamId, days),
    wasteFindings: findings.sort((a, b) => b.costUsd - a.costUsd).slice(0, 200).map(publicFinding),
    wasteSummary: summarizeWaste(detectWaste(state, 30).filter((f) => f.teamId === teamId)),
    budgetRequests: state.budgetRequests.filter((r) => r.teamId === teamId),
    recommendations: getRecommendations(state).filter((r) => r.scope.teamId === teamId),
  };
}

export type ToolDayPoint = {
  date: string;
  claude_code: number;
  cursor: number;
  copilot: number;
  codex: number;
  total: number;
};

export interface StateSummary {
  asOf: string;
  org: { id: string; name: string; engineers: number; planNotes: string };
  demoMode: boolean;
  windowDays: number;
  kpis: {
    mtdSpendUsd: number;
    projectedMonthEndUsd: number;
    trailing30SpendUsd: number;
    usageSpendUsd: number;
    seatSpendUsd: number;
    savingsIdentifiedUsd: { low: number; high: number };
    savingsAppliedUsd: { low: number; high: number };
    costPerMergedPrUsd: number | null;
    /** Share of usage spend attributed to merged, non-reverted PRs (0..1). */
    mergedWorkShare: number;
    abandonedSpendUsd: number;
    aiAssistedMergeRate: number | null;
    teamsOverBudget: number;
    teamsAtRisk: number;
  };
  spendByToolDaily: ToolDayPoint[];
  spendByTool: Record<Tool, { usageUsd: number; seatUsd: number; totalUsd: number }>;
  spendByModel: Record<string, number>;
  teams: TeamRow[];
  savings: SavingsTotals;
  topRecommendations: Recommendation[];
  eventCounts: { seed: number; csv: number; otel: number };
}

export function stateSummary(state: State, days = 30): StateSummary {
  const mp = monthProjection(state);
  const t30 = trailing30(state);
  const recs = getRecommendations(state);
  const totals = savingsTotals(recs);
  const out = teamOutcomes(state, undefined, days);
  const rows = teamRows(state, days);
  const daily: ToolDayPoint[] = spendByDay(state, days === 30 ? 90 : days).map((p) => ({
    date: p.date,
    claude_code: p.byTool.claude_code,
    cursor: p.byTool.cursor,
    copilot: p.byTool.copilot,
    codex: p.byTool.codex,
    total: p.totalUsd,
  }));
  const byTool = spendByTool(state, days);
  void TOOLS;
  return {
    asOf: state.asOf,
    org: { id: state.org.id, name: state.org.name, engineers: state.org.engineers, planNotes: state.org.planNotes },
    demoMode: state.settings.demoMode,
    windowDays: days,
    kpis: {
      mtdSpendUsd: mp.mtdUsd,
      projectedMonthEndUsd: mp.projectedMonthEndUsd,
      trailing30SpendUsd: t30.totalUsd,
      usageSpendUsd: t30.usageUsd,
      seatSpendUsd: t30.seatUsd,
      savingsIdentifiedUsd: { low: totals.identified.low, high: totals.identified.high },
      savingsAppliedUsd: { low: totals.realized.low, high: totals.realized.high },
      costPerMergedPrUsd: out.costPerMergedPrUsd,
      mergedWorkShare: out.mergedWorkShare,
      abandonedSpendUsd: out.abandonedSpendUsd,
      aiAssistedMergeRate: out.aiAssistedMergeRate,
      teamsOverBudget: rows.filter((r) => r.status === 'over').length,
      teamsAtRisk: rows.filter((r) => r.status === 'at_risk').length,
    },
    spendByToolDaily: daily,
    spendByTool: byTool,
    spendByModel: spendByModel(state, days),
    teams: rows,
    savings: totals,
    topRecommendations: recs.filter((r) => r.status === 'identified').slice(0, 5),
    eventCounts: eventCountsBySource(state),
  };
}

// ---------- Seats (admin view) ----------

export interface SeatRow {
  id: string;
  tool: Tool;
  tier: string;
  monthlyPriceUsd: number;
  status: 'active' | 'released';
  lastActiveAt: string;
  assignedAt: string;
  engineerId: string;
  engineerName: string;
  email: string;
  teamId: string;
  teamName: string;
  usage30d: { activeDays: number; costUsd: number };
  flags: Array<'inactive' | 'duplicate' | 'downgradable'>;
}
export interface ToolUtilization {
  tool: Tool;
  seats: number;
  activeSeats: number;
  inactiveSeats: number;
  /** Seats with activity in the last 30 days / seats (0..1). */
  utilization: number;
  monthlySeatCostUsd: number;
}
export interface SeatsView {
  auditNote: string;
  seats: SeatRow[];
  utilization: ToolUtilization[];
  summary: { total: number; inactive: number; duplicate: number; downgradable: number; engineersWithMultipleTools: number; reclaimableMonthlyUsd: number };
}

export function seatsView(state: State): SeatsView {
  const engById = new Map(state.engineers.map((e) => [e.id, e]));
  const teamName = new Map(state.teams.map((t) => [t.id, t.name]));
  const usage = seatUsage(state, 30);
  const flagsBySeat = new Map<string, SeatRow['flags']>();
  let reclaim = 0;
  for (const f of detectWaste(state, 30)) {
    if (!SEAT_KINDS.includes(f.kind)) continue;
    const flag = f.kind === 'inactive_seat' ? 'inactive' : f.kind === 'duplicate_tools' ? 'duplicate' : 'downgradable';
    for (const id of f.seatIds ?? []) {
      const list = flagsBySeat.get(id) ?? [];
      list.push(flag);
      flagsBySeat.set(id, list);
    }
    reclaim += f.monthlyImpactUsd;
  }
  const rows: SeatRow[] = state.seats.map((s) => {
    const e = engById.get(s.engineerId);
    const u = usage.get(`${s.engineerId}|${s.tool}`) ?? { days: 0, costUsd: 0 };
    return {
      id: s.id,
      tool: s.tool,
      tier: s.tier,
      monthlyPriceUsd: s.monthlyPriceUsd,
      status: s.status,
      lastActiveAt: s.lastActiveAt,
      assignedAt: s.assignedAt,
      engineerId: s.engineerId,
      engineerName: e?.displayName ?? 'Unknown',
      email: e?.email ?? '',
      teamId: e?.teamId ?? '',
      teamName: teamName.get(e?.teamId ?? '') ?? '',
      usage30d: { activeDays: u.days, costUsd: u.costUsd },
      flags: flagsBySeat.get(s.id) ?? [],
    };
  });
  const active = rows.filter((r) => r.status === 'active');
  const utilization: ToolUtilization[] = TOOLS.map((tool) => {
    const ts = active.filter((r) => r.tool === tool);
    const used = ts.filter((r) => r.usage30d.activeDays > 0).length;
    return {
      tool,
      seats: ts.length,
      activeSeats: used,
      inactiveSeats: ts.filter((r) => r.flags.includes('inactive')).length,
      utilization: ts.length ? used / ts.length : 0,
      monthlySeatCostUsd: ts.reduce((a, r) => a + r.monthlyPriceUsd, 0),
    };
  }).filter((u) => u.seats > 0);
  const perEng = new Map<string, number>();
  active.forEach((r) => perEng.set(r.engineerId, (perEng.get(r.engineerId) ?? 0) + 1));
  return {
    auditNote: 'Admin view: names are shown because seat management requires it. Access is audited.',
    seats: rows,
    utilization,
    summary: {
      total: active.length,
      inactive: active.filter((r) => r.flags.includes('inactive')).length,
      duplicate: active.filter((r) => r.flags.includes('duplicate')).length,
      downgradable: active.filter((r) => r.flags.includes('downgradable')).length,
      engineersWithMultipleTools: Array.from(perEng.values()).filter((n) => n >= 2).length,
      reclaimableMonthlyUsd: reclaim,
    },
  };
}
