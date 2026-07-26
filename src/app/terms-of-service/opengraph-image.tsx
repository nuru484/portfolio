// src/app/terms-of-service/opengraph-image.tsx
import { portfolioOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';
import { SITE } from '@/config/constants';

export const alt = `Terms of Service · ${SITE.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return portfolioOgImage({
    eyebrow: 'Legal',
    title: 'Terms of Service',
    subtitle: 'The fine print for using this portfolio site, kept short.',
    cta: 'Read the terms →',
  });
}
