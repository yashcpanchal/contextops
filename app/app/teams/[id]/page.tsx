import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Mail } from 'lucide-react';
import { getState } from '@/lib/store';
import { teamDetail } from '@/lib/views';
import { usd, pct, dateShort, dateLong } from '@/lib/format';
import { Badge, Card, ConfidenceBadge, EmptyState, Kpi, PageHeader, StatusBadge, Table, statusTone } from '@/components/ui';
import { BurnChart, OutcomeTrendChart } from '@/components/Charts';
import { Gauge } from '@/components/Gauge';
import { BudgetEditor, BudgetRequests } from '@/components/TeamControls';
import { ApplyRecButton } from '@/components/RecActions';
import { KIND_LABEL, parseRange, TOOL_LABEL, usdRangeFull } from '@/components/format';

export const dynamic = 'force-dynamic';

export default function TeamPage({ params, searchParams }: { params: { id: string }; searchParams: { range?: string } }) {
  const days = parseRange(searchParams.range);
  const d = teamDetail(getState(), params.id, days);
  if (!d) notFound();
  const { team, budget, outcomes, wasteFindings, wasteSummary, budgetRequests, recommendations } = d;
  const tone = statusTone(budget.status);
  const series = budget.series.map((p) => ({ date: p.date, actual: p.actualCumulativeUsd, projected: p.projectedCumulativeUsd, budget: p.budgetUsd, pace: Math.round(p.paceUsd) }));
  const trend = outcomes.trend.map((w) => ({ week: dateShort(w.weekStart), cost: w.costPerMergedPrUsd === null ? null : Math.round(w.costPerMergedPrUsd), spend: w.usageSpendUsd, merged: w.mergedPrs }));
  const openRecs = recommendations.filter((r) => r.status !== 'dismissed');
  const topFindings = wasteFindings.slice(0, 8);

  return (
    <div>
      <Link href="/teams" className="mb-3 inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
        <ArrowLeft className="h-3.5 w-3.5" /> All teams
      </Link>
      <PageHeader
        title={team.name}
        subtitle={`${team.memberCount} engineers, managed by ${team.emName}. Budget copilot for the current month.`}
        actions={
          <>
            <StatusBadge status={budget.status} />
            <Link href={`/digest/${team.id}`} className="btn-primary"><Mail className="h-4 w-4" /> Preview weekly digest</Link>
          </>
        }
      />

      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <Card title="Budget pacing" subtitle="Projected month-end as a share of budget (tick = 100%)">
          <Gauge ratio={budget.projectedPct} tone={tone} label="projected vs budget" sub={`${usd(budget.projectedMonthEndUsd)} projected of ${usd(budget.budgetUsd)}`} />
          <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-sm dark:border-slate-800">
            <div><dt className="label-xs">Month to date</dt><dd className="mt-0.5 font-semibold tabular-nums">{usd(budget.mtdUsd)}</dd></div>
            <div><dt className="label-xs">Burn per day</dt><dd className="mt-0.5 font-semibold tabular-nums">{usd(budget.burnPerDayUsd)}</dd></div>
            <div><dt className="label-xs">Days left</dt><dd className="mt-0.5 font-semibold tabular-nums">{budget.daysLeft}</dd></div>
            <div>
              <dt className="label-xs">Projected overage</dt>
              <dd className={`mt-0.5 font-semibold tabular-nums ${budget.projectedOverageDate ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {budget.projectedOverageDate ? dateLong(budget.projectedOverageDate) : 'Stays under'}
              </dd>
            </div>
          </dl>
          <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
            <div className="label-xs mb-1.5">Monthly budget</div>
            <BudgetEditor teamId={team.id} teamName={team.name} budgetUsd={budget.budgetUsd} />
          </div>
        </Card>
        <Card className="lg:col-span-2" title="Burn vs budget" subtitle="Cumulative spend this month, projected at the trailing 14-day run rate">
          <BurnChart data={series} />
        </Card>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Cost per merged PR" value={outcomes.costPerMergedPrUsd === null ? 'n/a' : usd(outcomes.costPerMergedPrUsd)} sub={`${outcomes.mergedAiPrs} merged AI-assisted PRs, ${days}d`} />
        <Kpi label="Abandoned spend" value={usd(outcomes.abandonedSpendUsd)} tone={outcomes.abandonedSpendUsd > 0 ? 'amber' : 'neutral'} sub={`${outcomes.closedUnmergedAiPrs} PRs closed unmerged`} />
        <Kpi label="AI-assisted merge rate" value={outcomes.aiAssistedMergeRate === null ? 'n/a' : pct(outcomes.aiAssistedMergeRate)} sub={`${outcomes.revertedPrs} reverted`} />
        <Kpi label="Spend on merged work" value={pct(outcomes.mergedWorkShare)} sub={`of ${usd(outcomes.usageSpendUsd)} usage spend`} />
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <Card title="Cost per merged PR, 4-week trend" subtitle="Weekly usage spend divided by AI-assisted PRs merged that week">
          <OutcomeTrendChart data={trend} />
        </Card>
        <Card title="Budget requests" subtitle="Approve to raise the monthly budget by the requested amount">
          <BudgetRequests requests={budgetRequests} budgetUsd={budget.budgetUsd} />
        </Card>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <Card
          title="Waste events"
          subtitle={`${usd(wasteSummary.totalMonthlyImpactUsd)} / month estimated impact. Events, never people.`}
          action={<Link href={`/waste?team=${team.id}`} className="text-xs font-medium text-emerald-700 hover:underline dark:text-emerald-400">Explore all</Link>}
          pad={false}
        >
          {topFindings.length === 0 ? (
            <div className="p-5"><EmptyState title="No waste events" body="Nothing flagged for this team in the last 30 days." /></div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {topFindings.map((f) => (
                <li key={f.id} className="px-5 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{f.label}</span>
                    <span className="font-semibold tabular-nums text-amber-700 dark:text-amber-400">{usd(f.costUsd)}</span>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <Badge tone="amber">{KIND_LABEL[f.kind] ?? f.kind}</Badge>
                    {f.repo && <span>{f.repo}</span>}
                    {f.at && <span>{dateShort(f.at)}</span>}
                    {f.outcome && <span>{f.outcome}</span>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card title="Recommendations for this team" subtitle="Approval-gated; every change is audited and undoable" pad={false}>
          {openRecs.length === 0 ? (
            <div className="p-5"><EmptyState title="No team-scoped recommendations" /></div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {openRecs.map((r) => (
                <li key={r.id} className="flex items-start gap-3 px-5 py-3.5">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2"><Badge>{r.type}</Badge><span className="text-sm font-medium text-slate-900 dark:text-slate-100">{r.title}</span></div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">{usdRangeFull(r.estMonthlySavingsUsd.low, r.estMonthlySavingsUsd.high)}/mo</span>
                      <ConfidenceBadge c={r.confidence} />
                      {r.scope.tool && <span>{TOOL_LABEL[r.scope.tool]}</span>}
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
