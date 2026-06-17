// src/components/projects/ProjectsList.tsx
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Pagination } from '@/components/Pagination';
import { getPublishedProjectsPage } from '@/lib/projects/project-service';

const PAGE_SIZE = 5;

export async function ProjectsList({ page = 1 }: { page?: number }) {
  const { data: projects, pagination } = await getPublishedProjectsPage({
    page,
    limit: PAGE_SIZE,
  });

  return (
    <div className={projects.length ? 'h-auto' : 'h-dvh'}>
      <header className="py-12 md:py-20 max-w-6xl mx-auto px-6 md:px-12 font-urbanist">
        <h1 className="text-5xl lg:text-7xl font-medium leading-tight tracking-normal">
          Building Solutions That Drive Innovation and Efficiency
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
          A selection of full-stack projects — from real-time systems to
          API-driven web applications.
        </p>
      </header>

      {projects.length === 0 ? (
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 font-urbanist text-muted-foreground">
          Projects are coming soon.
        </div>
      ) : (
        <div className="mb-16 md:mb-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}

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
