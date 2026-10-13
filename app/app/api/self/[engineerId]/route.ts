import { getState } from '@/lib/store';
import { selfView } from '@/lib/engine/privacy';
import { ok, fail, intParam } from '@/lib/api';

export const dynamic = 'force-dynamic';

// The only per-engineer cost view: an engineer sees their own meter.
export async function GET(req: Request, { params }: { params: { engineerId: string } }) {
  try {
    return ok(selfView(getState(), params.engineerId, intParam(req.url, 'days', 30)));
  } catch (e) {
    return fail(e, 404);
  }
}
