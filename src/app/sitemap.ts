// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SITE } from '@/config/constants';
import { getPublishedPostSlugs } from '@/lib/posts/post-service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    { path: '', changeFrequency: 'yearly' as const, priority: 1 },
    { path: '/projects', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/about', changeFrequency: 'yearly' as const, priority: 0.8 },
    { path: '/contact', changeFrequency: 'yearly' as const, priority: 0.8 },
  ].map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const posts = await getPublishedPostSlugs();
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
