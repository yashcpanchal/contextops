'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Copy, Download, FileUp, Loader2, UploadCloud } from 'lucide-react';
import { useToast } from './Toast';
import { callApi } from './api';

export function CopyButton({ text, label = 'Copy', className = 'btn-secondary btn-sm' }: { text: string; label?: string; className?: string }) {
  const [done, setDone] = useState(false);
  const toast = useToast();
  return (
    <button
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
        }
        setDone(true);
        toast('Copied to clipboard.');
        setTimeout(() => setDone(false), 1800);
      }}
    >
      {done ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />} {done ? 'Copied' : label}
    </button>
  );
}

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800/60">
        <span className="label-xs">{label ?? 'shell'}</span>
        <CopyButton text={code} className="btn-ghost btn-sm" />
      </div>
      <pre className="overflow-x-auto bg-slate-900 p-3 font-mono text-xs leading-relaxed text-slate-100">{code}</pre>
    </div>
  );
}

export function CsvUpload({ sample }: { sample: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [name, setName] = useState<string | null>(null);
  const router = useRouter();
  const toast = useToast();

  async function send(text: string, label: string) {
    setBusy(true);
    setName(label);
    const r = await callApi('/api/ingest/csv', { raw: text, contentType: 'text/csv' });
    setBusy(false);
    if (!r.ok) {
      setResult({ error: r.error });
      return toast(r.error ?? 'Import failed', 'error');
    }
    setResult(r.data);
    const n = r.data?.eventsAdded;
    toast(n !== undefined ? `Imported ${n} new usage events from ${label}.` : `Imported ${label}.`);
    router.refresh();
  }
  async function onFile(f: File | undefined) {
    if (!f) return;
    send(await f.text(), f.name);
  }
  function download() {
    const url = URL.createObjectURL(new Blob([sample], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spend-sample.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div
        onDragOver={(e) => (e.preventDefault(), setDrag(true))}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => (e.preventDefault(), setDrag(false), onFile(e.dataTransfer.files?.[0]))}
        className={`flex flex-col items-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors ${drag ? 'border-emerald-400 bg-emerald-50/60 dark:bg-emerald-500/10' : 'border-slate-300 dark:border-slate-700'}`}
      >
        {busy ? <Loader2 className="h-7 w-7 animate-spin text-emerald-500" /> : <UploadCloud className="h-7 w-7 text-slate-400" />}
        <p className="mt-2 text-sm font-medium text-slate-800 dark:text-slate-100">{busy ? `Importing ${name}...` : 'Drop a spend CSV here'}</p>
        <p className="mt-1 text-xs text-slate-500">Columns: <code>date,tool,user_email,model,input_tokens,output_tokens,cost_usd,repo</code>. Users are mapped by email; prompts and code are never read.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <input ref={ref} type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
          <button className="btn-primary" disabled={busy} onClick={() => ref.current?.click()}><FileUp className="h-4 w-4" /> Choose file</button>
          <button className="btn-secondary" disabled={busy} onClick={() => send(sample, 'spend-sample.csv')}>Import the sample</button>
          <button className="btn-ghost" onClick={download}><Download className="h-4 w-4" /> Download sample CSV</button>
        </div>
      </div>
      {result && (
        <pre className={`mt-3 max-h-40 overflow-auto rounded-lg border p-3 font-mono text-xs ${result.error ? 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200' : 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200'}`}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
