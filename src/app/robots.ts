// src/app/robots.ts
import type { MetadataRoute } from 'next';
import { SITE } from '@/config/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/dashboard/*',
        '/login',
        '/forgot-password',
        '/reset-password',
      ],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
