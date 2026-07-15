import { portfolioOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';
import { SITE } from '@/config/constants';

export const alt = `Blog — ${SITE.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return portfolioOgImage({
    eyebrow: 'Blog',
    title: 'Notes on building for the web',
    subtitle:
      'Technical writing on full-stack development — patterns, pitfalls, and lessons learned.',
    cta: 'Read the blog →',
  });
}
