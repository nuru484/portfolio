import Project from '../components/Project';

const Projects = () => {
  const projects = [1, 2, 3]; // Array of project identifiers
  return (
    <div id="projects" className="max-w-6xl mx-auto">
      <div className="flex justify-center items-center flex-col py-4 border-b border-gray-300">
        <h1 className="text-3xl font-bold text-blue-600 p-2">
          Featured Projects
        </h1>
        <p className="text-center">
          Below are some recents projects I have worked on, you can click view
          more to see all the projects I have worked
        </p>
      </div>

      <div className="flex flex-wrap justify-center">
        {projects.map((p) => (
          <Project
            title="Blog Site"
            description="A fullstack blog site with admin dashboard to create and update posts, built with the PERN stack"
            technologies={['PostgreSQL', 'Express', 'NodeJs', 'React']}
            imageUrl="src/assets/projectImages/blog.png"
            demoUrl="https://blog-api-frontend-blue.vercel.app/"
            codeUrl="https://github.com/nuru484/blog-api-backend"
          />
        ))}
      </div>

      <div className=" mb-8  text-center">
        <button className="py-2 px-8 text-white bg-blue-600 mb-6 mt-2">
          View More
        </button>
      </div>
    </div>
  );
};

export default Projects;
