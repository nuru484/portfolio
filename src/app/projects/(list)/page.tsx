// src/app/projects/page.tsx
import type { Metadata } from 'next';
import { NavBar } from '@/components/NavBar';
import { ProjectsList } from '@/components/projects/ProjectsList';
import { Footer } from '@/components/Footer';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Projects',
  description:
    'Client work and side projects — real-time systems, dashboards, and API-driven web applications built on the PERN stack.',
  path: '/projects',
});

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const current = Math.max(Number(page) || 1, 1);

  return (
    <>
      <NavBar />
      <ProjectsList page={current} />
      <Footer />
    </>
  );
}
