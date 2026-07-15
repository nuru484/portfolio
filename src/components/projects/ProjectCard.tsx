// src/components/projects/ProjectCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Github, Globe, ArrowUpRight, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IProject } from '@/types/project.types';

interface ProjectCardProps {
  project: IProject;
  /** Index in the list — even rows show the image left, odd rows right. */
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const { title, description, technologies, image, githubUrl, liveUrl } =
    project;
  const reversed = index % 2 === 1;
  const shownTech = technologies.slice(0, 6);
  const extraTech = technologies.length - shownTech.length;
  // Private repos never expose their GitHub link on the public site.
  const showCode = Boolean(githubUrl) && project.isRepoPublic;

  return (
    <article className="max-w-6xl mx-auto px-6 md:px-12 py-4 md:py-12 font-urbanist">
      {/* Contained card below md — thin border, sharp corners, tight p-3 to
          avoid double-inset bloat; the open 2-column layout takes over from md. */}
      <div className="grid items-center gap-5 max-md:border max-md:border-border max-md:bg-card max-md:p-3 max-md:shadow-sm md:grid-cols-2 md:gap-8 lg:gap-14">
        {/* Image */}
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`${title} — case study`}
          className={cn(
            'relative block aspect-[16/10] overflow-hidden border border-border bg-muted shadow-sm max-md:rounded-none md:rounded-2xl',
            reversed && 'md:order-2',
          )}
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 768px) 36rem, 100vw"
            className="object-cover"
          />
        </Link>

        {/* Details */}
        <div className={cn('flex flex-col gap-4', reversed && 'md:order-1')}>
          <h2 className="text-3xl font-medium">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors hover:text-muted-foreground"
            >
              {title}
            </Link>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {shownTech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
              >
                {tech}
              </span>
            ))}
            {extraTech > 0 && (
              <span className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
                +{extraTech} more
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
            {/* Phones/tablets reach the case study via the image/title links;
                the extra button only earns its space from lg. */}
            <Link
              href={`/projects/${project.slug}`}
              className="hidden lg:inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
            >
              Case Study <ArrowRight className="h-4 w-4" />
            </Link>
            {showCode && githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-foreground px-3.5 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
                >
                  <Github className="h-4 w-4" /> View Code
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-3.5 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm font-medium text-background transition-colors hover:bg-background hover:text-foreground"
                >
                  <Globe className="h-4 w-4" /> Live Demo
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
          </div>
        </div>
      </div>
    </article>
  );
}
