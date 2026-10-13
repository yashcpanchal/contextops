import { getState } from '@/lib/store';
import { ok } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  return ok({ entries: getState().audit });
}
