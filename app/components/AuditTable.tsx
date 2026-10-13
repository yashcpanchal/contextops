'use client';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronRight, Loader2, Undo2 } from 'lucide-react';
import type { AuditLogEntry } from '@/lib/types';
import { dateTime } from '@/lib/format';
import { Badge } from './ui';
import { Modal } from './Modal';
import { useToast } from './Toast';
import { callApi } from './api';

export function AuditTable({ entries }: { entries: AuditLogEntry[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<AuditLogEntry | null>(null);
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const toast = useToast();

  async function undo() {
    if (!confirm) return;
    setBusy(true);
    const r = await callApi(`/api/audit/${encodeURIComponent(confirm.id)}/undo`);
    setBusy(false);
    if (!r.ok) return toast(r.error ?? 'Could not undo', 'error');
    toast('Change undone. State restored to the "before" snapshot.');
    setConfirm(null);
    router.refresh();
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse">
          <thead className="border-b border-slate-100 dark:border-slate-800">
            <tr>
              <th className="th w-8" />
              <th className="th">When (UTC)</th>
              <th className="th">Actor</th>
              <th className="th">Action</th>
              <th className="th">Target</th>
              <th className="th">Mode</th>
              <th className="th text-right">Undo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {entries.map((e) => {
              const isUndo = e.action.startsWith('undo:');
              const isOpen = open === e.id;
              return (
                <Fragment key={e.id}>
                  <tr className="cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-800/40" onClick={() => setOpen(isOpen ? null : e.id)}>
                    <td className="td text-slate-400">{isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}</td>
                    <td className="td tabular-nums text-slate-600 dark:text-slate-400">{dateTime(e.at)}</td>
                    <td className="td">{e.actor}</td>
                    <td className="td"><code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-800">{e.action}</code></td>
                    <td className="td text-slate-700 dark:text-slate-300">{e.target}</td>
                    <td className="td">{e.dryRun ? <Badge tone="amber">dry run</Badge> : <Badge tone="emerald">live</Badge>}</td>
                    <td className="td text-right" onClick={(ev) => ev.stopPropagation()}>
                      {e.undone ? <Badge>undone</Badge> : isUndo ? <span className="text-xs text-slate-400">n/a</span> : (
                        <button className="btn-secondary btn-sm" onClick={() => setConfirm(e)}><Undo2 className="h-3.5 w-3.5" /> Undo</button>
                      )}
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="bg-slate-50/70 dark:bg-slate-800/30">
                      <td />
                      <td colSpan={6} className="px-4 pb-4 pt-1">
                        <div className="grid gap-3 md:grid-cols-2">
                          {(['before', 'after'] as const).map((k) => (
                            <div key={k} className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                              <div className="label-xs mb-1">{k}</div>
                              <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-all font-mono text-[11px] text-slate-600 dark:text-slate-400">{JSON.stringify(e[k], null, 1).slice(0, 1800)}</pre>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal
        open={!!confirm}
        onClose={() => !busy && setConfirm(null)}
        title="Undo change"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setConfirm(null)} disabled={busy}>Cancel</button>
            <button className="btn-primary" onClick={undo} disabled={busy}>{busy && <Loader2 className="h-4 w-4 animate-spin" />} Undo change</button>
          </>
        }
      >
        <p>This restores the state captured before <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-800">{confirm?.action}</code> on <b>{confirm?.target}</b> and writes a new audit entry.</p>
      </Modal>
    </>
  );
}
