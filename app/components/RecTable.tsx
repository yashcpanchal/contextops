'use client';
import { Fragment, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import type { Recommendation } from '@/lib/types';
import { Badge, ConfidenceBadge, EmptyState } from './ui';
import { ApplyRecButton, DismissRecButton } from './RecActions';
import { usdRangeFull, TOOL_LABEL } from './format';

const STATUS_TONE = { identified: 'sky', accepted: 'indigo', applied: 'emerald', dismissed: 'neutral' } as const;

export function RecTable({ recs, teams }: { recs: Recommendation[]; teams: Array<{ id: string; name: string }> }) {
  const [type, setType] = useState('all');
  const [team, setTeam] = useState('all');
  const [status, setStatus] = useState('all');
  const [open, setOpen] = useState<string | null>(null);
  const teamName = useMemo(() => new Map(teams.map((t) => [t.id, t.name])), [teams]);
  const types = useMemo(() => Array.from(new Set(recs.map((r) => r.type))).sort(), [recs]);
  const rows = recs.filter((r) => (type === 'all' || r.type === type) && (team === 'all' || r.scope.teamId === team) && (status === 'all' || r.status === status));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-5 py-3 dark:border-slate-800">
        <Select label="Type" value={type} onChange={setType} options={[['all', 'All types'], ...types.map((t) => [t, t] as [string, string])]} />
        <Select label="Team" value={team} onChange={setTeam} options={[['all', 'All teams'], ...teams.map((t) => [t.id, t.name] as [string, string])]} />
        <Select label="Status" value={status} onChange={setStatus} options={[['all', 'All statuses'], ['identified', 'Identified'], ['accepted', 'Accepted'], ['applied', 'Applied'], ['dismissed', 'Dismissed']]} />
        <span className="ml-auto text-xs text-slate-500">{rows.length} of {recs.length} recommendations</span>
      </div>
      {rows.length === 0 ? (
        <div className="p-6">
          <EmptyState title="No recommendations match these filters" body="Try clearing a filter." />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse">
            <thead className="border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="th w-8" />
                <th className="th">Recommendation</th>
                <th className="th">Scope</th>
                <th className="th text-right">Est. saving / mo</th>
                <th className="th">Confidence</th>
                <th className="th">Status</th>
                <th className="th text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map((r) => {
                const isOpen = open === r.id;
                return (
                  <Fragment key={r.id}>
                    <tr className={clsx('cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-800/40', isOpen && 'bg-slate-50/70 dark:bg-slate-800/40')} onClick={() => setOpen(isOpen ? null : r.id)}>
                      <td className="td text-slate-400">{isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}</td>
                      <td className="td">
                        <div className="flex items-center gap-2">
                          <Badge>{r.type}</Badge>
                          <span className="font-medium text-slate-900 dark:text-slate-100">{r.title}</span>
                        </div>
                      </td>
                      <td className="td text-slate-600 dark:text-slate-400">
                        {[r.scope.teamId && teamName.get(r.scope.teamId), r.scope.tool && TOOL_LABEL[r.scope.tool], r.scope.repo].filter(Boolean).join(' / ') || 'Org-wide'}
                      </td>
                      <td className="td whitespace-nowrap text-right font-medium tabular-nums text-emerald-700 dark:text-emerald-400">{usdRangeFull(r.estMonthlySavingsUsd.low, r.estMonthlySavingsUsd.high)}</td>
                      <td className="td"><ConfidenceBadge c={r.confidence} /></td>
                      <td className="td"><Badge tone={STATUS_TONE[r.status]}>{r.status}</Badge></td>
                      <td className="td text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <DismissRecButton rec={r} />
                          <ApplyRecButton rec={r} label="Apply" />
                        </div>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr className="bg-slate-50/70 dark:bg-slate-800/30">
                        <td />
                        <td colSpan={6} className="px-4 pb-4 pt-1">
                          <p className="text-sm text-slate-700 dark:text-slate-300">{r.detail}</p>
                          <div className="mt-3 grid gap-3 md:grid-cols-2">
                            <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                              <div className="label-xs mb-1">Formula</div>
                              <code className="text-xs text-slate-700 dark:text-slate-300">{r.formula}</code>
                            </div>
                            <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                              <div className="label-xs mb-1">Evidence ({r.evidenceRefs.length} references)</div>
                              <div className="flex flex-wrap gap-1">
                                {r.evidenceRefs.slice(0, 10).map((e) => (
                                  <code key={e} className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-600 dark:bg-slate-800 dark:text-slate-400">{e}</code>
                                ))}
                                {r.evidenceRefs.length > 10 && <span className="text-xs text-slate-500">+{r.evidenceRefs.length - 10} more</span>}
                                {r.evidenceRefs.length === 0 && <span className="text-xs text-slate-500">Config audit, no event references.</span>}
                              </div>
                            </div>
                          </div>
                          {r.action && <p className="mt-3 text-xs text-slate-500"><span className="font-semibold">Change on apply:</span> {r.action.summary}</p>}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: Array<[string, string]> }) {
  return (
    <select aria-label={label} className="input !w-auto !py-1 text-xs" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map(([v, l]) => (
        <option key={v} value={v}>{l}</option>
      ))}
    </select>
  );
}
