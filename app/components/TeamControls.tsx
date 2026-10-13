'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2, X } from 'lucide-react';
import type { BudgetRequest } from '@/lib/types';
import { usd, dateShort } from '@/lib/format';
import { Badge } from './ui';
import { Modal } from './Modal';
import { useToast } from './Toast';
import { callApi } from './api';

export function BudgetRequests({ requests, budgetUsd }: { requests: BudgetRequest[]; budgetUsd: number }) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<{ r: BudgetRequest; decision: 'approved' | 'denied' } | null>(null);

  async function decide() {
    if (!confirm) return;
    setBusy(confirm.r.id);
    const r = await callApi(`/api/budget-requests/${encodeURIComponent(confirm.r.id)}/decide`, { body: { decision: confirm.decision } });
    setBusy(null);
    if (!r.ok) return toast(r.error ?? 'Could not record decision', 'error');
    toast(confirm.decision === 'approved' ? `Approved: budget raised by ${usd(confirm.r.amountUsd)}.` : 'Request denied.');
    setConfirm(null);
    router.refresh();
  }

  if (requests.length === 0) return <p className="text-sm text-slate-500">No budget requests for this team.</p>;
  return (
    <>
      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {requests.map((r) => (
          <li key={r.id} className="flex flex-wrap items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold tabular-nums text-slate-900 dark:text-slate-100">+{usd(r.amountUsd)}</span>
                <Badge tone={r.status === 'pending' ? 'amber' : r.status === 'approved' ? 'emerald' : 'neutral'}>{r.status}</Badge>
                <span className="text-xs text-slate-500">{dateShort(r.createdAt)}</span>
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{r.requesterNote}</p>
            </div>
            {r.status === 'pending' && (
              <div className="flex gap-2">
                <button className="btn-secondary btn-sm" onClick={() => setConfirm({ r, decision: 'denied' })}><X className="h-3.5 w-3.5" /> Deny</button>
                <button className="btn-primary btn-sm" onClick={() => setConfirm({ r, decision: 'approved' })}><Check className="h-3.5 w-3.5" /> Approve</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <Modal
        open={!!confirm}
        onClose={() => !busy && setConfirm(null)}
        title={confirm?.decision === 'approved' ? 'Approve budget request' : 'Deny budget request'}
        footer={
          <>
            <button className="btn-secondary" onClick={() => setConfirm(null)} disabled={!!busy}>Cancel</button>
            <button className={confirm?.decision === 'approved' ? 'btn-primary' : 'btn-danger'} onClick={decide} disabled={!!busy}>
              {busy && <Loader2 className="h-4 w-4 animate-spin" />} {confirm?.decision === 'approved' ? 'Approve' : 'Deny'}
            </button>
          </>
        }
      >
        {confirm && (
          <>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
              <div className="label-xs mb-1">Exact change</div>
              {confirm.decision === 'approved' ? (
                <p>Monthly budget goes from <b className="tabular-nums">{usd(budgetUsd)}</b> to <b className="tabular-nums">{usd(budgetUsd + confirm.r.amountUsd)}</b>.</p>
              ) : (
                <p>Request for <b className="tabular-nums">{usd(confirm.r.amountUsd)}</b> is closed. Budget stays at <b className="tabular-nums">{usd(budgetUsd)}</b>.</p>
              )}
            </div>
            <p className="mt-3 text-slate-600 dark:text-slate-400">"{confirm.r.requesterNote}"</p>
          </>
        )}
      </Modal>
    </>
  );
}

export function BudgetEditor({ teamId, budgetUsd, teamName, compact }: { teamId: string; budgetUsd: number; teamName?: string; compact?: boolean }) {
  const router = useRouter();
  const toast = useToast();
  const [val, setVal] = useState(String(budgetUsd));
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const next = Number(val);
  const valid = Number.isFinite(next) && next >= 0 && next !== budgetUsd;

  async function save() {
    setBusy(true);
    const r = await callApi(`/api/teams/${encodeURIComponent(teamId)}/budget`, { method: 'PUT', body: { monthlyBudgetUsd: next } });
    setBusy(false);
    if (!r.ok) return toast(r.error ?? 'Could not update budget', 'error');
    toast(`${teamName ?? 'Team'} budget set to ${usd(next)}/mo. Logged to audit.`);
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="relative">
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
          <input className="input !w-28 !pl-6 tabular-nums" inputMode="numeric" aria-label={`${teamName ?? 'Team'} monthly budget`} value={val} onChange={(e) => setVal(e.target.value.replace(/[^0-9.]/g, ''))} />
        </div>
        <button className="btn-secondary btn-sm" disabled={!valid} onClick={() => setOpen(true)}>{compact ? 'Save' : 'Update budget'}</button>
      </div>
      <Modal
        open={open}
        onClose={() => !busy && setOpen(false)}
        title="Confirm budget change"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setOpen(false)} disabled={busy}>Cancel</button>
            <button className="btn-primary" onClick={save} disabled={busy}>{busy && <Loader2 className="h-4 w-4 animate-spin" />} Save budget</button>
          </>
        }
      >
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
          <div className="label-xs mb-1">Exact change</div>
          <p>{teamName ?? teamId} monthly budget: <b className="tabular-nums">{usd(budgetUsd)}</b> to <b className="tabular-nums">{usd(next)}</b> ({next >= budgetUsd ? '+' : '-'}{usd(Math.abs(next - budgetUsd))}).</p>
        </div>
        <p className="mt-3 text-xs text-slate-500">Budget changes are recorded in the audit log and can be undone.</p>
      </Modal>
    </>
  );
}
