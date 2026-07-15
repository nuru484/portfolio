// src/components/projects/ProjectsList.tsx
import { Fragment } from 'react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Pagination } from '@/components/Pagination';
import { getPublishedProjectsPage } from '@/lib/projects/project-service';
import type { ProjectType } from '@/types/project.types';

const PAGE_SIZE = 6;

const GROUPS: Record<ProjectType, { heading: string; blurb: string }> = {
  CLIENT: {
    heading: 'Client Projects',
    blurb: 'Production systems built for real businesses.',
  },
  SIDE: {
    heading: 'Side Projects',
    blurb: 'Personal builds — experiments, tools, and things I wanted to exist.',
  },
};

function GroupHeading({ type }: { type: ProjectType }) {
  const { heading, blurb } = GROUPS[type];
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 pt-6 first:pt-0 font-urbanist">
      {/* Caps eyebrow style, matching the homepage group labels. */}
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
        {heading}
      </h2>
      <p className="mt-2 text-lg text-muted-foreground max-w-2xl leading-relaxed">
        {blurb}
      </p>
    </div>
  );
}

export async function ProjectsList({ page = 1 }: { page?: number }) {
  const { data: projects, pagination } = await getPublishedProjectsPage({
    page,
    limit: PAGE_SIZE,
  });

  return (
    <div className={projects.length ? 'h-auto' : 'h-dvh'}>
      <header className="py-12 md:py-20 max-w-6xl mx-auto px-6 md:px-12 font-urbanist">
        <h1 className="text-5xl lg:text-7xl font-medium leading-tight tracking-normal">
          Projects
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
          A selection of full-stack projects — client work and personal builds,
          from real-time systems to API-driven web applications.
        </p>
      </header>

      {projects.length === 0 ? (
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 font-urbanist text-muted-foreground">
          Projects are coming soon.
        </div>
      ) : (
        <div className="mb-16 md:mb-10">
          {projects.map((project, i) => {
            // Projects arrive client-first, so a heading is emitted whenever
            // the type changes — each page shows only the groups it contains.
            const showHeading =
              i === 0 || projects[i - 1].projectType !== project.projectType;
            return (
              <Fragment key={project.id}>
                {showHeading && <GroupHeading type={project.projectType} />}
                <ProjectCard project={project} index={i} />
              </Fragment>
            );
          })}

          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            hrefFor={(p) => (p === 1 ? '/projects' : `/projects?page=${p}`)}
          />
        </div>
      )}
    </div>
  );
}
