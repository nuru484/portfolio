// src/components/dashboard/testimonials/EditTestimonialClient.tsx
'use client';

import { useGetTestimonialQuery } from '@/redux/testimonial-api';
import { TestimonialForm } from './TestimonialForm';

export function EditTestimonialClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useGetTestimonialQuery(id);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }
  if (isError || !data) {
    return <p className="text-sm text-destructive">Failed to load testimonial.</p>;
  }

  return <TestimonialForm mode="edit" initial={data.data} />;
}
