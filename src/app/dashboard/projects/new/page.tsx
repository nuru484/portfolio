// src/app/dashboard/projects/new/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { requireSession } from '@/lib/session';
import { ProjectForm } from '@/components/dashboard/projects/ProjectForm';

export const metadata: Metadata = { title: 'New project' };

export default async function NewProjectPage() {
  const { isAdmin } = await requireSession();
  if (!isAdmin) redirect('/dashboard');

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/projects"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to projects
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight">New project</h1>
      <ProjectForm mode="create" />
    </div>
  );
}
