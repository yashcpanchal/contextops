import { mutate } from '@/lib/store';
import { setTeamBudget, teamBudget } from '@/lib/engine/budgets';
import { ok, fail, readJson } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await readJson<{ monthlyBudgetUsd?: number }>(req);
  try {
    return ok(
      mutate((s) => {
        setTeamBudget(s, params.id, Number(body.monthlyBudgetUsd));
        return teamBudget(s, params.id);
      }),
    );
  } catch (e) {
    return fail(e);
  }
}
