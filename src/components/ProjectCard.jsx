import { Github, Globe, ArrowUpRight } from 'lucide-react';

const ProjectCard = ({
  title = 'Blog Application with API-Driven Architecture',
  description = 'Built a full-stack blog application with a RESTful API backend using Node.js, Express, and Prisma. Developed two front-ends: one for readers to view and comment on posts, and another for authors to manage content. Secured routes with JWT authentication and implemented features like unpublished posts, rich text editing, and comment moderation.',
  technologies = ['React', 'Tailwind CSS', 'Node.js', 'Prisma'],
  desktopImage = '/projectImages/blog site desktop.jpg',
  mobileImage = '/projectImages/blog site phone.jpg',
  githubUrl = 'https://github.com/nuru484/blog-api-backend',
  liveUrl = 'https://blog-api-frontend-blue.vercel.app/',
  styles = 'sticky top-8',
}) => {
  return (
    <div
      style={{ height: 'clamp(32rem, 90vw, 33rem)' }}
      className={`${styles} max-w-6xl mx-auto px-6 md:px-12 pb-4 md:pb-8 font-urbanist`}
    >
      {/* Desktop Version */}
      <div className="relative h-full hidden md:block  bg-slate-200 mx-auto shadow-xl rounded-xl overflow-hidden group">
        <img
          src={desktopImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
          {/* Top section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
            <p className="text-gray-300 mb-4">{description}</p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom section */}
          <div className="flex gap-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300"
            >
              <Github className="w-4 h-4" />
              View Code
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300"
            >
              <Globe className="w-4 h-4" />
              Live Demo
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="relative md:hidden h-full bg-slate-200 mx-auto m-8 shadow-xl rounded-xl overflow-hidden">
        <img
          src={mobileImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs text-white"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1 bg-white text-black rounded-full text-sm hover:bg-gray-200 transition-colors duration-300"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1 bg-white text-black rounded-full text-sm hover:bg-gray-200 transition-colors duration-300"
            >
              <Globe className="w-4 h-4" />
              Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
