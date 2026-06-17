// src/components/home/RecentProjects.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { getPublishedProjects } from '@/lib/projects/project-service';

export async function RecentProjects() {
  const projects = await getPublishedProjects(3);

  if (projects.length === 0) return null;

  return (
    <section className="mb-24 md:mb-32">
      <div className="flex justify-between flex-wrap gap-4 max-w-6xl mx-auto px-6 md:px-12 pb-6 md:pb-8 font-urbanist">
        <h1 className="text-4xl md:text-5xl font-medium">Recent Projects</h1>

        <Link
          href="/projects"
          className="px-8 py-4 text-base font-medium border border-foreground rounded-full flex justify-center items-center gap-2 flex-nowrap hover:bg-muted transition-colors duration-300"
        >
          View All
          <ArrowRight />
        </Link>
      </div>

      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </section>
  );
}
