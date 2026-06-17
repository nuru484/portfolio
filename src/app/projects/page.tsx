// src/app/projects/page.tsx
import type { Metadata } from 'next';
import { NavBar } from '@/components/NavBar';
import { ProjectsList } from '@/components/projects/ProjectsList';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A selection of full-stack projects built by Abdul-Majeed Nurudeen — from real-time systems to API-driven web applications.',
};

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
