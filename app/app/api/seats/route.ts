import { getState } from '@/lib/store';
import { seatsView } from '@/lib/views';
import { ok } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  return ok(seatsView(getState()));
}
