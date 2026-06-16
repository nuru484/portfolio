// src/components/dashboard/blog/EditPostClient.tsx
'use client';

import { useGetPostQuery } from '@/redux/post-api';
import { PostForm } from './PostForm';

export function EditPostClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useGetPostQuery(id);

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (isError || !data) {
    return <p className="text-sm text-destructive">Failed to load post.</p>;
  }

  return <PostForm mode="edit" initial={data.data} />;
}
