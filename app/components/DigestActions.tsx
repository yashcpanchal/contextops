'use client';
import { useState } from 'react';
import { Check, Copy, Loader2, Send } from 'lucide-react';
import { useToast } from './Toast';
import { Modal } from './Modal';

export function DigestActions({ markdown, teamName, emName }: { markdown: string; teamName: string; emName: string }) {
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const channel = `#eng-${teamName.toLowerCase()}-ai-spend`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = markdown;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    toast('Digest copied as Markdown.');
    setTimeout(() => setCopied(false), 1800);
  }
  function send() {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setOpen(false);
      toast(`Simulated: digest posted to ${channel}. Connect a Slack webhook to send for real.`);
    }, 900);
  }
  return (
    <>
      <button className="btn-secondary" onClick={copy}>
        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />} Copy as Markdown
      </button>
      <button className="btn-primary" onClick={() => setOpen(true)}>
        <Send className="h-4 w-4" /> Send to Slack
      </button>
      <Modal
        open={open}
        onClose={() => !busy && setOpen(false)}
        title="Send digest to Slack"
        footer={
          <>
            <button className="btn-secondary" disabled={busy} onClick={() => setOpen(false)}>Cancel</button>
            <button className="btn-primary" disabled={busy} onClick={send}>{busy && <Loader2 className="h-4 w-4 animate-spin" />} Send (simulated)</button>
          </>
        }
      >
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
          <div className="label-xs mb-1">Exact change</div>
          <p>Post the weekly digest for <b>{teamName}</b> to <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">{channel}</code>, addressed to {emName}.</p>
        </div>
        <p className="mt-3 text-xs text-slate-500">Simulated in the demo: nothing leaves this machine. In live mode this uses an incoming webhook you configure.</p>
      </Modal>
    </>
  );
}
