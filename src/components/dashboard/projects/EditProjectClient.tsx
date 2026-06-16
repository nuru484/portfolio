// src/components/dashboard/projects/EditProjectClient.tsx
'use client';

import { useGetProjectQuery } from '@/redux/project-api';
import { ProjectForm } from './ProjectForm';

export function EditProjectClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useGetProjectQuery(id);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }
  if (isError || !data) {
    return <p className="text-sm text-destructive">Failed to load project.</p>;
  }

  return <ProjectForm mode="edit" initial={data.data} />;
}
