// src/utils/revalidate.ts
import 'server-only';
import { revalidateTag } from 'next/cache';
import {
  CLIENT_LOGOS_TAG,
  POSTS_TAG,
  PROJECTS_TAG,
  TESTIMONIALS_TAG,
} from '@/config/cache';

// Every public read carries its domain tag, so dropping the tag reaches the
// queries and the pages built from them - no route needs to be listed here,
// and a new page that reads the same data is covered the day it is added.
//
// 'max' expires the entry outright rather than easing it out on a cache-life
// profile: an admin who just published wants it gone now. The second argument
// is required in route handlers, where these run.

/** Homepage teaser, projects list, project detail, sitemap. */
export function revalidatePublicProjects(): void {
  revalidateTag(PROJECTS_TAG, 'max');
}

/** Blog list, post detail, the category nav and the sitemap. */
export function revalidatePublicBlog(): void {
  revalidateTag(POSTS_TAG, 'max');
}

/** The homepage testimonials rail. */
export function revalidatePublicTestimonials(): void {
  revalidateTag(TESTIMONIALS_TAG, 'max');
}

/** The homepage "Trusted by" logo strip. */
export function revalidatePublicClientLogos(): void {
  revalidateTag(CLIENT_LOGOS_TAG, 'max');
}
