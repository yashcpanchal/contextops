import { mutate } from '@/lib/store';
import { undoAudit } from '@/lib/engine/actions';
import { ok, fail } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  try {
    return ok({ entry: mutate((s) => undoAudit(s, params.id)) });
  } catch (e) {
    return fail(e, 409);
  }
}
