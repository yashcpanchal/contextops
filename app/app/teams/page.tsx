import Link from 'next/link';
import { getState } from '@/lib/store';
import { teamRows } from '@/lib/views';
import { usd, pct } from '@/lib/format';
import { Badge, Card, Kpi, PageHeader, ProgressBar, StatusBadge, Table, statusTone } from '@/components/ui';
import { parseRange } from '@/components/format';
import { Banner } from '@/components/ui';
import { Info } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function TeamsPage({ searchParams }: { searchParams: { range?: string } }) {
  const days = parseRange(searchParams.range);
  const rows = teamRows(getState(), days);
  const sorted = [...rows].sort((a, b) => a.name.localeCompare(b.name));
  const over = rows.filter((r) => r.status === 'over').length;
  const risk = rows.filter((r) => r.status === 'at_risk').length;
  const pending = rows.reduce((a, r) => a + r.pendingBudgetRequests, 0);
  const waste = rows.reduce((a, r) => a + r.wasteMonthlyUsd, 0);

  return (
    <div>
      <PageHeader title="Teams" subtitle="Budget pacing and outcomes per team. Teams are listed alphabetically; ContextOps never ranks individuals." />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Teams over budget" value={over} tone={over ? 'rose' : 'neutral'} sub="projected month-end above budget" />
        <Kpi label="Teams at risk" value={risk} tone={risk ? 'amber' : 'neutral'} sub="projected at 80% or more" />
        <Kpi label="Pending budget requests" value={pending} sub="awaiting manager decision" />
        <Kpi label="Waste signals" value={usd(rows.reduce((a, r) => a + r.wasteMonthlyUsd, 0))} tone="amber" sub={`${usd(waste)} / month recoverable (estimate)`} />
      </div>
      {rows.some((r) => r.rolledUp) && (
        <Banner tone="sky" icon={<Info className="h-4 w-4" />}>Teams with fewer than 5 members are rolled up into "Other" to protect individuals (k-anonymity floor).</Banner>
      )}
      <Card pad={false}>
        <Table min={980}>
          <thead className="border-b border-slate-100 dark:border-slate-800">
            <tr>
              <th className="th">Team</th>
              <th className="th">Status</th>
              <th className="th w-56">Budget pacing</th>
              <th className="th text-right">MTD</th>
              <th className="th text-right">Projected</th>
              <th className="th text-right">Cost / merged PR</th>
              <th className="th text-right">Abandoned</th>
              <th className="th text-right">Merge rate</th>
              <th className="th text-right">Waste / mo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {sorted.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                <td className="td">
                  {t.rolledUp ? (
                    <div className="font-medium">{t.name} <span className="font-normal text-slate-500">(rolled up)</span></div>
                  ) : (
                    <Link href={`/teams/${t.id}`} className="font-medium text-slate-900 hover:text-emerald-700 hover:underline dark:text-slate-100 dark:hover:text-emerald-400">{t.name}</Link>
                  )}
                  <div className="text-xs text-slate-500">{t.memberCount} engineers{t.emName ? `, EM ${t.emName}` : ''}</div>
                </td>
                <td className="td">
                  <div className="flex items-center gap-1.5">
                    <StatusBadge status={t.status} />
                    {t.pendingBudgetRequests > 0 && <Badge tone="amber">{t.pendingBudgetRequests} request</Badge>}
                  </div>
                </td>
                <td className="td">
                  <ProgressBar value={t.mtdUsd / (t.budgetUsd || 1)} tone={statusTone(t.status)} />
                  <div className="mt-1.5 text-xs tabular-nums text-slate-500">{pct(t.mtdUsd / (t.budgetUsd || 1))} used of {usd(t.budgetUsd)}</div>
                </td>
                <td className="td text-right tabular-nums">{usd(t.mtdUsd)}</td>
                <td className="td text-right tabular-nums">
                  <span className={t.projectedPct > 1 ? 'font-semibold text-rose-600 dark:text-rose-400' : ''}>{usd(t.projectedMonthEndUsd)}</span>
                  <div className="text-xs text-slate-500">{pct(t.projectedPct)}</div>
                </td>
                <td className="td text-right tabular-nums">{t.costPerMergedPrUsd === null ? 'n/a' : usd(t.costPerMergedPrUsd)}</td>
                <td className="td text-right tabular-nums">{usd(t.abandonedSpendUsd)}</td>
                <td className="td text-right tabular-nums">{t.aiAssistedMergeRate === null ? 'n/a' : pct(t.aiAssistedMergeRate)}</td>
                <td className="td text-right tabular-nums text-amber-700 dark:text-amber-400">{usd(t.wasteMonthlyUsd)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
