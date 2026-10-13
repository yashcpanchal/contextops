'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ShieldAlert } from 'lucide-react';
import type { SeatRow } from '@/lib/views';
import { usd } from '@/lib/format';
import { dateShort } from '@/lib/format';
import { Badge, EmptyState } from './ui';
import { Modal } from './Modal';
import { useToast } from './Toast';
import { callApi } from './api';
import { TOOL_LABEL } from './format';

const FLAG_TONE = { inactive: 'rose', duplicate: 'amber', downgradable: 'sky' } as const;
const PAGE = 60;

export function SeatsTable({ seats }: { seats: SeatRow[] }) {
  const [tool, setTool] = useState('all');
  const [flag, setFlag] = useState('flagged');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [limit, setLimit] = useState(PAGE);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const active = useMemo(() => seats.filter((s) => s.status === 'active'), [seats]);
  const rows = active.filter((s) => (tool === 'all' || s.tool === tool) && (flag === 'all' ? true : flag === 'flagged' ? s.flags.length > 0 : s.flags.includes(flag as any)));
  const visible = rows.slice(0, limit);
  const chosen = active.filter((s) => selected.has(s.id));
  const saving = chosen.reduce((a, s) => a + s.monthlyPriceUsd, 0);
  const releasedCount = seats.length - active.length;

  function toggle(id: string) {
    setSelected((p) => {
      const n = new Set(p);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }
  const allVisibleSelected = visible.length > 0 && visible.every((s) => selected.has(s.id));

  async function release() {
    setBusy(true);
    const ids = chosen.map((s) => s.id);
    const r = await callApi('/api/seats/release', { body: { seatIds: ids } });
    setBusy(false);
    if (!r.ok) return toast(r.error ?? 'Could not release seats', 'error');
    setOpen(false);
    setSelected(new Set());
    toast(`Released ${ids.length} seats (demo dry-run), saving ${usd(saving)}/mo. Logged to audit.`);
    router.refresh();
  }

  const byTool = chosen.reduce<Record<string, number>>((a, s) => ((a[s.tool] = (a[s.tool] ?? 0) + 1), a), {});

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-5 py-3 dark:border-slate-800">
        <select aria-label="Tool" className="input !w-auto !py-1 text-xs" value={tool} onChange={(e) => (setTool(e.target.value), setLimit(PAGE))}>
          <option value="all">All tools</option>
          {Object.entries(TOOL_LABEL).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <select aria-label="Flag" className="input !w-auto !py-1 text-xs" value={flag} onChange={(e) => (setFlag(e.target.value), setLimit(PAGE))}>
          <option value="flagged">Flagged only</option>
          <option value="inactive">Inactive 30d+</option>
          <option value="duplicate">Duplicate tools</option>
          <option value="downgradable">Downgradable tier</option>
          <option value="all">All active seats</option>
        </select>
        <span className="text-xs text-slate-500">{rows.length} seats{releasedCount ? ` (${releasedCount} already released)` : ''}</span>
        <div className="ml-auto flex items-center gap-3">
          {chosen.length > 0 && <span className="text-xs tabular-nums text-slate-600 dark:text-slate-300">{chosen.length} selected, {usd(saving)}/mo</span>}
          <button className="btn-primary btn-sm" disabled={chosen.length === 0} onClick={() => setOpen(true)}>
            Release selected
          </button>
        </div>
      </div>
      {rows.length === 0 ? (
        <div className="p-6"><EmptyState title="No seats match" body="Nothing flagged with these filters." /></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead className="border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="th w-10">
                  <input type="checkbox" aria-label="Select all visible" checked={allVisibleSelected} onChange={() => setSelected((p) => { const n = new Set(p); visible.forEach((s) => (allVisibleSelected ? n.delete(s.id) : n.add(s.id))); return n; })} />
                </th>
                <th className="th">Engineer</th>
                <th className="th">Team</th>
                <th className="th">Tool / tier</th>
                <th className="th text-right">Seat $/mo</th>
                <th className="th text-right">Active days (30d)</th>
                <th className="th">Last active</th>
                <th className="th">Flags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {visible.map((s) => (
                <tr key={s.id} className={selected.has(s.id) ? 'bg-emerald-50/50 dark:bg-emerald-500/5' : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40'}>
                  <td className="td"><input type="checkbox" aria-label={`Select seat ${s.id}`} checked={selected.has(s.id)} onChange={() => toggle(s.id)} /></td>
                  <td className="td">
                    <div className="font-medium text-slate-900 dark:text-slate-100">{s.engineerName}</div>
                    <div className="text-xs text-slate-500">{s.email}</div>
                  </td>
                  <td className="td text-slate-600 dark:text-slate-400">{s.teamName}</td>
                  <td className="td">{TOOL_LABEL[s.tool]} <span className="text-slate-400">/ {s.tier}</span></td>
                  <td className="td text-right tabular-nums">{usd(s.monthlyPriceUsd)}</td>
                  <td className="td text-right tabular-nums">{s.usage30d.activeDays}</td>
                  <td className="td tabular-nums text-slate-600 dark:text-slate-400">{dateShort(s.lastActiveAt)}</td>
                  <td className="td">
                    <div className="flex flex-wrap gap-1">
                      {s.flags.length === 0 && <span className="text-xs text-slate-400">None</span>}
                      {s.flags.map((f) => (
                        <Badge key={f} tone={FLAG_TONE[f]}>{f}</Badge>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length > visible.length && (
            <div className="border-t border-slate-100 p-3 text-center dark:border-slate-800">
              <button className="btn-secondary btn-sm" onClick={() => setLimit(limit + PAGE)}>Show more ({rows.length - visible.length} remaining)</button>
            </div>
          )}
        </div>
      )}
      <Modal
        open={open}
        onClose={() => !busy && setOpen(false)}
        title="Release selected seats"
        footer={
          <>
            <button className="btn-secondary" disabled={busy} onClick={() => setOpen(false)}>Cancel</button>
            <button className="btn-primary" disabled={busy} onClick={release}>
              {busy && <Loader2 className="h-4 w-4 animate-spin" />} Release {chosen.length} seats
            </button>
          </>
        }
      >
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
          <div className="label-xs mb-1">Exact change</div>
          <p className="text-slate-800 dark:text-slate-100">
            Release {chosen.length} seats: {Object.entries(byTool).map(([t, n]) => `${n} ${TOOL_LABEL[t]}`).join(', ')}. The holders keep their accounts; only the paid seat is removed.
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 dark:bg-emerald-500/10">
          <span className="text-emerald-800 dark:text-emerald-300">Estimated saving</span>
          <span className="font-semibold tabular-nums text-emerald-700 dark:text-emerald-300">{usd(saving)} / month</span>
        </div>
        <div className="mt-4 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Demo mode dry run: recorded in the audit log and undoable. Live mode would call the vendor seat-removal endpoints (for example Copilot DELETE selected_users).</span>
        </div>
      </Modal>
    </div>
  );
}
