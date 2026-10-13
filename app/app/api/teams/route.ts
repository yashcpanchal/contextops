import { getState } from '@/lib/store';
import { teamRows } from '@/lib/views';
import { ok, intParam } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  return ok({ teams: teamRows(getState(), intParam(req.url, 'days', 30)) });
}
