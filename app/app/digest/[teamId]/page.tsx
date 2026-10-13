import Link from 'next/link';
import clsx from 'clsx';
import { notFound } from 'next/navigation';
import { getState } from '@/lib/store';
import { buildDigest, digestToMarkdown, templateNarrative } from '@/lib/engine/digest';
import { usd, pct, dateShort } from '@/lib/format';
import { Badge, PageHeader, StatusBadge } from '@/components/ui';
import { DigestActions } from '@/components/DigestActions';
import { usdRangeFull } from '@/components/format';

export const dynamic = 'force-dynamic';

export default function DigestPage({ params }: { params: { teamId: string } }) {
  const state = getState();
  if (!state.teams.some((t) => t.id === params.teamId)) notFound();
  const d = buildDigest(state, params.teamId);
  const narrative = templateNarrative(d);
  const md = digestToMarkdown(d, narrative);
  const h = d.headline;

  return (
    <div>
      <PageHeader
        title="Weekly digest"
        subtitle="What an engineering manager receives each Monday. Team-level, no individual rankings."
        actions={<DigestActions markdown={md} teamName={d.teamName} emName={d.emName} />}
      />
      <div className="mb-5 flex flex-wrap gap-1.5">
        {state.teams.map((t) => (
          <Link key={t.id} href={`/digest/${t.id}`} className={clsx('rounded-full border px-3 py-1 text-xs font-medium', t.id === params.teamId ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300')}>
            {t.name}
          </Link>
        ))}
      </div>

      {/* Email chrome */}
      <div className="mx-auto max-w-[680px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-3 text-xs dark:border-slate-800 dark:bg-slate-800/50">
          <div className="grid grid-cols-[56px_1fr] gap-y-1">
            <span className="text-slate-400">From</span><span className="text-slate-700 dark:text-slate-300">ContextOps &lt;digest@contextops.app&gt;</span>
            <span className="text-slate-400">To</span><span className="text-slate-700 dark:text-slate-300">{d.emName}</span>
            <span className="text-slate-400">Subject</span><span className="font-semibold text-slate-900 dark:text-slate-100">{d.teamName}: AI spend {usd(h.spend7dUsd)} this week, {h.status === 'over' ? 'projected over budget' : h.status === 'at_risk' ? 'budget at risk' : 'on track'}</span>
          </div>
        </div>
        <div className="space-y-7 px-6 py-7 sm:px-9">
          <div>
            <div className="label-xs">Week ending {dateShort(d.weekEnding)}</div>
            <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-50">Weekly AI spend digest: {d.teamName}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">{narrative}</p>
          </div>

          <Section n={1} title="Headline">
            <div className="grid grid-cols-3 gap-3">
              <Tile label="Last 7 days" value={usd(h.spend7dUsd)} sub={h.deltaPct === null ? 'no prior week' : `${h.deltaPct >= 0 ? '+' : ''}${pct(h.deltaPct)} vs prior (${usd(h.prior7dUsd)})`} />
              <Tile label="Month to date" value={usd(h.mtdUsd)} sub={`of ${usd(h.budgetUsd)} budget`} />
              <Tile label="Projected" value={usd(h.projectedMonthEndUsd)} sub={pct(h.projectedPct) + ' of budget'} tone={h.status === 'over' ? 'rose' : h.status === 'at_risk' ? 'amber' : 'emerald'} />
            </div>
            <div className="mt-2"><StatusBadge status={h.status} /></div>
          </Section>

          <Section n={2} title="Cost per merged PR">
            <p className="text-sm"><b className="text-lg tabular-nums">{d.outcomes.costPerMergedPrUsd === null ? 'n/a' : usd(d.outcomes.costPerMergedPrUsd)}</b> across {d.outcomes.mergedPrs} merged PRs (30 days).</p>
            <div className="mt-2 flex items-end gap-2">
              {d.outcomes.trend.map((t) => {
                const max = Math.max(1, ...d.outcomes.trend.map((x) => x.costPerMergedPrUsd ?? 0));
                return (
                  <div key={t.weekStart} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-[11px] tabular-nums text-slate-500">{t.costPerMergedPrUsd === null ? 'n/a' : usd(t.costPerMergedPrUsd)}</span>
                    <div className="w-full rounded-t bg-emerald-400/80 dark:bg-emerald-500/60" style={{ height: `${Math.max(4, ((t.costPerMergedPrUsd ?? 0) / max) * 56)}px` }} />
                    <span className="text-[10px] text-slate-400">{dateShort(t.weekStart)}</span>
                  </div>
                );
              })}
            </div>
          </Section>

          <Section n={3} title="Wasted spend">
            <p className="text-sm">Closed unmerged: <b className="tabular-nums">{usd(d.waste.abandonedSpendUsd)}</b>. Reverted: <b className="tabular-nums">{usd(d.waste.revertedSpendUsd)}</b>.</p>
            {d.waste.topRunaway.length > 0 && (
              <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                {d.waste.topRunaway.map((r, i) => (
                  <li key={i} className="flex justify-between gap-3"><span>{r.label} <span className="text-slate-400">({r.outcome}, {dateShort(r.date)})</span></span><b className="tabular-nums text-amber-700 dark:text-amber-400">{usd(r.costUsd)}</b></li>
                ))}
              </ul>
            )}
          </Section>

          <Section n={4} title="Model mix">
            <p className="text-sm">{pct(d.modelMix.topTierSpendShare)} of Claude Code spend is on the top-tier model; {pct(d.modelMix.smallSessionShare)} of sessions were small (under 40 lines).</p>
            <p className="mt-1 text-sm text-slate-500">{d.modelMix.recommendation}</p>
          </Section>

          <Section n={5} title="Seats">
            <p className="text-sm">{d.seats.inactiveCount} seats inactive for 30+ days ({usd(d.seats.inactiveUsd)}/mo) and {d.seats.duplicateHolders} duplicate-tool holders. Names are in the audited <Link href="/seats" className="underline">admin seat view</Link>.</p>
          </Section>

          <Section n={6} title="Context and caching hygiene">
            <p className="text-sm">Cache hit rate <b className="tabular-nums">{d.cacheHygiene.teamHitRate === null ? 'n/a' : pct(d.cacheHygiene.teamHitRate)}</b> vs org median <b className="tabular-nums">{d.cacheHygiene.orgMedianHitRate === null ? 'n/a' : pct(d.cacheHygiene.orgMedianHitRate)}</b>.</p>
            {d.cacheHygiene.flaggedRepos.length > 0 && <p className="mt-1 text-sm text-slate-500">CLAUDE.md over 200 lines: {d.cacheHygiene.flaggedRepos.map((r) => `${r.repo} (${r.claudeMdLines})`).join(', ')}</p>}
          </Section>

          <Section n={7} title="Budget requests awaiting approval">
            {d.openBudgetRequests.length === 0 ? <p className="text-sm text-slate-500">None.</p> : (
              <ul className="space-y-1 text-sm">{d.openBudgetRequests.map((r) => <li key={r.id}><b className="tabular-nums">{usd(r.amountUsd)}</b>: {r.requesterNote}</li>)}</ul>
            )}
          </Section>

          <Section n={8} title="Recommended action">
            {d.recommendedAction ? (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/30 dark:bg-emerald-500/10">
                <div className="flex items-center gap-2"><Badge tone="emerald">{d.recommendedAction.type}</Badge><span className="font-medium text-emerald-900 dark:text-emerald-200">{d.recommendedAction.title}</span></div>
                <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-300">Estimated {usdRangeFull(d.recommendedAction.estMonthlySavingsUsd.low, d.recommendedAction.estMonthlySavingsUsd.high)} per month.</p>
                <Link href="/savings" className="btn-primary btn-sm mt-3">Review in ContextOps</Link>
              </div>
            ) : <p className="text-sm text-slate-500">None right now.</p>}
          </Section>

          <p className="border-t border-slate-100 pt-4 text-xs text-slate-400 dark:border-slate-800">{d.footer}</p>
        </div>
      </div>
    </div>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[11px] text-slate-500 dark:bg-slate-800">{n}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}
function Tile({ label, value, sub, tone }: { label: string; value: string; sub: string; tone?: 'emerald' | 'amber' | 'rose' }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
      <div className="label-xs">{label}</div>
      <div className={clsx('mt-0.5 text-lg font-semibold tabular-nums', tone === 'rose' && 'text-rose-600', tone === 'amber' && 'text-amber-600', tone === 'emerald' && 'text-emerald-600')}>{value}</div>
      <div className="text-[11px] text-slate-500">{sub}</div>
    </div>
  );
}
