// src/app/projects/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Home, MoveRight, Github, Globe, ArrowUpRight, Lock } from 'lucide-react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { getPublishedProjectBySlug } from '@/lib/projects/project-service';
import { youtubeEmbedUrl } from '@/utils/youtube';
import { clampDescription } from '@/lib/seo';
import { SITE } from '@/config/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) {
    return { title: 'Project not found', robots: { index: false, follow: false } };
  }

  const url = `${SITE.url}/projects/${slug}`;
  return {
    title: project.title,
    description: clampDescription(project.description, 155),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: project.title,
      description: clampDescription(project.description, 125),
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: clampDescription(project.description, 125),
    },
  };
}

/** Case-study section: eyebrow heading + multi-paragraph plain text. */
function CaseSection({ heading, text }: { heading: string; text: string | null }) {
  if (!text) return null;
  return (
    <section className="mt-10">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
        {heading}
      </h2>
      <p className="mt-3 whitespace-pre-line text-lg leading-relaxed text-muted-foreground">
        {text}
      </p>
    </section>
  );
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) notFound();

  const showCode = Boolean(project.githubUrl) && project.isRepoPublic;
  const embedUrl = project.youtubeUrl ? youtubeEmbedUrl(project.youtubeUrl) : null;
  const isPrivateBuild = !showCode && !project.liveUrl;

  return (
    <>
      <NavBar />

      <article className="font-urbanist">
        <div className="max-w-4xl mx-auto px-6 md:px-12 pt-6 pb-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" aria-label="Home" className="hover:text-foreground transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <MoveRight strokeWidth={1} className="w-4 h-4" />
            <Link href="/projects" className="hover:text-foreground transition-colors">
              Projects
            </Link>
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {project.projectType === 'CLIENT' ? 'Client Project' : 'Side Project'}
          </p>

          <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-normal [overflow-wrap:anywhere]">
            {project.title}
          </h1>

          <p className="mt-4 text-xl text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-background hover:text-foreground"
              >
                <Globe className="h-4 w-4" /> Live Demo
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {showCode && project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
              >
                <Github className="h-4 w-4" /> View Code
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {isPrivateBuild && (
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="h-4 w-4" /> Private build —
                </span>
                <Link
                  href="/contact"
                  className="font-medium text-foreground underline underline-offset-2 hover:text-muted-foreground"
                >
                  request a walkthrough →
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* Cover */}
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-muted">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 pb-16">
          <CaseSection heading="Overview" text={project.overview} />
          <CaseSection heading="The Problem" text={project.problem} />
          <CaseSection heading="The Solution" text={project.solution} />
          <CaseSection heading="Outcome" text={project.outcome} />

          {embedUrl && (
            <section className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                Video Walkthrough
              </h2>
              <div className="mt-3 aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted">
                <iframe
                  src={embedUrl}
                  title={`${project.title} — video walkthrough`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  className="h-full w-full"
                />
              </div>
            </section>
          )}

          {project.screenshots.length > 0 && (
            <section className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                Screenshots
              </h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {project.screenshots.map((url, i) => (
                  <div
                    key={url}
                    className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-muted"
                  >
                    <Image
                      src={url}
                      alt={`${project.title} screenshot ${i + 1}`}
                      fill
                      sizes="(min-width: 640px) 28rem, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      <Footer />
    </>
  );
}
