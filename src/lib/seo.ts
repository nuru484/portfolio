// src/lib/seo.ts
import type { Metadata } from 'next';
import { SITE } from '@/config/constants';

interface PageMetaOptions {
  title: string;
  description: string;
  /** Path after the origin, e.g. "/projects". Defaults to the home page. */
  path?: string;
  /** Use the title verbatim (no "| Abdul-Majeed Nurudeen" suffix). */
  absoluteTitle?: boolean;
}

/**
 * Builds consistent per-page metadata (canonical URL + Open Graph + Twitter).
 * OG/Twitter images are NOT set here — they come from the opengraph-image.tsx
 * file conventions (src/app/**), which take priority over config metadata and
 * are generated at build time from src/lib/og-image.tsx.
 */
export function pageMetadata({
  title,
  description,
  path = '',
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
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
    },
  };
}
