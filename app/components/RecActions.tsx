'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2, ShieldAlert, Zap } from 'lucide-react';
import type { Recommendation } from '@/lib/types';
import { Modal } from './Modal';
import { useToast } from './Toast';
import { callApi } from './api';
import { usdRangeFull } from './format';

export function ApplyRecButton({ rec, size = 'sm', label = 'Review and apply' }: { rec: Recommendation; size?: 'sm' | 'md'; label?: string }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const toast = useToast();
  if (rec.status === 'applied') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        <Check className="h-3.5 w-3.5" /> Applied
      </span>
    );
  }
  if (rec.status === 'dismissed') return <span className="text-xs text-slate-400">Dismissed</span>;
  if (!rec.action) return <span className="text-xs text-slate-400">Advisory only</span>;

  async function apply() {
    setBusy(true);
    const r = await callApi(`/api/recommendations/${encodeURIComponent(rec.id)}/apply`);
    setBusy(false);
    if (!r.ok) {
      toast(r.error ?? 'Could not apply', 'error');
      return;
    }
    setOpen(false);
    toast(`Applied (demo, dry-run): ${rec.title}. Logged to the audit trail.`);
    router.refresh();
  }

  return (
    <>
      <button className={`btn-primary ${size === 'sm' ? 'btn-sm' : ''}`} onClick={() => setOpen(true)}>
        <Zap className="h-3.5 w-3.5" /> {label}
      </button>
      <Modal
        open={open}
        onClose={() => !busy && setOpen(false)}
        title="Confirm action"
        footer={
          <>
            <button className="btn-secondary" disabled={busy} onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button className="btn-primary" disabled={busy} onClick={apply}>
              {busy && <Loader2 className="h-4 w-4 animate-spin" />} Apply change
            </button>
          </>
        }
      >
        <p className="font-medium text-slate-900 dark:text-slate-50">{rec.title}</p>
        <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
          <div className="label-xs mb-1">Exact change</div>
          <p className="text-slate-800 dark:text-slate-100">{rec.action.summary}</p>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 dark:bg-emerald-500/10">
          <span className="text-emerald-800 dark:text-emerald-300">Estimated saving</span>
          <span className="font-semibold tabular-nums text-emerald-700 dark:text-emerald-300">{usdRangeFull(rec.estMonthlySavingsUsd.low, rec.estMonthlySavingsUsd.high)} / month</span>
        </div>
        <p className="mt-3 font-mono text-xs text-slate-500">{rec.formula}</p>
        <div className="mt-4 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Demo mode: this updates ContextOps state only and is recorded as a dry run. Live mode calls vendor admin APIs and needs a connected key. You can undo from the audit log.</span>
        </div>
      </Modal>
    </>
  );
}

export function DismissRecButton({ rec }: { rec: Recommendation }) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const toast = useToast();
  if (rec.status !== 'identified' && rec.status !== 'accepted') return null;
  return (
    <button
      className="btn-ghost btn-sm"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        const r = await callApi(`/api/recommendations/${encodeURIComponent(rec.id)}/dismiss`);
        setBusy(false);
        if (!r.ok) return toast(r.error ?? 'Could not dismiss', 'error');
        toast('Recommendation dismissed.');
        router.refresh();
      }}
    >
      Dismiss
    </button>
  );
}
