import React from 'react';

const ProjectCard = () => {
  return (
    <div className="h-dvh sticky top-8 max-w-6xl mx-auto px-6 md:px-12">
      <div className="relative hidden md:block h-3/4 bg-slate-200 mx-auto m-8 shadow-md rounded-xl overflow-hidden">
        <img
          src="/projectImages/blog site desktop.jpg"
          alt="Project"
          className="w-full h-full object-cover"
        />

        <p className="absolute bottom-4 left-4 z-10 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
          Project Name
        </p>
      </div>

      <div className="relative md:hidden h-3/4 bg-slate-200 mx-auto m-8 shadow-md rounded-xl overflow-hidden">
        <img
          src="/projectImages/blog site phone.jpg"
          alt="Project"
          className="w-full h-full object-cover"
        />
        <p className="absolute bottom-4 left-4 z-10 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
          Project Name
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
