import { Eye, ShieldCheck } from 'lucide-react';
import { getState } from '@/lib/store';
import { seatsView } from '@/lib/views';
import { usd, pct } from '@/lib/format';
import { Card, Kpi, PageHeader } from '@/components/ui';
import { UtilizationChart } from '@/components/Charts';
import { SeatsTable } from '@/components/SeatsTable';
import { TOOL_LABEL } from '@/components/format';

export const dynamic = 'force-dynamic';

export default function SeatsPage() {
  const v = seatsView(getState());
  const util = v.utilization.map((u) => ({ name: TOOL_LABEL[u.tool], utilization: u.utilization, seats: u.seats, tool: u.tool }));
  return (
    <div>
      <div className="mb-5 flex items-start gap-3 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-900 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200">
        <Eye className="mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <span className="font-semibold">Admin view: audited.</span> {v.auditNote} This is the only page in ContextOps that shows engineer names, and it shows seat status, not performance. There is no ranking by spend.
        </div>
      </div>
      <PageHeader title="Seat audit" subtitle="License utilization across Claude Code, Cursor and Copilot. Release unused seats in bulk with a confirmed, undoable action." />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Kpi label="Active seats" value={v.summary.total} sub={`${v.summary.engineersWithMultipleTools} engineers hold 2+ tools`} />
        <Kpi label="Inactive 30d+" value={v.summary.inactive} tone={v.summary.inactive ? 'rose' : 'neutral'} sub="no usage in 30 days" />
        <Kpi label="Duplicate tools" value={v.summary.duplicate} tone={v.summary.duplicate ? 'amber' : 'neutral'} sub="overlapping Cursor + Copilot" />
        <Kpi label="Downgradable" value={v.summary.downgradable} tone={v.summary.downgradable ? 'amber' : 'neutral'} sub="usage fits a cheaper tier" />
        <Kpi label="Reclaimable" value={usd(v.summary.reclaimableMonthlyUsd)} tone="emerald" sub="per month, estimate" />
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2" title="Utilization by tool" subtitle="Share of paid seats with any activity in the last 30 days (dashed line = 80% target)">
          <UtilizationChart data={util} />
        </Card>
        <Card title="Seat cost by tool">
          <ul className="space-y-3">
            {v.utilization.map((u) => (
              <li key={u.tool} className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium text-slate-900 dark:text-slate-100">{TOOL_LABEL[u.tool]}</div>
                  <div className="text-xs text-slate-500">{u.seats} seats, {u.inactiveSeats} inactive, {pct(u.utilization)} used</div>
                </div>
                <div className="font-semibold tabular-nums">{usd(u.monthlySeatCostUsd)}<span className="text-xs font-normal text-slate-500">/mo</span></div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800">
            <ShieldCheck className="h-4 w-4 text-emerald-500" /> Seat releases are audited and undoable.
          </div>
        </Card>
      </div>

      <Card title="Seats" subtitle="Select seats to release. Nothing changes until you confirm." pad={false}>
        <SeatsTable seats={v.seats} />
      </Card>
    </div>
  );
}
