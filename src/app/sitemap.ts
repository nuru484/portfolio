// src/app/sitemap.ts
import type { MetadataRoute } from 'next';

// The slug queries below are tagged, so publishing reaches the sitemap on the
// next request. The hourly window is the backstop for anything that changes the
// output without going through a write path, such as lastModified drifting.
export const revalidate = 3600;
import { SITE } from '@/config/constants';
import { getPublishedPostSlugs } from '@/lib/posts/post-service';
import { getPublishedProjectSlugs } from '@/lib/projects/project-service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    { path: '', changeFrequency: 'yearly' as const, priority: 1 },
    { path: '/projects', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/about', changeFrequency: 'yearly' as const, priority: 0.8 },
    { path: '/contact', changeFrequency: 'yearly' as const, priority: 0.8 },
    // The lookup form only. Individual /niv/verify/{id} pages carry private
    // names and are noindex, so they are never submitted.
    { path: '/niv/verify', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/privacy-policy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/terms-of-service', changeFrequency: 'yearly' as const, priority: 0.3 },
  ].map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [posts, projects] = await Promise.all([
    getPublishedPostSlugs(),
    getPublishedProjectSlugs(),
  ]);

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE.url}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes, ...projectRoutes];
}
