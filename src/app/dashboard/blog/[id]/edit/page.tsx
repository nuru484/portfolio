// src/app/dashboard/blog/[id]/edit/page.tsx
import type { Metadata } from 'next';
import { requireSession } from '@/lib/session';
import { EditPostClient } from '@/components/dashboard/blog/EditPostClient';
import { FormPageHeader } from '@/components/dashboard/FormPageHeader';

export const metadata: Metadata = { title: 'Edit post' };

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSession();
  const { id } = await params;

  return (
    <div className="space-y-6 max-w-3xl">
      <FormPageHeader
        title="Edit post"
        backHref="/dashboard/blog"
        backLabel="Back to blog"
      />
      <EditPostClient id={id} />
    </div>
  );
}
