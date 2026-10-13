import { getState } from '@/lib/store';
import { Banner, Card, EmptyState, PageHeader } from '@/components/ui';
import { AuditTable } from '@/components/AuditTable';
import { ShieldAlert } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function AuditPage() {
  const entries = getState().audit;
  return (
    <div>
      <PageHeader title="Audit log" subtitle="Every approval-gated change: who, what, and the exact before and after. Undo restores the before snapshot." />
      <Banner tone="amber" icon={<ShieldAlert className="h-4 w-4" />}>
        Entries are demo-mode dry runs. In live mode each action also records the vendor API call that was made.
      </Banner>
      <Card pad={false} title={`${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`} subtitle="Newest first. Click a row to see before and after.">
        {entries.length === 0 ? (
          <div className="p-6"><EmptyState title="No actions yet" body="Apply a recommendation, release seats or change a budget and it will appear here with an undo." /></div>
        ) : (
          <AuditTable entries={entries} />
        )}
      </Card>
    </div>
  );
}
