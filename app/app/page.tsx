import Link from 'next/link';
import { ArrowRight, CircleDollarSign, GitMerge, PiggyBank, TrendingUp, Wallet } from 'lucide-react';
import { getState } from '@/lib/store';
import { stateSummary } from '@/lib/views';
import { usd, usdCompact, usdRange, pct } from '@/lib/format';
import { Badge, Card, ConfidenceBadge, EmptyState, Kpi, PageHeader, ProgressBar, StatusBadge } from '@/components/ui';
import { SpendByToolChart, TeamBudgetChart } from '@/components/Charts';
import { ApplyRecButton } from '@/components/RecActions';
import { parseRange, usdRangeFull, TOOL_COLOR, TOOL_LABEL } from '@/components/format';

export const dynamic = 'force-dynamic';

export default function Overview({ searchParams }: { searchParams: { range?: string } }) {
  const days = parseRange(searchParams.range);
  const s = stateSummary(getState(), days);
  const k = s.kpis;
  const totalBudget = s.teams.reduce((a, t) => a + t.budgetUsd, 0);
  const daily = s.spendByToolDaily.slice(-days);
  const attention = s.teams.filter((t) => t.status !== 'on_track').sort((a, b) => b.projectedPct - a.projectedPct);
  const toolTotal = Object.values(s.spendByTool).reduce((a, t) => a + t.totalUsd, 0) || 1;
  const teamData = s.teams.map((t) => ({ name: t.name, mtd: Math.round(t.mtdUsd), projected: Math.round(t.projectedMonthEndUsd), budget: Math.round(t.budgetUsd) }));

  return (
    <div>
      <PageHeader title="Overview" subtitle={`AI coding spend across Claude Code, Cursor, Copilot and Codex, joined to PR outcomes. Showing the last ${days} days.`} />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Kpi label="Month-to-date spend" value={usd(k.mtdSpendUsd)} sub={`${pct(k.mtdSpendUsd / totalBudget)} of ${usdCompact(totalBudget)} budgets`} icon={<Wallet className="h-4 w-4" />} />
        <Kpi
          label="Projected month-end"
          value={usd(k.projectedMonthEndUsd)}
          tone={k.projectedMonthEndUsd > totalBudget ? 'rose' : 'neutral'}
          sub={`${pct(k.projectedMonthEndUsd / totalBudget)} of budget, ${k.teamsOverBudget} over, ${k.teamsAtRisk} at risk`}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <Kpi
          label="Savings identified"
          value={usdRange(k.savingsIdentifiedUsd.low, k.savingsIdentifiedUsd.high)}
          tone="emerald"
          sub={`per month, ${usdRangeFull(k.savingsAppliedUsd.low, k.savingsAppliedUsd.high)} applied`}
          icon={<PiggyBank className="h-4 w-4" />}
        />
        <Kpi label="Cost per merged PR" value={k.costPerMergedPrUsd === null ? 'n/a' : usd(k.costPerMergedPrUsd)} sub={`AI-assisted merge rate ${k.aiAssistedMergeRate === null ? 'n/a' : pct(k.aiAssistedMergeRate)}`} icon={<GitMerge className="h-4 w-4" />} />
        <Kpi label="Spend on merged work" value={pct(k.mergedWorkShare)} tone={k.mergedWorkShare < 0.6 ? 'amber' : 'neutral'} sub={`${usd(k.abandonedSpendUsd)} went to abandoned PRs`} icon={<CircleDollarSign className="h-4 w-4" />} />
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2" title={`Daily spend by tool, last ${days} days`} subtitle="Usage plus prorated seat cost, USD per day">
          <SpendByToolChart data={daily} />
        </Card>
        <Card title="Where the money goes" subtitle={`Trailing 30 days: ${usd(k.trailing30SpendUsd)}`}>
          <ul className="space-y-4">
            {Object.entries(s.spendByTool)
              .filter(([, v]) => v.totalUsd > 0)
              .sort((a, b) => b[1].totalUsd - a[1].totalUsd)
              .map(([tool, v]) => (
                <li key={tool}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium text-slate-800 dark:text-slate-100">
                      <span className="h-2.5 w-2.5 rounded-sm" style={{ background: TOOL_COLOR[tool] }} />
                      {TOOL_LABEL[tool]}
                    </span>
                    <span className="tabular-nums">{usd(v.totalUsd)}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-1.5 rounded-full" style={{ width: `${(v.totalUsd / toolTotal) * 100}%`, background: TOOL_COLOR[tool] }} />
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {usd(v.usageUsd)} usage, {usd(v.seatUsd)} seats
                  </div>
                </li>
              ))}
          </ul>
          <div className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800">
            Seats are {pct(k.seatSpendUsd / (k.seatSpendUsd + k.usageSpendUsd || 1))} of spend. Usage events: {s.eventCounts.seed.toLocaleString()} seeded, {s.eventCounts.csv.toLocaleString()} CSV, {s.eventCounts.otel.toLocaleString()} OTel.
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Teams vs budget" subtitle="Month-to-date and projected month-end against the monthly budget (dot)">
          <TeamBudgetChart data={teamData} />
          {attention.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
              {attention.map((t) => (
                <Link key={t.id} href={`/teams/${t.id}`} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                  <StatusBadge status={t.status} /> {t.name} <span className="tabular-nums text-slate-500">{pct(t.projectedPct)}</span>
                </Link>
              ))}
            </div>
          )}
        </Card>

        <Card
          title="Top recommendations"
          subtitle="Highest estimated monthly savings, approval-gated"
          action={
            <Link href="/savings" className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:underline dark:text-emerald-400">
              All recommendations <ArrowRight className="h-3 w-3" />
            </Link>
          }
          pad={false}
        >
          {s.topRecommendations.length === 0 ? (
            <div className="p-5"><EmptyState title="Nothing to act on" body="No open recommendations. Ingest more data or reset the demo." /></div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {s.topRecommendations.map((r) => (
                <li key={r.id} className="flex items-start gap-3 px-5 py-3.5">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge>{r.type}</Badge>
                      <span className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{r.title}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">{usdRangeFull(r.estMonthlySavingsUsd.low, r.estMonthlySavingsUsd.high)}/mo</span>
                      <ConfidenceBadge c={r.confidence} />
                    </div>
                  </div>
                  <ApplyRecButton rec={r} label="Apply" />
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
