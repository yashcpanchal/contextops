import { ok } from '@/lib/api';

export const dynamic = 'force-dynamic';

// Logs/events are accepted and discarded: ContextOps stores metadata metrics only, never prompts.
export async function POST() {
  return ok({});
}
