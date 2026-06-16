// src/components/home/RecentProjects.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import projects from '@/static-data/projects';

export function RecentProjects() {
  return (
    <section className="mb-12 md:mb-14">
      <div className="flex justify-between flex-wrap gap-4 max-w-6xl mx-auto px-6 md:px-12 md:pb-6 font-urbanist">
        <h1 className="text-4xl md:text-5xl font-medium">Recent Projects</h1>

        <Link
          href="/projects"
          className="px-8 py-4 border border-foreground rounded-full flex justify-center items-center gap-2 flex-nowrap hover:bg-muted transition-colors duration-300"
        >
          View All
          <ArrowRight />
        </Link>
      </div>

      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </section>
  );
}
