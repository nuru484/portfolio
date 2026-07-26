import { portfolioOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';
import { SITE } from '@/config/constants';

export const alt = `About - ${SITE.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return portfolioOgImage({
    eyebrow: 'About',
    title: 'The developer behind the work',
    subtitle:
      'Self-taught engineer shipping production platforms end to end, from database to deployment.',
    cta: 'Learn more about me →',
  });
}
