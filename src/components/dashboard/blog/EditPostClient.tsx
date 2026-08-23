// src/components/dashboard/blog/EditPostClient.tsx
'use client';

import { useGetPostQuery } from '@/redux/post-api';
import { PostForm } from './PostForm';
import {
  FormSkeleton,
  type FormFieldShape,
} from '@/components/dashboard/FormSkeleton';

/** Mirrors the field order the form renders. */
const FORM_SHAPE: FormFieldShape[] = [
  'field',
  'textarea',
  'field',
  'image',
  'editor',
  'toggles',
];

export function EditPostClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useGetPostQuery(id);

  if (isLoading) return <FormSkeleton fields={FORM_SHAPE} />;
  if (isError || !data) {
    return <p className="text-sm text-destructive">Failed to load post.</p>;
  }

  return <PostForm mode="edit" initial={data.data} />;
}
