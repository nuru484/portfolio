// src/config/env.ts

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env variable: ${name}`);
  return v;
}

/**
 * Required secret with a minimum length so a placeholder or truncated value
 * fails at startup instead of silently weakening signing/encryption.
 */
function requiredSecret(name: string, minLength = 32): string {
  const v = required(name);
  if (v.length < minLength) {
    throw new Error(
      `Env variable ${name} must be at least ${minLength} characters (got ${v.length}). ` +
        `Generate one with: openssl rand -hex 32`,
    );
  }
  return v;
}

function optional(name: string): string | undefined {
  const v = process.env[name];
  return v?.length ? v : undefined;
}

const IS_PRODUCTION =
  (optional('NODE_ENV') ?? 'development') === 'production';

export const ENV = {
  NODE_ENV: optional('NODE_ENV') ?? 'development',
  IS_PRODUCTION,

  DATABASE_URL: required('DATABASE_URL'),

  SESSION_SECRET: requiredSecret('SESSION_SECRET'),

  // Public site origin — canonical URLs, sitemap, OG URLs, and absolute links
  // in emails (password reset). Must be set in production so none of those
  // point at a preview domain; localhost fallback is for development only.
  BASE_URL: optional('NEXT_PUBLIC_BASE_URL') ?? 'http://localhost:3000',

  // Cloudinary — image uploads. Optional so the app boots without them; the
  // upload service validates (and fails clearly) at call time when unset.
  CLOUDINARY_CLOUD_NAME: optional('CLOUDINARY_CLOUD_NAME'),
  CLOUDINARY_API_KEY: optional('CLOUDINARY_API_KEY'),
  CLOUDINARY_API_SECRET: optional('CLOUDINARY_API_SECRET'),
  CLOUDINARY_FOLDER: optional('CLOUDINARY_FOLDER') ?? 'portfolio',

  // Gmail SMTP — optional. When unset, the mail layer logs codes/links to the
  // server console instead of sending email (fine for local development).
  GMAIL_USER: optional('GMAIL_USER'),
  GMAIL_PASSWORD: optional('GMAIL_PASSWORD'),
  EMAIL_FROM_NAME: optional('EMAIL_FROM_NAME') ?? 'Abdul-Majeed Nurudeen',

  // Upstash Redis. Optional in development (in-memory limiter is correct for
  // a single local process) but REQUIRED in production: on serverless each
  // instance has its own memory, so an in-memory limiter provides no real
  // protection. The rate limiter fails closed when these are missing in
  // production — see src/lib/rate-limit.ts.
  UPSTASH_REDIS_REST_URL: optional('UPSTASH_REDIS_REST_URL'),
  UPSTASH_REDIS_REST_TOKEN: optional('UPSTASH_REDIS_REST_TOKEN'),
} as const;
