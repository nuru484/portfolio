// src/components/dashboard/projects/ProjectsManageClient.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  useGetAllProjectsQuery,
  useToggleProjectPublishMutation,
  useDeleteProjectMutation,
} from '@/redux/project-api';
import type { IProject } from '@/types/project.types';

function ProjectRow({ project }: { project: IProject }) {
  const [togglePublish, { isLoading: toggling }] =
    useToggleProjectPublishMutation();
  const [deleteProject, { isLoading: deleting }] = useDeleteProjectMutation();

  const handleToggle = async () => {
    try {
      await togglePublish(project.id).unwrap();
      toast.success(project.isPublished ? 'Unpublished.' : 'Published.');
    } catch {
      toast.error('Could not update visibility.');
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Remove "${project.title}"? This archives it (soft delete).`)) {
      return;
    }
    try {
      await deleteProject(project.id).unwrap();
      toast.success('Project removed.');
    } catch {
      toast.error('Could not remove project.');
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 px-5 py-4">
      <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
        <Image
          src={project.desktopImage}
          alt=""
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-medium truncate">{project.title}</p>
        <p className="text-xs text-muted-foreground truncate">/{project.slug}</p>
      </div>

      <span
        className={
          project.isPublished
            ? 'rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background'
            : 'rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground'
        }
      >
        {project.isPublished ? 'Published' : 'Draft'}
      </span>

      <div className="flex items-center gap-1.5">
        <button
          onClick={handleToggle}
          disabled={toggling}
          title={project.isPublished ? 'Unpublish' : 'Publish'}
          className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
        >
          {project.isPublished ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
        <Link
          href={`/dashboard/projects/${project.id}/edit`}
          title="Edit"
          className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Pencil className="h-4 w-4" />
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleting}
          title="Remove"
          className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-border text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function ProjectsManageClient() {
  const { data, isLoading, isError } = useGetAllProjectsQuery();
  const projects = data?.data ?? [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-1 text-muted-foreground">
            Manage the projects shown on your site.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/dashboard/projects/new">
            <Plus className="h-4 w-4" />
            New project
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          Loading…
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-8 text-center text-sm text-destructive">
          Failed to load projects.
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">No projects yet.</p>
          <Button asChild className="mt-4 gap-2">
            <Link href="/dashboard/projects/new">
              <Plus className="h-4 w-4" />
              Add your first project
            </Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
