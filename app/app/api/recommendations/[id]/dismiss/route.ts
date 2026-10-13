import { mutate } from '@/lib/store';
import { dismissRecommendation } from '@/lib/engine/recommendations';
import { ok, fail } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  try {
    return ok({ recommendation: mutate((s) => dismissRecommendation(s, decodeURIComponent(params.id))) });
  } catch (e) {
    return fail(e, 409);
  }
}
