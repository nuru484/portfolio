// src/components/projects/ProjectsList.tsx
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Pagination } from '@/components/Pagination';
import { ProjectTabs, PROJECT_TABS } from '@/components/projects/ProjectTabs';
import { projectsHref } from '@/utils/projects-href';
import {
  getPublishedProjectCounts,
  getPublishedProjectsPageByType,
} from '@/lib/projects/project-service';
import type { ProjectType } from '@/types/project.types';

const PAGE_SIZE = 6;

export async function ProjectsList({
  tab,
  page = 1,
}: {
  tab: ProjectType;
  page?: number;
}) {
  const [{ data: projects, pagination }, counts] = await Promise.all([
    getPublishedProjectsPageByType(tab, { page, limit: PAGE_SIZE }),
    getPublishedProjectCounts(),
  ]);

  const { blurb } = PROJECT_TABS.find((t) => t.type === tab)!;
  const isEmpty = projects.length === 0;

  return (
    <div className={isEmpty ? 'min-h-dvh' : 'h-auto'}>
      <header className="py-12 md:py-20 max-w-6xl mx-auto px-6 md:px-12 font-urbanist">
        <h1 className="text-5xl lg:text-7xl font-medium leading-tight tracking-normal">
          Projects
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
          A selection of full-stack projects - client work and personal builds,
          from real-time systems to API-driven web applications.
        </p>
      </header>

      <ProjectTabs active={tab} counts={counts} />

      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-6 font-urbanist">
        <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
          {blurb}
        </p>
      </div>

      {isEmpty ? (
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 font-urbanist text-muted-foreground">
          {page > 1
            ? 'Nothing on this page.'
            : 'Projects are coming soon.'}
        </div>
      ) : (
        <div className="mb-16 md:mb-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}

          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            hrefFor={(p) => projectsHref(tab, p)}
          />
        </div>
      )}
    </div>
  );
}
