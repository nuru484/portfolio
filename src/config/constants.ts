// src/config/constants.ts

export const BCRYPT_SALT_ROUNDS = 12;

export const SITE = {
  name: 'Abdul-Majeed Nurudeen',
  title: 'Abdul-Majeed Nurudeen — Full-Stack Software Developer',
  description:
    'Portfolio of Abdul-Majeed Nurudeen, a full-stack software developer specializing in the PERN stack (PostgreSQL, Express, React, Node.js).',
  url:
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://portfolio-nurus-projects-d98f949e.vercel.app',
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
    href: 'https://www.linkedin.com/in/abdul-majeed-nurudeen-78266a182/',
    label: 'LinkedIn',
  },
  { href: 'https://x.com/ABDULMAJEEDNUR3', label: 'Twitter' },
] as const;
