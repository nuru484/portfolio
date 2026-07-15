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

export default function ProjectsPage() {
  return (
    <>
      <NavBar />
      <ProjectsList />
      <Footer />
    </>
  );
}
