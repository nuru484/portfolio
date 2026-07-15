// src/utils/query-params.ts
//
// Tolerant search-param parsing for list endpoints: junk values fall back to
// undefined (service defaults) instead of NaN reaching Prisma and turning a
// bad ?page= into a 500.

export function intParam(
  sp: URLSearchParams,
  key: string,
): number | undefined {
  const v = sp.get(key);
  if (v === null || v === '') return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : undefined;
}

export function boolParam(
  sp: URLSearchParams,
  key: string,
): boolean | undefined {
  const v = sp.get(key);
  return v === null ? undefined : v === 'true';
}

export function strParam(
  sp: URLSearchParams,
  key: string,
): string | undefined {
  return sp.get(key) ?? undefined;
}
