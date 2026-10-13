import { getState } from '@/lib/store';
import { usd } from '@/lib/format';
import { Badge, Card, PageHeader } from '@/components/ui';
import { BudgetEditor } from '@/components/TeamControls';
import { ResetDemo } from '@/components/SettingsPanel';

export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  const s = getState();
  const total = s.teams.reduce((a, t) => a + t.monthlyBudgetUsd, 0);
  return (
    <div>
      <PageHeader title="Settings" subtitle="Demo mode, data reset and monthly budgets per team." />
      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <Card title="Demo mode" subtitle="Controls whether actions call vendor admin APIs">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{s.settings.demoMode ? 'Demo mode is on' : 'Demo mode is off'}</div>
              <p className="mt-1 max-w-sm text-xs text-slate-500">
                In demo mode actions mutate ContextOps state only and are logged as dry runs. Live mode needs vendor admin keys in <code>.env.local</code> (see Connectors).
              </p>
            </div>
            <Badge tone={s.settings.demoMode ? 'amber' : 'emerald'}>{s.settings.demoMode ? 'Demo' : 'Live'}</Badge>
          </div>
        </Card>
        <Card title="Reset demo data" subtitle="Start over from the seeded Northwind Labs dataset">
          <p className="mb-3 text-sm text-slate-500">Clears applied actions, the audit log, budget edits and any ingested CSV or OpenTelemetry rows.</p>
          <ResetDemo />
        </Card>
      </div>
      <Card title="Monthly budgets" subtitle={`${usd(total)} total across ${s.teams.length} teams. Changes are confirmed and audited.`} pad={false}>
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {s.teams.map((t) => (
            <li key={t.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
              <div>
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{t.name}</div>
                <div className="text-xs text-slate-500">{t.memberIds.length} engineers</div>
              </div>
              <BudgetEditor teamId={t.id} teamName={t.name} budgetUsd={t.monthlyBudgetUsd} compact />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
