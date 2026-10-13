import { FlaskConical, Info } from 'lucide-react';
import { getState } from '@/lib/store';
import { forecastOpenEpics, LOW_CONFIDENCE_BELOW, MIN_TEAM_SAMPLE, MONTE_CARLO_DRAWS } from '@/lib/engine/forecast';
import { usd, usdCompact } from '@/lib/format';
import { Badge, Card, EmptyState, PageHeader } from '@/components/ui';
import { ForecastChart } from '@/components/Charts';
import { titleCase } from '@/lib/format';

export const dynamic = 'force-dynamic';

export default function ForecastPage() {
  const state = getState();
  const teamName = new Map(state.teams.map((t) => [t.id, t.name]));
  const fc = forecastOpenEpics(state).sort((a, b) => b.p50Usd - a.p50Usd);
  const scale = Math.max(1, ...fc.flatMap((f) => [f.p90Usd, f.baselineMedianUsd]));
  const chart = fc.map((f) => ({ name: f.key, p10: Math.round(f.p10Usd), p50: Math.round(f.p50Usd), p90: Math.round(f.p90Usd), baseline: Math.round(f.baselineMedianUsd) }));

  return (
    <div>
      <PageHeader
        title="Epic cost forecast"
        subtitle="How much AI spend is still ahead for each open epic, as a range rather than a single number."
        actions={<Badge tone="indigo"><FlaskConical className="h-3 w-3" /> Beta</Badge>}
      />
      {fc.length === 0 ? (
        <EmptyState title="No open epics" body="Forecasts appear when there are open epics with remaining tickets." />
      ) : (
        <>
          <Card title="Remaining cost by epic" subtitle="p10, p50 and p90 of remaining AI cost, with the simple median-by-type baseline" className="mb-6">
            <ForecastChart data={chart} />
          </Card>

          <div className="mb-6 space-y-4">
            {fc.map((f) => (
              <Card key={f.epicId}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>{f.key}</Badge>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">{f.name}</h3>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      {teamName.get(f.teamId) ?? f.teamId}. {f.ticketsDone} of {f.ticketsTotal} tickets done, {f.ticketsRemaining} remaining. Spent to date {usd(f.spentToDateUsd)}.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge tone={f.lowConfidence ? 'amber' : 'emerald'}>n = {f.sampleSize} historical tickets</Badge>
                    {f.lowConfidence && <Badge tone="amber">Low confidence</Badge>}
                  </div>
                </div>

                <div className="mt-5">
                  <div className="relative h-9">
                    <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200 dark:bg-slate-700" />
                    <div className="absolute top-1/2 h-4 -translate-y-1/2 rounded bg-emerald-200/80 dark:bg-emerald-500/25" style={{ left: `${(f.p10Usd / scale) * 100}%`, width: `${Math.max(0.5, ((f.p90Usd - f.p10Usd) / scale) * 100)}%` }} title="p10 to p90" />
                    <div className="absolute top-1/2 h-6 w-1 -translate-x-1/2 -translate-y-1/2 rounded bg-emerald-600" style={{ left: `${(f.p50Usd / scale) * 100}%` }} title={`p50 ${usd(f.p50Usd)}`} />
                    <div className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-slate-500 bg-white dark:bg-slate-900" style={{ left: `${(f.baselineMedianUsd / scale) * 100}%` }} title={`Baseline ${usd(f.baselineMedianUsd)}`} />
                  </div>
                  <div className="mt-1 flex justify-between text-[11px] text-slate-400 tabular-nums"><span>$0</span><span>{usdCompact(scale)}</span></div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                  <Stat label="p10 (optimistic)" value={usd(f.p10Usd)} />
                  <Stat label="p50 (median)" value={usd(f.p50Usd)} strong />
                  <Stat label="p90 (pessimistic)" value={usd(f.p90Usd)} />
                  <Stat label="Baseline: median by type" value={usd(f.baselineMedianUsd)} muted />
                </div>

                <details className="mt-4 text-sm">
                  <summary className="cursor-pointer text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">Ticket mix and sample pools</summary>
                  <table className="mt-2 w-full text-xs">
                    <thead>
                      <tr className="text-left text-slate-500"><th className="py-1 font-medium">Type</th><th className="font-medium">Remaining</th><th className="font-medium">Pool</th><th className="font-medium">Sample</th><th className="text-right font-medium">Median</th></tr>
                    </thead>
                    <tbody className="tabular-nums">
                      {f.breakdown.map((b) => (
                        <tr key={b.type} className="border-t border-slate-100 dark:border-slate-800">
                          <td className="py-1.5">{titleCase(b.type)}</td><td>{b.tickets}</td><td>{b.pool === 'team' ? 'This team' : b.pool === 'org' ? 'Whole org' : 'None'}</td><td>{b.sampleSize}</td><td className="text-right">{usd(b.medianUsd)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </details>
              </Card>
            ))}
          </div>

          <div className="mb-3 flex items-center gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5"><span className="h-3 w-5 rounded bg-emerald-200 dark:bg-emerald-500/30" /> p10 to p90 range</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-4 w-1 rounded bg-emerald-600" /> p50</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rotate-45 border-2 border-slate-500" /> baseline</span>
          </div>
        </>
      )}

      <Card title="Methodology" className="mt-2">
        <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <div className="space-y-2">
            <p>For every unfinished ticket in an open epic we sample from the empirical distribution of attributed AI cost on past closed tickets of the same type. We use the team's own history when it has at least {MIN_TEAM_SAMPLE} comparable tickets, otherwise the whole org. We repeat this {MONTE_CARLO_DRAWS.toLocaleString()} times (seeded, so results are stable) and read off the 10th, 50th and 90th percentile of the summed cost.</p>
            <p>The baseline is the simpler sum of per-type medians; when it sits well outside the p10-p90 band the ticket mix is unusual. Pools smaller than {LOW_CONFIDENCE_BELOW} tickets are flagged low confidence. Costs come from sessions joined to PRs, then tickets and epics, so unattributed spend is not included. This is a beta: treat it as a planning range, not a commitment.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Stat({ label, value, strong, muted }: { label: string; value: string; strong?: boolean; muted?: boolean }) {
  return (
    <div className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/50">
      <div className="label-xs">{label}</div>
      <div className={`mt-0.5 tabular-nums ${strong ? 'text-lg font-semibold text-emerald-700 dark:text-emerald-400' : muted ? 'text-base font-medium text-slate-500' : 'text-base font-medium text-slate-900 dark:text-slate-100'}`}>{value}</div>
    </div>
  );
}
