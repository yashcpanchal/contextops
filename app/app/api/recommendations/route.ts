import { getState } from '@/lib/store';
import { getRecommendations, savingsTotals } from '@/lib/engine/recommendations';
import { ok } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  let recs = getRecommendations(getState());
  const totals = savingsTotals(recs);
  const status = q.get('status');
  const type = q.get('type');
  const teamId = q.get('teamId');
  if (status) recs = recs.filter((r) => r.status === status);
  if (type) recs = recs.filter((r) => r.type === type);
  if (teamId) recs = recs.filter((r) => r.scope.teamId === teamId);
  return ok({ recommendations: recs, totals });
}
