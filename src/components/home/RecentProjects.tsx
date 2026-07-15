// src/components/home/RecentProjects.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { getPublishedProjectsByType } from '@/lib/projects/project-service';
import type { IProject } from '@/types/project.types';

/** Most-recent projects shown per group on the homepage teaser. */
const PER_GROUP = 2;

function ProjectGroup({
  heading,
  projects,
}: {
  heading: string;
  projects: IProject[];
}) {
  if (projects.length === 0) return null;

  return (
    <div className="mt-4 md:mt-6">
      <h3 className="max-w-6xl mx-auto px-6 md:px-12 font-urbanist text-2xl md:text-3xl font-medium text-muted-foreground">
        {heading}
      </h3>
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}

export async function RecentProjects() {
  const { client, side } = await getPublishedProjectsByType(PER_GROUP);

  if (client.length === 0 && side.length === 0) return null;

  return (
    <section className="mb-24 md:mb-32">
      <div className="flex justify-between flex-wrap gap-4 max-w-6xl mx-auto px-6 md:px-12 pb-2 font-urbanist">
        <h2 className="text-4xl md:text-5xl font-medium">Recent Projects</h2>

        <Link
          href="/projects"
          className="px-8 py-4 text-base font-medium border border-foreground rounded-full flex justify-center items-center gap-2 flex-nowrap hover:bg-muted transition-colors duration-300"
        >
          View All
          <ArrowRight />
        </Link>
      </div>

      <ProjectGroup heading="Client Projects" projects={client} />
      <ProjectGroup heading="Side Projects" projects={side} />
    </section>
  );
}
