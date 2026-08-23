// src/utils/revalidate.ts
import 'server-only';
import { revalidatePath, revalidateTag } from 'next/cache';
import { PUBLIC_PROJECTS_TAG } from '@/lib/projects/project-service';

/**
 * Invalidates the statically-cached public pages that render projects, so
 * admin changes appear without a redeploy (on-demand ISR).
 */
export function revalidatePublicProjects(slug?: string): void {
  // The tag covers the cached queries behind the projects page; the paths
  // cover the rendered output. A dynamic route needs both - dropping the
  // pages alone would leave the next render reading stale cached rows.
  // 'max' expires the entry outright rather than easing it out on a
  // cache-life profile: an admin publishing wants it gone now.
  revalidateTag(PUBLIC_PROJECTS_TAG, 'max');
  revalidatePath('/');
  revalidatePath('/projects');
  if (slug) revalidatePath(`/projects/${slug}`);
}

/** Invalidates the public blog list + detail pages after a post mutation. */
export function revalidatePublicBlog(slug?: string): void {
  revalidatePath('/blog');
  if (slug) revalidatePath(`/blog/${slug}`);
}

/** Invalidates the home page, which renders the testimonials section. */
export function revalidatePublicTestimonials(): void {
  revalidatePath('/');
}

/** Invalidates the home page, which renders the "Trusted by" logo strip. */
export function revalidatePublicClientLogos(): void {
  revalidatePath('/');
}
