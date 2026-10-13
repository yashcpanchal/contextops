import { resetState } from '@/lib/store';
import { ok } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function POST() {
  const s = resetState();
  return ok({ ok: true, asOf: s.asOf, sessions: s.sessions.length });
}
