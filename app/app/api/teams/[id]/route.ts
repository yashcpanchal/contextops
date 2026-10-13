import { getState } from '@/lib/store';
import { teamDetail } from '@/lib/views';
import { ok, fail, intParam } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const d = teamDetail(getState(), params.id, intParam(req.url, 'days', 30));
  return d ? ok(d) : fail('Team not found', 404);
}
