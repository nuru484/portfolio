import ProjectCard from '../components/ProjectCard';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import projects from '../data/projects';

const ProjectsPage = () => {
  return (
    <div className="h-dvh">
      <NavBar />
      <div className="pt-4 py-0 md:py-8 max-w-6xl mx-auto px-6 md:px-12 font-urbanist ">
        <h1 className="w-2/3 text-5xl lg:text-8xl font-medium leading-tight tracking-normal">
          Building Solutions That Drive Innovation and Efficiency
        </h1>
      </div>
      <div className="mb-16 md:mb-10">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
