import { portfolioOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';
import { SITE } from '@/config/constants';

export const alt = `Projects — ${SITE.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return portfolioOgImage({
    eyebrow: 'Projects',
    title: 'Things I have built',
    subtitle:
      'Production web applications — storefronts, dashboards, APIs, and more.',
    cta: 'See the projects →',
  });
}
