import { mutate } from '@/lib/store';
import { decideBudgetRequest, teamBudget } from '@/lib/engine/budgets';
import { ok, fail, readJson } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const body = await readJson<{ decision?: string }>(req);
  if (body.decision !== 'approved' && body.decision !== 'denied') {
    return fail('decision must be "approved" or "denied"');
  }
  const decision = body.decision;
  try {
    return ok(
      mutate((s) => {
        const request = decideBudgetRequest(s, params.id, decision);
        return { request, budget: teamBudget(s, request.teamId) };
      }),
    );
  } catch (e) {
    return fail(e, 409);
  }
}
