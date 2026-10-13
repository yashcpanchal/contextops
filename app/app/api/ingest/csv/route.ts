import { mutate } from '@/lib/store';
import { importCsvRows, parseCsv } from '@/lib/ingest/csv';
import { ok, fail } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let text = '';
  const type = req.headers.get('content-type') ?? '';
  try {
    if (type.includes('multipart/form-data')) {
      const form = await req.formData();
      const f = form.get('file');
      text = f && typeof f !== 'string' ? await f.text() : String(form.get('csv') ?? '');
    } else if (type.includes('application/json')) {
      text = String(((await req.json()) as { csv?: string }).csv ?? '');
    } else text = await req.text();
  } catch {
    return fail('Could not read request body');
  }
  const parsed = parseCsv(text);
  if (!parsed.rows.length) return fail(parsed.errors.join('; ') || 'No rows found');
  return ok(mutate((s) => importCsvRows(s, parsed)));
}
