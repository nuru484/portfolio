// src/components/projects/ProjectCard.tsx
import Image from 'next/image';
import { Github, Globe, ArrowUpRight } from 'lucide-react';
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

  return (
    <article className="max-w-6xl mx-auto px-6 md:px-12 py-8 md:py-12 font-urbanist">
      <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-14">
        {/* Image */}
        <div
          className={cn(
            'group relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-muted shadow-sm',
            reversed && 'md:order-2',
          )}
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 768px) 36rem, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Details */}
        <div className={cn('flex flex-col gap-4', reversed && 'md:order-1')}>
          <h2 className="text-3xl font-medium">{title}</h2>
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

          {(githubUrl || liveUrl) && (
            <div className="flex flex-wrap gap-3 pt-2">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
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
                  className="inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-background hover:text-foreground"
                >
                  <Globe className="h-4 w-4" /> Live Demo
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
