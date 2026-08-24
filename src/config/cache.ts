// src/config/cache.ts

/**
 * Cache tags for the public reads. Every cached read of a domain carries its
 * tag, and every admin write drops it, so a publish or an edit is live on the
 * next request instead of waiting out the revalidate window.
 *
 * Tags are per domain, not per record: the dataset is small enough that
 * re-running a handful of queries costs less than tracking which pages showed
 * which row.
 */

/** Every public projects read: homepage teaser, projects page, detail, sitemap. */
export const PROJECTS_TAG = 'public-projects';

/**
 * Every public blog read: the post list, a post by slug, the sitemap slugs and
 * the category nav - the nav counts published posts, so a post write moves it
 * too and one tag covers both.
 */
export const POSTS_TAG = 'public-posts';

/** Every public testimonials read (homepage rail). */
export const TESTIMONIALS_TAG = 'public-testimonials';

/** Every public client-logo read (homepage "Trusted by" strip). */
export const CLIENT_LOGOS_TAG = 'public-client-logos';
