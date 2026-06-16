// src/config/env.ts

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env variable: ${name}`);
  return v;
}

function optional(name: string): string | undefined {
  const v = process.env[name];
  return v?.length ? v : undefined;
}

function bool(name: string, defaultValue = false): boolean {
  const v = process.env[name];
  if (!v) return defaultValue;
  return ['1', 'true', 'yes', 'on'].includes(v.toLowerCase());
}

export const ENV = {
  NODE_ENV: optional('NODE_ENV') ?? 'development',
  IS_PRODUCTION: (optional('NODE_ENV') ?? 'development') === 'production',

  ADMIN_SEED_ENABLED: bool('ADMIN_SEED_ENABLED', false),
  ADMIN_SEED_FORCE_UPDATE: bool('ADMIN_SEED_FORCE_UPDATE', false),

  ADMIN_EMAIL: required('ADMIN_EMAIL'),
  ADMIN_PASSWORD: required('ADMIN_PASSWORD'),
  ADMIN_FULLNAME: required('ADMIN_FULLNAME'),
  ADMIN_PHONE: optional('ADMIN_PHONE'),

  SESSION_SECRET: required('SESSION_SECRET'),

  // Public site origin — used to build absolute links in emails (password
  // reset). Falls back to localhost for local development.
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

  // Upstash Redis — optional. When unset, an in-memory rate limiter is used
  // (correct for a single local dev instance).
  UPSTASH_REDIS_REST_URL: optional('UPSTASH_REDIS_REST_URL'),
  UPSTASH_REDIS_REST_TOKEN: optional('UPSTASH_REDIS_REST_TOKEN'),
} as const;
