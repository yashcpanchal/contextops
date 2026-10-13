import { Ban, Database, EyeOff, Lock, Scale, UserCheck, Users } from 'lucide-react';
import { K_ANON_MIN } from '@/lib/engine/privacy';
import { Card, PageHeader } from '@/components/ui';

export const dynamic = 'force-dynamic';

const COLLECT = [
  'Token counts per session (input, output, cache read, cache write)',
  'Model name and cost in USD',
  'Timestamps, duration and lines changed',
  'Repository name, and team from your org directory',
  'PR state (merged, closed, reverted), ticket and epic keys',
  'Seat assignments, tiers and last-active dates',
];
const NEVER = ['Prompts or model responses', 'Source code, diffs or file contents', 'Terminal output or tool results', 'Screenshots, keystrokes or editor telemetry'];

export default function TrustPage() {
  return (
    <div>
      <PageHeader title="Trust and privacy" subtitle="ContextOps exists to help teams spend well, not to watch individuals. These are the rules the product enforces." />
      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <Card title="What we collect" action={<Database className="h-4 w-4 text-slate-400" />}>
          <p className="mb-3 text-sm text-slate-500">Metadata only.</p>
          <ul className="space-y-2 text-sm">
            {COLLECT.map((c) => (
              <li key={c} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />{c}</li>
            ))}
          </ul>
        </Card>
        <Card title="What we never collect" action={<EyeOff className="h-4 w-4 text-slate-400" />}>
          <p className="mb-3 text-sm text-slate-500">There is no code path that reads these, and the OpenTelemetry receiver drops them if sent.</p>
          <ul className="space-y-2 text-sm">
            {NEVER.map((c) => (
              <li key={c} className="flex gap-2"><Ban className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-500" />{c}</li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="No leaderboards" action={<Scale className="h-4 w-4 text-slate-400" />}>
          <p className="text-sm text-slate-600 dark:text-slate-400">No page ranks engineers by spend, tokens or output. Waste is reported as events ("Session in pay-api"), and the APIs that feed the UI strip person identifiers. Spend is a team and workflow question, not a performance score.</p>
        </Card>
        <Card title={`k-anonymity floor: ${K_ANON_MIN}`} action={<Users className="h-4 w-4 text-slate-400" />}>
          <p className="text-sm text-slate-600 dark:text-slate-400">Any team with fewer than {K_ANON_MIN} members is rolled up into "Other" in every view, so a small team's numbers cannot be traced back to one person.</p>
        </Card>
        <Card title="Engineer self-view" action={<UserCheck className="h-4 w-4 text-slate-400" />}>
          <p className="text-sm text-slate-600 dark:text-slate-400">The only per-person data ContextOps can return is an engineer's own meter: their personal usage, shown to them alone. Managers and admins cannot pull another engineer's cost.</p>
        </Card>
      </div>

      <Card className="mt-6" title="The one exception: seat administration" action={<Lock className="h-4 w-4 text-slate-400" />}>
        <p className="text-sm text-slate-600 dark:text-slate-400">Releasing a license requires knowing whose license it is. The Seat audit page is the only place names appear. It is labelled "Admin view: audited", shows seat status rather than performance, and every release is written to the audit log and can be undone.</p>
      </Card>
    </div>
  );
}
