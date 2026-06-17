// src/app/dashboard/projects/new/page.tsx
import type { Metadata } from 'next';
import { requireSession } from '@/lib/session';
import { ProjectForm } from '@/components/dashboard/projects/ProjectForm';
import { FormPageHeader } from '@/components/dashboard/FormPageHeader';

export const metadata: Metadata = { title: 'New project' };

export default async function NewProjectPage() {
  await requireSession();

  return (
    <div className="space-y-6">
      <FormPageHeader title="New project" backHref="/dashboard/projects" />
      <ProjectForm mode="create" />
    </div>
  );
}
