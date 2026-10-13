import Link from 'next/link';
import clsx from 'clsx';
import { getState } from '@/lib/store';
import { detectWaste, SEAT_KINDS, summarizeWaste } from '@/lib/engine/waste';
import { publicFinding } from '@/lib/views';
import { usd, dateShort } from '@/lib/format';
import { Badge, Banner, Card, EmptyState, Kpi, PageHeader, Table } from '@/components/ui';
import { KIND_LABEL, TOOL_LABEL } from '@/components/format';
import { Info } from 'lucide-react';

export const dynamic = 'force-dynamic';

const EVENT_KINDS = ['runaway_session', 'abandoned_pr', 'reverted_pr', 'top_model_small_task', 'idle_loop', 'cache_regression', 'copilot_stop_usage_disabled'];
const LIMIT = 150;

export default function WastePage({ searchParams }: { searchParams: { kind?: string; team?: string } }) {
  const state = getState();
  const all = detectWaste(state, 30).filter((f) => !SEAT_KINDS.includes(f.kind));
  const teamName = new Map(state.teams.map((t) => [t.id, t.name]));
  const summary = summarizeWaste(all);
  const kind = searchParams.kind && EVENT_KINDS.includes(searchParams.kind) ? searchParams.kind : 'all';
  const team = searchParams.team && teamName.has(searchParams.team) ? searchParams.team : 'all';
  const rows = all
    .filter((f) => (kind === 'all' || f.kind === kind) && (team === 'all' || f.teamId === team))
    .sort((a, b) => b.costUsd - a.costUsd)
    .map(publicFinding);
  const q = (k: string, t: string) => {
    const p = new URLSearchParams();
    if (k !== 'all') p.set('kind', k);
    if (t !== 'all') p.set('team', t);
    const s = p.toString();
    return s ? `/waste?${s}` : '/waste';
  };
  const present = EVENT_KINDS.filter((k) => summary.byKind[k]);

  return (
    <div>
      <PageHeader title="Waste explorer" subtitle="Event-level findings from the last 30 days: sessions, PRs and loops. Sessions are labelled by repo, never by person." />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Total estimated impact" value={usd(summary.totalMonthlyImpactUsd)} tone="amber" sub="per month, event-level kinds" />
        <Kpi label="Runaway sessions" value={summary.byKind.runaway_session?.count ?? 0} sub={`${usd(summary.byKind.runaway_session?.costUsd ?? 0)} spent, no merged PR`} />
        <Kpi label="Abandoned PR spend" value={usd(summary.byKind.abandoned_pr?.costUsd ?? 0)} sub={`${summary.byKind.abandoned_pr?.count ?? 0} PRs closed unmerged`} />
        <Kpi label="Top-tier model, small tasks" value={summary.byKind.top_model_small_task?.count ?? 0} sub={`${usd(summary.byKind.top_model_small_task?.monthlyImpactUsd ?? 0)}/mo avoidable`} />
      </div>
      <Banner tone="sky" icon={<Info className="h-4 w-4" />}>
        Seat waste (inactive, duplicate and downgradable seats) lives in the audited <Link href="/seats" className="font-medium underline">Seat audit</Link>, the only place names appear.
      </Banner>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {[['all', 'All events'] as const, ...present.map((k) => [k, KIND_LABEL[k]] as const)].map(([k, label]) => (
          <Link key={k} href={q(k, team)} className={clsx('rounded-full border px-3 py-1 text-xs font-medium transition-colors', kind === k ? 'border-emerald-600 bg-emerald-600 text-white dark:border-emerald-500 dark:bg-emerald-500 dark:text-slate-950' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800')}>
            {label}
            {k !== 'all' && <span className="ml-1.5 tabular-nums opacity-70">{summary.byKind[k]?.count}</span>}
          </Link>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-slate-500">Team:</span>
        {[['all', 'All'] as const, ...state.teams.map((t) => [t.id, t.name] as const)].map(([id, name]) => (
          <Link key={id} href={q(kind, id)} className={clsx('rounded-md px-2 py-0.5 font-medium', team === id ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800')}>{name}</Link>
        ))}
      </div>

      <Card pad={false} title={`${rows.length} events`} subtitle={rows.length > LIMIT ? `Showing the ${LIMIT} costliest` : 'Sorted by observed cost'}>
        {rows.length === 0 ? (
          <div className="p-6"><EmptyState title="No events match" body="Pick a different kind or team." /></div>
        ) : (
          <Table min={900}>
            <thead className="border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="th">Event</th>
                <th className="th">Kind</th>
                <th className="th">Team</th>
                <th className="th">Repo</th>
                <th className="th">Tool</th>
                <th className="th">Date</th>
                <th className="th">Outcome</th>
                <th className="th text-right">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.slice(0, LIMIT).map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="td max-w-[300px]">
                    <div className="font-medium text-slate-900 dark:text-slate-100">{f.label}</div>
                    <div className="truncate text-xs text-slate-500" title={f.detail}>{f.detail}</div>
                  </td>
                  <td className="td"><Badge tone={f.kind === 'runaway_session' || f.kind === 'idle_loop' ? 'rose' : 'amber'}>{KIND_LABEL[f.kind]}</Badge></td>
                  <td className="td">{f.teamId ? teamName.get(f.teamId) ?? f.teamId : 'Org'}</td>
                  <td className="td font-mono text-xs">{f.repo ?? '-'}</td>
                  <td className="td">{f.tool ? TOOL_LABEL[f.tool] : '-'}</td>
                  <td className="td tabular-nums text-slate-600 dark:text-slate-400">{f.at ? dateShort(f.at) : '-'}</td>
                  <td className="td text-slate-600 dark:text-slate-400">{f.outcome ?? '-'}</td>
                  <td className="td text-right font-semibold tabular-nums">{usd(f.costUsd)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
}
