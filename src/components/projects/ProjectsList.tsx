// src/components/projects/ProjectsList.tsx
import { ProjectCard } from '@/components/projects/ProjectCard';
import { getPublishedProjects } from '@/lib/projects/project-service';

export async function ProjectsList() {
  const projects = await getPublishedProjects();

  return (
    <div className={projects.length ? 'h-auto' : 'h-dvh'}>
      <div className="pt-4 py-0 md:py-8 max-w-6xl mx-auto px-6 md:px-12 font-urbanist">
        <h1 className="w-2/3 text-5xl lg:text-8xl font-medium leading-tight tracking-normal">
          Building Solutions That Drive Innovation and Efficiency
        </h1>
      </div>

      {projects.length === 0 ? (
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 font-urbanist text-muted-foreground">
          Projects are coming soon.
        </div>
      ) : (
        <div className="mb-16 md:mb-10">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} styles="static" />
          ))}
        </div>
      )}
    </div>
  );
}
