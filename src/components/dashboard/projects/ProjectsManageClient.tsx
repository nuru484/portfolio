// src/components/dashboard/projects/ProjectsManageClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ManageListSkeleton } from '@/components/dashboard/Skeletons';
import { ListFilters } from '@/components/dashboard/ListFilters';
import { ListPager } from '@/components/dashboard/ListPager';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import {
  useGetAllProjectsQuery,
  useToggleProjectPublishMutation,
  useDeleteProjectMutation,
} from '@/redux/project-api';
import type { IProject } from '@/types/project.types';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Drafts' },
];

function ProjectRow({
  project,
  canDelete,
}: {
  project: IProject;
  canDelete: boolean;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
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
    try {
      await deleteProject(project.id).unwrap();
      toast.success('Project removed.');
      setConfirmOpen(false);
    } catch {
      toast.error('Could not remove project.');
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 py-4 sm:px-5">
      <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
        <Image
          src={project.image}
          alt=""
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      <div className="min-w-0 flex-1">
        <Link
          href={`/dashboard/projects/${project.id}`}
          className="block truncate font-medium hover:underline"
        >
          {project.title}
        </Link>
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
        {canDelete && (
          <button
            onClick={() => setConfirmOpen(true)}
            disabled={deleting}
            title="Remove"
            className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-border text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Remove project?"
        description={`This archives "${project.title}" (soft delete). It will no longer appear on your site.`}
        confirmText="Remove"
        isDestructive
        loading={deleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export function ProjectsManageClient({
  canDelete = true,
}: {
  canDelete?: boolean;
}) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue(search);

  const { data, isLoading, isError, isFetching } = useGetAllProjectsQuery({
    search: debouncedSearch.trim() || undefined,
    isPublished: status === 'all' ? undefined : status === 'published',
    page,
    limit: 10,
  });
  const projects = data?.data ?? [];
  const pagination = data?.pagination;
  const filtering = !!debouncedSearch.trim() || status !== 'all';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-1 text-muted-foreground">
            Manage the projects shown on your site.
          </p>
        </div>
        <Button asChild className="gap-2 self-start">
          <Link href="/dashboard/projects/new">
            <Plus className="h-4 w-4" />
            New project
          </Link>
        </Button>
      </div>

      <ListFilters
        search={search}
        onSearch={(v) => {
          setSearch(v);
          setPage(1);
        }}
        status={status}
        onStatus={(v) => {
          setStatus(v);
          setPage(1);
        }}
        statusOptions={STATUS_OPTIONS}
        placeholder="Search projects…"
      />

      {isLoading ? (
        <ManageListSkeleton />
      ) : isError ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-8 text-center text-sm text-destructive">
          Failed to load projects.
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">
            {filtering ? 'No projects match your filters.' : 'No projects yet.'}
          </p>
          {!filtering && (
            <Button asChild className="mt-4 gap-2">
              <Link href="/dashboard/projects/new">
                <Plus className="h-4 w-4" />
                Add your first project
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <>
          <div
            className={`divide-y divide-border sm:overflow-hidden sm:rounded-2xl sm:border sm:border-border sm:bg-card ${
              isFetching ? 'opacity-60' : ''
            }`}
          >
            {projects.map((project) => (
              <ProjectRow key={project.id} project={project} canDelete={canDelete} />
            ))}
          </div>
          {pagination && (
            <ListPager
              page={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
