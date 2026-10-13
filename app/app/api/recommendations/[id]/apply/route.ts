import { mutate } from '@/lib/store';
import { applyRecommendation } from '@/lib/engine/actions';
import { getRecommendations, savingsTotals } from '@/lib/engine/recommendations';
import { ok, fail } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  try {
    return ok(
      mutate((s) => {
        const audit = applyRecommendation(s, id);
        const recs = getRecommendations(s);
        return { recommendation: recs.find((r) => r.id === id), audit, totals: savingsTotals(recs), dryRun: true };
      }),
    );
  } catch (e) {
    return fail(e, 409);
  }
}
