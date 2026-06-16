// src/app/dashboard/projects/[id]/edit/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { requireSession } from '@/lib/session';
import { EditProjectClient } from '@/components/dashboard/projects/EditProjectClient';

export const metadata: Metadata = { title: 'Edit project' };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { isAdmin } = await requireSession();
  if (!isAdmin) redirect('/dashboard');

  const { id } = await params;

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/projects"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to projects
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight">Edit project</h1>
      <EditProjectClient id={id} />
    </div>
  );
}
