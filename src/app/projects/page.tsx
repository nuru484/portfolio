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

export default function ProjectsPage() {
  return (
    <>
      <NavBar />
      <ProjectsList />
      <Footer />
    </>
  );
}
