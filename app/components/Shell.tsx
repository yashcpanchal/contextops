'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  LayoutDashboard,
  Users,
  PiggyBank,
  Flame,
  Armchair,
  LineChart,
  Mail,
  Plug,
  ScrollText,
  ShieldCheck,
  Settings,
  Moon,
  Sun,
  Layers,
} from 'lucide-react';

const NAV: Array<{ href: string; label: string; icon: any; group: string }> = [
  { href: '/', label: 'Overview', icon: LayoutDashboard, group: 'Monitor' },
  { href: '/teams', label: 'Teams', icon: Users, group: 'Monitor' },
  { href: '/forecast', label: 'Forecast', icon: LineChart, group: 'Monitor' },
  { href: '/savings', label: 'Savings', icon: PiggyBank, group: 'Act' },
  { href: '/waste', label: 'Waste explorer', icon: Flame, group: 'Act' },
  { href: '/seats', label: 'Seat audit', icon: Armchair, group: 'Act' },
  { href: '/digest/payments', label: 'Weekly digest', icon: Mail, group: 'Act' },
  { href: '/connectors', label: 'Connectors', icon: Plug, group: 'Govern' },
  { href: '/audit', label: 'Audit log', icon: ScrollText, group: 'Govern' },
  { href: '/trust', label: 'Trust & privacy', icon: ShieldCheck, group: 'Govern' },
  { href: '/settings', label: 'Settings', icon: Settings, group: 'Govern' },
];

function isActive(path: string, href: string) {
  if (href === '/') return path === '/';
  const base = href.startsWith('/digest') ? '/digest' : href;
  return path === base || path.startsWith(base + '/');
}

export function Sidebar() {
  const path = usePathname();
  const sp = useSearchParams();
  const range = sp.get('range') === '90' ? '?range=90' : '';
  const groups = ['Monitor', 'Act', 'Govern'];
  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-800 dark:bg-slate-900 md:flex">
      <Link href="/" className="mb-6 flex items-center gap-2.5 px-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
          <Layers className="h-4.5 w-4.5" />
        </span>
        <span className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-slate-50">ContextOps</span>
      </Link>
      <nav className="flex-1 space-y-5 overflow-y-auto">
        {groups.map((g) => (
          <div key={g}>
            <div className="label-xs mb-1.5 px-2">{g}</div>
            <ul className="space-y-0.5">
              {NAV.filter((n) => n.group === g).map((n) => {
                const active = isActive(path, n.href);
                const Icon = n.icon;
                return (
                  <li key={n.href}>
                    <Link
                      href={`${n.href}${range}`}
                      className={clsx(
                        'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors',
                        active
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {n.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="mt-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
        Team-level views only. No per-engineer rankings.
      </div>
    </aside>
  );
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains('dark')), []);
  return (
    <button
      className="btn-secondary btn-sm h-8 w-8 !p-0"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      onClick={() => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle('dark', next);
        try {
          localStorage.setItem('contextops-theme', next ? 'dark' : 'light');
        } catch {}
      }}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function Header({ orgName, asOf, engineers }: { orgName: string; asOf: string; engineers: number }) {
  const path = usePathname();
  const sp = useSearchParams();
  const router = useRouter();
  const range = sp.get('range') === '90' ? 90 : 30;
  function setRange(r: number) {
    const p = new URLSearchParams(sp.toString());
    if (r === 30) p.delete('range');
    else p.set('range', String(r));
    const qs = p.toString();
    router.push(qs ? `${path}?${qs}` : path);
  }
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/85 px-6 backdrop-blur dark:border-slate-800 dark:bg-slate-900/85">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">{orgName}</span>
        <span className="hidden text-xs text-slate-500 sm:inline">{engineers} engineers</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Demo data
        </span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <span className="hidden text-xs text-slate-500 lg:inline">Data as of {asOf}</span>
        <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 dark:border-slate-700 dark:bg-slate-800" role="group" aria-label="Date range">
          {[30, 90].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              aria-pressed={range === r}
              className={clsx(
                'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                range === r ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-50' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200',
              )}
            >
              Last {r} days
            </button>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
