import ProjectCard from '../components/ProjectCard';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const ProjectsPage = () => {
  const projects = [1, 2, 3, 4, 5];

  return (
    <div className="h-dvh">
      <NavBar />
      <div className="py-8 max-w-6xl mx-auto px-6 md:px-12 font-urbanist ">
        <h1 className="w-2/3 text-5xl lg:text-8xl font-medium leading-tight tracking-normal">
          Showcasing innovation and expertise
        </h1>
      </div>
      <div className="mb-20 md:mb-10">
        {projects.map((project) => (
          <ProjectCard styles={'static'} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
