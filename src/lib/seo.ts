// src/lib/seo.ts
import type { Metadata } from 'next';
import { SITE } from '@/config/constants';

interface PageMetaOptions {
  title: string;
  description: string;
  /** Path after the origin, e.g. "/projects". Defaults to the home page. */
  path?: string;
  /** OG/Twitter image path under /public. Add the file there. */
  image?: string;
  /** Use the title verbatim (no "| Abdul-Majeed Nurudeen" suffix). */
  absoluteTitle?: boolean;
}

/**
 * Builds consistent per-page metadata (canonical URL + Open Graph + Twitter)
 * from a title, description, and an OG image name. Image files live in
 * /public and are referenced by name.
 */
export function pageMetadata({
  title,
  description,
  path = '',
  image = '/og/og-default.png',
  absoluteTitle = false,
}: PageMetaOptions): Metadata {
  const url = `${SITE.url}${path}`;
  const ogTitle = absoluteTitle ? title : `${title} — ${SITE.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE.name,
      title: ogTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [image],
    },
  };
}
