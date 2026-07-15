// src/components/home/RecentProjects.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { HomeProjectCard } from '@/components/home/HomeProjectCard';
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
    <div className="mt-8 first:mt-0">
      {/* Eyebrow-style group label. */}
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
        {heading}
      </h3>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 sm:gap-6">
        {projects.map((project) => (
          <HomeProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export async function RecentProjects() {
  const { client, side } = await getPublishedProjectsByType(PER_GROUP);

  if (client.length === 0 && side.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-12 mb-24 md:mb-32 font-urbanist">
      <div className="flex justify-between items-center flex-wrap gap-4 pb-6 md:pb-8">
        <h2 className="text-4xl md:text-5xl font-medium">Recent Projects</h2>

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <ProjectGroup heading="Client Projects" projects={client} />
      <ProjectGroup heading="Side Projects" projects={side} />
    </section>
  );
}
