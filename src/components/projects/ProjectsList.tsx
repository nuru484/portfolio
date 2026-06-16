// src/components/projects/ProjectsList.tsx
import { ProjectCard } from '@/components/projects/ProjectCard';
import projects from '@/static-data/projects';

export function ProjectsList() {
  return (
    <div className="h-dvh">
      <div className="pt-4 py-0 md:py-8 max-w-6xl mx-auto px-6 md:px-12 font-urbanist">
        <h1 className="w-2/3 text-5xl lg:text-8xl font-medium leading-tight tracking-normal">
          Building Solutions That Drive Innovation and Efficiency
        </h1>
      </div>
      <div className="mb-16 md:mb-10">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} styles="static" />
        ))}
      </div>
    </div>
  );
}
