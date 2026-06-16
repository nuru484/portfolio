// src/app/dashboard/projects/page.tsx
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireSession } from '@/lib/session';
import { ProjectsManageClient } from '@/components/dashboard/projects/ProjectsManageClient';

export const metadata: Metadata = { title: 'Projects' };

export default async function ProjectsDashboardPage() {
  const { isAdmin } = await requireSession();
  if (!isAdmin) redirect('/dashboard');

  return <ProjectsManageClient />;
}
