// src/app/dashboard/testimonials/new/page.tsx
import type { Metadata } from 'next';
import { requireSession } from '@/lib/session';
import { TestimonialForm } from '@/components/dashboard/testimonials/TestimonialForm';
import { FormPageHeader } from '@/components/dashboard/FormPageHeader';

export const metadata: Metadata = { title: 'New testimonial' };

export default async function NewTestimonialPage() {
  await requireSession();

  return (
    <div className="space-y-6">
      <FormPageHeader title="New testimonial" backHref="/dashboard/testimonials" />
      <TestimonialForm mode="create" />
    </div>
  );
}
