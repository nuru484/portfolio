import Project from '../components/Project';

const Projects = () => {
  const projects = [1, 2, 3, 4]; // Array of project identifiers
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 m-8">
      {projects.map((p) => (
        <>
          <Project
            title="Blog Site"
            description="A fullstack blog site with admin dashboard to create and update posts, built with the PERN stack"
            technologies={['PostgreSQL', 'Express', 'NodeJs', 'React']}
            imageUrl="src/assets/projectImages/blog.png"
            demoUrl="https://blog-api-frontend-blue.vercel.app/"
            codeUrl="https://github.com/nuru484/blog-api-backend"
          />
        </>
      ))}
    </div>
  );
};

export default Projects;
