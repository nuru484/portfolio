// src/app/dashboard/testimonials/[id]/edit/page.tsx
import type { Metadata } from 'next';
import { requireSession } from '@/lib/session';
import { EditTestimonialClient } from '@/components/dashboard/testimonials/EditTestimonialClient';
import { FormPageHeader } from '@/components/dashboard/FormPageHeader';

export const metadata: Metadata = { title: 'Edit testimonial' };

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSession();
  const { id } = await params;

  return (
    <div className="space-y-6">
      <FormPageHeader
        title="Edit testimonial"
        backHref="/dashboard/testimonials"
      />
      <EditTestimonialClient id={id} />
    </div>
  );
}
