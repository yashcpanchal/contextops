import { ArrowRight } from 'lucide-react';
import { getState } from '@/lib/store';
import { getRecommendations, savingsTotals } from '@/lib/engine/recommendations';
import { Banner, Card, Kpi, PageHeader } from '@/components/ui';
import { RecTable } from '@/components/RecTable';
import { usdRangeFull } from '@/components/format';
import { ShieldAlert } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function SavingsPage() {
  const state = getState();
  const recs = getRecommendations(state);
  const t = savingsTotals(recs);
  const teams = state.teams.map((x) => ({ id: x.id, name: x.name }));
  const stages = [
    { key: 'Identified', v: t.identified, tone: 'bg-sky-500', note: 'Open and not dismissed' },
    { key: 'Accepted', v: t.accepted, tone: 'bg-indigo-500', note: 'Accepted or applied' },
    { key: 'Realized', v: t.realized, tone: 'bg-emerald-500', note: 'Applied (demo estimate)' },
  ];
  const max = Math.max(1, t.identified.high);

  return (
    <div>
      <PageHeader title="Savings" subtitle="Every recommendation shows its formula and evidence. Nothing changes until you approve it, and every change can be undone." />
      <Banner tone="amber" icon={<ShieldAlert className="h-4 w-4" />}>
        Demo mode: applied actions change ContextOps state and are logged as dry runs. Live mode calls vendor admin APIs, which requires a connected key.
      </Banner>
      <Card title="Savings funnel" subtitle="Estimated monthly savings, low to high range" className="mb-6">
        <div className="grid gap-4 md:grid-cols-3">
          {stages.map((s, i) => (
            <div key={s.key} className="relative">
              <div className="flex items-center justify-between">
                <span className="label-xs">{s.key}</span>
                {i < 2 && <ArrowRight className="hidden h-4 w-4 text-slate-300 md:block" />}
              </div>
              <div className={`mt-1 text-2xl font-semibold tabular-nums ${s.key === 'Realized' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-50'}`}>{usdRangeFull(s.v.low, s.v.high)}</div>
              <div className="mt-1 text-xs text-slate-500">{s.v.count} recommendations. {s.note}</div>
              <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                <div className={`h-2 rounded-full ${s.tone}`} style={{ width: `${Math.max(2, (s.v.high / max) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Recommendation catalogue" subtitle="Click a row for the formula and evidence" pad={false}>
        <RecTable recs={recs} teams={teams} />
      </Card>
    </div>
  );
}
