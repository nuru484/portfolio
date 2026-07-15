// Per-post OG card: the post title on the brand template, so every share is
// branded and correctly sized regardless of the cover image's aspect ratio.
import { portfolioOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';
import { getPublishedPostBySlug } from '@/lib/posts/post-service';
import { SITE } from '@/config/constants';

export const alt = `Blog — ${SITE.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const clip = (text: string, max: number) =>
  text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  const cta = 'Read the full post →';

  if (!post) {
    return portfolioOgImage({
      eyebrow: 'Blog',
      title: 'Notes on building for the web',
      subtitle: 'Technical writing on full-stack development.',
      cta,
    });
  }

  return portfolioOgImage({
    eyebrow: post.category?.name ?? 'Blog',
    title: clip(post.title, 90),
    subtitle: clip(post.excerpt, 140),
    cta,
  });
}
