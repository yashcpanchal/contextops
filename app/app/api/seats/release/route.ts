import { mutate } from '@/lib/store';
import { releaseSeats } from '@/lib/engine/actions';
import { ok, fail, readJson } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await readJson<{ seatIds?: string[] }>(req);
  const ids = body.seatIds;
  if (!Array.isArray(ids) || !ids.length) return fail('seatIds required');
  try {
    return ok({ audit: mutate((s) => releaseSeats(s, ids)), dryRun: true });
  } catch (e) {
    return fail(e);
  }
}
