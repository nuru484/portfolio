// src/lib/rate-limit.ts
import 'server-only';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { ENV } from '@/config/env';

const LIMIT = 5;
const WINDOW_MS = 60_000;

export interface LimitResult {
  success: boolean;
  /** Epoch ms when the window resets. */
  reset: number;
  remaining: number;
  limit: number;
}

export interface Limiter {
  limit(key: string): Promise<LimitResult>;
}

/**
 * In-memory sliding-window limiter. Correct for a single long-lived process
 * (local dev). In serverless production each instance has its own memory, so
 * Upstash (a shared store) is used instead — see below.
 */
function createInMemoryLimiter(): Limiter {
  const hits = new Map<string, number[]>();

  return {
    async limit(key: string): Promise<LimitResult> {
      const now = Date.now();
      const windowStart = now - WINDOW_MS;

      const timestamps = (hits.get(key) ?? []).filter((t) => t > windowStart);
      timestamps.push(now);
      hits.set(key, timestamps);

      // Opportunistic cleanup so the map doesn't grow unbounded.
      if (hits.size > 5000) {
        for (const [k, v] of hits) {
          if (v.every((t) => t <= windowStart)) hits.delete(k);
        }
      }

      const count = timestamps.length;
      const oldest = timestamps[0] ?? now;

      return {
        success: count <= LIMIT,
        reset: oldest + WINDOW_MS,
        remaining: Math.max(LIMIT - count, 0),
        limit: LIMIT,
      };
    },
  };
}

function createUpstashLimiter(): Limiter {
  const redis = new Redis({
    url: ENV.UPSTASH_REDIS_REST_URL!,
    token: ENV.UPSTASH_REDIS_REST_TOKEN!,
  });

  const rl = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(LIMIT, '60s'),
    analytics: true,
    prefix: 'portfolio:auth',
  });

  return {
    async limit(key: string): Promise<LimitResult> {
      const { success, reset, remaining, limit } = await rl.limit(key);
      return { success, reset, remaining, limit };
    },
  };
}

const useUpstash =
  Boolean(ENV.UPSTASH_REDIS_REST_URL) && Boolean(ENV.UPSTASH_REDIS_REST_TOKEN);

export const ratelimit: Limiter = useUpstash
  ? createUpstashLimiter()
  : createInMemoryLimiter();
