import { getState } from '@/lib/store';
import { detectWaste, summarizeWaste, SEAT_KINDS } from '@/lib/engine/waste';
import { publicFinding } from '@/lib/views';
import { ok, intParam } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const days = intParam(req.url, 'days', 30);
  const limit = intParam(req.url, 'limit', 300);
  let all = detectWaste(getState(), days);
  const summary = summarizeWaste(all);
  const kind = q.get('kind');
  const teamId = q.get('teamId');
  if (kind) all = all.filter((f) => f.kind === kind);
  if (teamId) all = all.filter((f) => f.teamId === teamId);
  if (!kind) all = all.filter((f) => !SEAT_KINDS.includes(f.kind));
  all.sort((a, b) => b.costUsd - a.costUsd);
  return ok({ total: all.length, findings: all.slice(0, limit).map(publicFinding), summary });
}
