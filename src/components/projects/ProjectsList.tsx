// src/components/projects/ProjectsList.tsx
import { ProjectCard } from '@/components/projects/ProjectCard';
import { getPublishedProjectsByType } from '@/lib/projects/project-service';
import type { IProject } from '@/types/project.types';

function ProjectGroup({
  heading,
  blurb,
  projects,
}: {
  heading: string;
  blurb: string;
  projects: IProject[];
}) {
  if (projects.length === 0) return null;

  return (
    <section className="mb-12 md:mb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12 font-urbanist">
        {/* Caps eyebrow style, matching the homepage group labels. */}
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
          {heading}
        </h2>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {blurb}
        </p>
      </div>

      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </section>
  );
}

export async function ProjectsList() {
  const { client, side } = await getPublishedProjectsByType();
  const isEmpty = client.length === 0 && side.length === 0;

  return (
    <div className={isEmpty ? 'h-dvh' : 'h-auto'}>
      <header className="py-12 md:py-20 max-w-6xl mx-auto px-6 md:px-12 font-urbanist">
        <h1 className="text-5xl lg:text-7xl font-medium leading-tight tracking-normal">
          Projects
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
          A selection of full-stack projects — client work and personal builds,
          from real-time systems to API-driven web applications.
        </p>
      </header>

      {isEmpty ? (
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 font-urbanist text-muted-foreground">
          Projects are coming soon.
        </div>
      ) : (
        <div className="mb-16 md:mb-10">
          <ProjectGroup
            heading="Client Projects"
            blurb="Production systems built for real businesses."
            projects={client}
          />
          <ProjectGroup
            heading="Side Projects"
            blurb="Personal builds — experiments, tools, and things I wanted to exist."
            projects={side}
          />
        </div>
      )}
    </div>
  );
}
