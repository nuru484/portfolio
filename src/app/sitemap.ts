// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SITE } from '@/config/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', changeFrequency: 'yearly' as const, priority: 1 },
    { path: '/projects', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/about', changeFrequency: 'yearly' as const, priority: 0.8 },
    { path: '/contact', changeFrequency: 'yearly' as const, priority: 0.8 },
  ];

  return routes.map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
