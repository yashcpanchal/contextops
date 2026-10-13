import { gunzipSync } from 'node:zlib';
import { mutate } from '@/lib/store';
import { ingestOtel, parseOtlpMetrics } from '@/lib/ingest/otel';
import { ok, fail } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let body: unknown;
  try {
    const buf = Buffer.from(await req.arrayBuffer());
    const raw = req.headers.get('content-encoding') === 'gzip' ? gunzipSync(buf) : buf;
    body = JSON.parse(raw.toString('utf8'));
  } catch {
    return fail('Expected OTLP/HTTP JSON (set OTEL_EXPORTER_OTLP_PROTOCOL=http/json)');
  }
  const parsed = parseOtlpMetrics(body);
  const result = mutate((s) => ingestOtel(s, parsed));
  return ok({
    partialSuccess: result.sessionsRejected
      ? { rejectedDataPoints: result.sessionsRejected, errorMessage: result.rejectedReasons.join('; ') }
      : {},
    ...result,
  });
}
