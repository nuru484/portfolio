// src/app/privacy-policy/opengraph-image.tsx
import { portfolioOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';
import { SITE } from '@/config/constants';

export const alt = `Privacy Policy · ${SITE.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return portfolioOgImage({
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    subtitle:
      'What this site collects about visitors (very little), and your choices.',
    cta: 'Read the policy →',
  });
}
