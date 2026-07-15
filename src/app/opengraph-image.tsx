// Default OG card — applies to every route without a more specific one.
import { portfolioOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';
import { SITE } from '@/config/constants';

export const alt = SITE.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return portfolioOgImage({
    eyebrow: 'Portfolio',
    title: SITE.name,
    subtitle:
      'Full-stack software developer — PostgreSQL, Express, React, Node.js, and Next.js.',
  });
}
