import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">{title}</h1>
        {subtitle && <p className="mt-1 max-w-3xl text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ title, subtitle, action, children, className, pad = true }: { title?: ReactNode; subtitle?: ReactNode; action?: ReactNode; children: ReactNode; className?: string; pad?: boolean }) {
  return (
    <section className={clsx('card', className)}>
      {(title || action) && (
        <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-3.5 dark:border-slate-800">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
            {subtitle && <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={pad ? 'p-5' : ''}>{children}</div>
    </section>
  );
}

export type Tone = 'neutral' | 'emerald' | 'amber' | 'rose' | 'sky' | 'indigo';
const TONES: Record<Tone, string> = {
  neutral: 'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30',
  rose: 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30',
  sky: 'bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30',
  indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/30',
};
export function Badge({ tone = 'neutral', children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return <span className={clsx('inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset', TONES[tone], className)}>{children}</span>;
}

export function StatusBadge({ status }: { status: 'on_track' | 'at_risk' | 'over' }) {
  const m = { on_track: ['emerald', 'On track'], at_risk: ['amber', 'At risk'], over: ['rose', 'Over budget'] } as const;
  const [tone, label] = m[status];
  return (
    <Badge tone={tone}>
      <span className={clsx('h-1.5 w-1.5 rounded-full', tone === 'emerald' ? 'bg-emerald-500' : tone === 'amber' ? 'bg-amber-500' : 'bg-rose-500')} />
      {label}
    </Badge>
  );
}

export function ConfidenceBadge({ c }: { c: 'high' | 'medium' | 'low' }) {
  return <Badge tone={c === 'high' ? 'emerald' : c === 'medium' ? 'amber' : 'neutral'}>{c} confidence</Badge>;
}

export function Kpi({ label, value, sub, tone = 'neutral', icon }: { label: string; value: ReactNode; sub?: ReactNode; tone?: 'neutral' | 'emerald' | 'amber' | 'rose'; icon?: ReactNode }) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <span className="label-xs">{label}</span>
        {icon && <span className="text-slate-400">{icon}</span>}
      </div>
      <div
        className={clsx(
          'mt-2 text-2xl font-semibold tabular-nums tracking-tight',
          tone === 'emerald' && 'text-emerald-600 dark:text-emerald-400',
          tone === 'amber' && 'text-amber-600 dark:text-amber-400',
          tone === 'rose' && 'text-rose-600 dark:text-rose-400',
          tone === 'neutral' && 'text-slate-900 dark:text-slate-50',
        )}
      >
        {value}
      </div>
      {sub && <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{sub}</div>}
    </div>
  );
}

export function EmptyState({ title, body, action }: { title: string; body?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-6 py-12 text-center dark:border-slate-700">
      <Inbox className="h-8 w-8 text-slate-300 dark:text-slate-600" />
      <h3 className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      {body && <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">{body}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Banner({ tone = 'amber', icon, children }: { tone?: 'amber' | 'sky' | 'emerald' | 'rose'; icon?: ReactNode; children: ReactNode }) {
  const t = {
    amber: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200',
    sky: 'border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200',
    emerald: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200',
    rose: 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200',
  }[tone];
  return (
    <div className={clsx('mb-5 flex items-start gap-2.5 rounded-lg border px-4 py-2.5 text-sm', t)}>
      {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
      <div>{children}</div>
    </div>
  );
}

export function ProgressBar({ value, pace, tone }: { value: number; pace?: number; tone: 'emerald' | 'amber' | 'rose' }) {
  const w = Math.max(0, Math.min(100, value * 100));
  return (
    <div className="relative h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
      <div className={clsx('h-2 rounded-full', tone === 'emerald' ? 'bg-emerald-500' : tone === 'amber' ? 'bg-amber-500' : 'bg-rose-500')} style={{ width: `${w}%` }} />
      {pace !== undefined && <div className="absolute -top-1 h-4 w-0.5 bg-slate-500/70" style={{ left: `${Math.min(100, pace * 100)}%` }} title="Straight-line pace" />}
    </div>
  );
}

export function statusTone(s: 'on_track' | 'at_risk' | 'over'): 'emerald' | 'amber' | 'rose' {
  return s === 'on_track' ? 'emerald' : s === 'at_risk' ? 'amber' : 'rose';
}

export function Table({ children, min = 640 }: { children: ReactNode; min?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse" style={{ minWidth: min }}>
        {children}
      </table>
    </div>
  );
}

export function SkeletonBlock({ className }: { className?: string }) {
  return <div className={clsx('skeleton', className)} />;
}
