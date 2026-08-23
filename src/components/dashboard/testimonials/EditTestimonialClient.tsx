// src/components/dashboard/testimonials/EditTestimonialClient.tsx
'use client';

import { useGetTestimonialQuery } from '@/redux/testimonial-api';
import { TestimonialForm } from './TestimonialForm';
import {
  FormSkeleton,
  type FormFieldShape,
} from '@/components/dashboard/FormSkeleton';

/** Mirrors the field order the form renders. */
const FORM_SHAPE: FormFieldShape[] = [
  'pair',
  'textarea',
  'image',
  'action',
  'settings',
];

export function EditTestimonialClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useGetTestimonialQuery(id);

  if (isLoading) return <FormSkeleton fields={FORM_SHAPE} />;
  if (isError || !data) {
    return <p className="text-sm text-destructive">Failed to load testimonial.</p>;
  }

  return <TestimonialForm mode="edit" initial={data.data} />;
}
