// Per-project OG card: the project title on the brand template.
import { portfolioOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';
import { getPublishedProjectBySlug } from '@/lib/projects/project-service';
import { SITE } from '@/config/constants';

export const alt = `Projects — ${SITE.name}`;
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
  const project = await getPublishedProjectBySlug(slug);
  const cta = 'See the case study →';

  if (!project) {
    return portfolioOgImage({
      eyebrow: 'Projects',
      title: 'Things I have built',
      subtitle: 'Production web applications — storefronts, dashboards, APIs.',
      cta,
    });
  }

  return portfolioOgImage({
    eyebrow: project.projectType === 'CLIENT' ? 'Client Project' : 'Side Project',
    title: clip(project.title, 90),
    subtitle: clip(project.description, 140),
    cta,
  });
}
