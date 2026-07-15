// src/app/dashboard/projects/[id]/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Pencil, Github, Globe, ArrowUpRight } from 'lucide-react';
import { requireSession } from '@/lib/session';
import { getProjectById } from '@/lib/projects/project-service';
import { Button } from '@/components/ui/button';
import { FormPageHeader } from '@/components/dashboard/FormPageHeader';

export const metadata: Metadata = { title: 'Project' };

function formatDate(value: string | Date) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSession();
  const { id } = await params;

  const project = await getProjectById(id).catch(() => null);
  if (!project) notFound();

  return (
    <div className="space-y-6 max-w-3xl">
      <FormPageHeader title={project.title} backHref="/dashboard/projects" />

      <div className="flex flex-wrap items-center gap-3">
        <span
          className={
            project.isPublished
              ? 'rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background'
              : 'rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground'
          }
        >
          {project.isPublished ? 'Published' : 'Draft'}
        </span>
        <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {project.projectType === 'CLIENT' ? 'Client project' : 'Side project'}
        </span>
        <span className="text-sm text-muted-foreground">
          /{project.slug} · order {project.displayOrder} · repo{' '}
          {project.isRepoPublic ? 'public' : 'private'}
        </span>
        <Button asChild variant="outline" size="sm" className="ml-auto gap-2">
          <Link href={`/dashboard/projects/${project.id}/edit`}>
            <Pencil className="h-4 w-4" /> Edit
          </Link>
        </Button>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 48rem, 100vw"
          className="object-cover"
        />
      </div>

      <p className="text-lg leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      {(project.githubUrl || project.liveUrl) && (
        <div className="flex flex-wrap gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted transition-colors"
            >
              <Github className="h-4 w-4" /> Repository <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted transition-colors"
            >
              <Globe className="h-4 w-4" /> Live site <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Created {formatDate(project.createdAt)} · Updated{' '}
        {formatDate(project.updatedAt)}
      </p>
    </div>
  );
}
