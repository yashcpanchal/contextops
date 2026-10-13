'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, RotateCcw } from 'lucide-react';
import { useToast } from './Toast';
import { Modal } from './Modal';
import { callApi } from './api';

export function ResetDemo() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const toast = useToast();
  async function reset() {
    setBusy(true);
    const r = await callApi('/api/demo/reset');
    setBusy(false);
    if (!r.ok) return toast(r.error ?? 'Reset failed', 'error');
    setOpen(false);
    toast('Demo data reset to the seeded Northwind Labs dataset.');
    router.refresh();
  }
  return (
    <>
      <button className="btn-secondary" onClick={() => setOpen(true)}><RotateCcw className="h-4 w-4" /> Reset demo data</button>
      <Modal
        open={open}
        onClose={() => !busy && setOpen(false)}
        title="Reset demo data"
        footer={
          <>
            <button className="btn-secondary" disabled={busy} onClick={() => setOpen(false)}>Cancel</button>
            <button className="btn-danger" disabled={busy} onClick={reset}>{busy && <Loader2 className="h-4 w-4 animate-spin" />} Reset everything</button>
          </>
        }
      >
        <p>This regenerates the seeded dataset and clears applied recommendations, the audit log, budget changes, and any CSV or OpenTelemetry rows you ingested.</p>
      </Modal>
    </>
  );
}
