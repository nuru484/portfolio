// src/components/home/HomeProjectCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Github, Globe, ArrowUpRight, ArrowRight } from 'lucide-react';
import type { IProject } from '@/types/project.types';

/**
 * Compact teaser card for the homepage grid — the full-width alternating
 * rows (ProjectCard) stay on /projects. The image bleeds to the card edges;
 * only the text block carries padding. Uniform heights: clamped text with
 * reserved lines, footer pinned with mt-auto.
 */
export function HomeProjectCard({ project }: { project: IProject }) {
  const { title, description, technologies, image, githubUrl, liveUrl } =
    project;
  const showCode = Boolean(githubUrl) && project.isRepoPublic;
  const shownTech = technologies.slice(0, 4);
  const extraTech = technologies.length - shownTech.length;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm font-urbanist">
      {/* Full-bleed image: flush with the card's edges. */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`${title} — case study`}
        className="relative block aspect-[16/10] overflow-hidden border-b border-border bg-muted"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 640px) 32rem, 100vw"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3
          title={title}
          className="min-w-0 line-clamp-1 whitespace-normal [overflow-wrap:anywhere] text-xl font-medium"
        >
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors hover:text-muted-foreground"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-1.5 min-h-[3em] min-w-0 line-clamp-2 text-base leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">
          {description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {shownTech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {extraTech > 0 && (
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
              +{extraTech}
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-4">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-muted-foreground transition-colors"
          >
            Case Study <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-muted-foreground transition-colors"
              >
                <Globe className="h-4 w-4" /> Live Demo
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {showCode && githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-muted-foreground transition-colors"
              >
                <Github className="h-4 w-4" /> View Code
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
        </div>
      </div>
    </article>
  );
}
