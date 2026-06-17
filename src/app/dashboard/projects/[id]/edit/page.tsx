// src/app/dashboard/projects/[id]/edit/page.tsx
import type { Metadata } from 'next';
import { requireSession } from '@/lib/session';
import { EditProjectClient } from '@/components/dashboard/projects/EditProjectClient';
import { FormPageHeader } from '@/components/dashboard/FormPageHeader';

export const metadata: Metadata = { title: 'Edit project' };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSession();
  const { id } = await params;

  return (
    <div className="space-y-6">
      <FormPageHeader title="Edit project" backHref="/dashboard/projects" />
      <EditProjectClient id={id} />
    </div>
  );
}
