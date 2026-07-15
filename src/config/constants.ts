// src/config/constants.ts

export const BCRYPT_SALT_ROUNDS = 12;

// Canonical URLs, the sitemap, and OG URLs are all built from this origin, so
// a production build without it would ship wrong metadata everywhere. Fail the
// build instead of falling back to a preview/localhost domain.
if (!process.env.NEXT_PUBLIC_BASE_URL && process.env.NODE_ENV === 'production') {
  throw new Error(
    'NEXT_PUBLIC_BASE_URL must be set in production (the public site origin, e.g. https://example.com).',
  );
}

export const SITE = {
  name: 'Abdul-Majeed Nurudeen',
  title: 'Abdul-Majeed Nurudeen — Full-Stack Software Developer',
  description:
    'Portfolio of Abdul-Majeed Nurudeen, a full-stack software developer specializing in the PERN stack (PostgreSQL, Express, React, Node.js).',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
} as const;

export const CONTACT = {
  phone: '+233546488115',
  email: 'abdulmajeednurudeen48@gmail.com',
  location: 'Tamale, Ghana',
} as const;

export const SOCIAL_LINKS = [
  {
    href: 'https://web.facebook.com/profile.php?id=100080955712476',
    label: 'Facebook',
  },
  {
    href: 'https://www.linkedin.com/in/nurudeen-abdul-majeed-78266a182/',
    label: 'LinkedIn',
  },
  { href: 'https://x.com/nuru484', label: 'X' },
] as const;
