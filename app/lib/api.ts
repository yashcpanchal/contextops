import { NextResponse } from 'next/server';

export function ok<T>(data: T, status = 200): NextResponse {
  return NextResponse.json(data, { status });
}
export function fail(error: unknown, status = 400): NextResponse {
  const message = error instanceof Error ? error.message : String(error);
  return NextResponse.json({ error: message }, { status });
}
export async function readJson<T>(req: Request): Promise<T> {
  try {
    return (await req.json()) as T;
  } catch {
    return {} as T;
  }
}
export function intParam(url: string, name: string, def: number): number {
  const v = Number(new URL(url).searchParams.get(name));
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : def;
}
