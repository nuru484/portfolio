import { describe, it, expect } from 'vitest';
import {
  createInMemoryLimiter,
  createFailClosedLimiter,
  selectLimiter,
  RATE_LIMIT,
} from '@/lib/rate-limiter';

describe('selectLimiter', () => {
  it('uses Upstash whenever configured', () => {
    expect(
      selectLimiter({ isProduction: true, hasUpstash: true }).kind,
    ).toBe('upstash');
    expect(
      selectLimiter({ isProduction: false, hasUpstash: true }).kind,
    ).toBe('upstash');
  });

  it('uses in-memory in development without Upstash', () => {
    expect(
      selectLimiter({ isProduction: false, hasUpstash: false }).kind,
    ).toBe('memory');
  });

  it('FAILS CLOSED in production without Upstash (never fails open)', () => {
    const selection = selectLimiter({ isProduction: true, hasUpstash: false });
    expect(selection.kind).toBe('fail-closed');
  });
});

describe('createInMemoryLimiter', () => {
  it(`allows up to ${RATE_LIMIT} hits per window, then blocks`, async () => {
    const limiter = createInMemoryLimiter();

    for (let i = 0; i < RATE_LIMIT; i++) {
      const r = await limiter.limit('key');
      expect(r.success).toBe(true);
    }
    const blocked = await limiter.limit('key');
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it('tracks keys independently', async () => {
    const limiter = createInMemoryLimiter();
    for (let i = 0; i <= RATE_LIMIT; i++) await limiter.limit('a');

    const other = await limiter.limit('b');
    expect(other.success).toBe(true);
  });
});

describe('createFailClosedLimiter', () => {
  it('denies every request', async () => {
    const limiter = createFailClosedLimiter();
    const r = await limiter.limit('anything');
    expect(r.success).toBe(false);
    expect(r.remaining).toBe(0);
  });
});
