'use client';
export interface ApiResult<T = any> {
  ok: boolean;
  status: number;
  data: T;
  error?: string;
}
export async function callApi<T = any>(url: string, init: { method?: string; body?: unknown; raw?: string; contentType?: string } = {}): Promise<ApiResult<T>> {
  try {
    const hasRaw = init.raw !== undefined;
    const res = await fetch(url, {
      method: init.method ?? 'POST',
      headers: hasRaw ? { 'Content-Type': init.contentType ?? 'text/plain' } : init.body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: hasRaw ? init.raw : init.body !== undefined ? JSON.stringify(init.body) : undefined,
    });
    let data: any = null;
    const text = await res.text();
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }
    return { ok: res.ok, status: res.status, data, error: res.ok ? undefined : (data && data.error) || `Request failed (${res.status})` };
  } catch (e) {
    return { ok: false, status: 0, data: null as any, error: e instanceof Error ? e.message : 'Network error' };
  }
}
