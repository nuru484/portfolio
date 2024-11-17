import React from 'react';

const Skills = () => {
  const skills = [
    { id: 1, name: 'PostgreSQL', src: '/PostgreSQL logo.png' },
    { id: 2, name: 'ExpressJs', src: '/expressjs logo.png' },
    { id: 3, name: 'ReactJs', src: '/react logo.png' },
    { id: 4, name: 'NodeJs', src: '/nodejs logo.jpg' },
    { id: 5, name: 'TailwindCSS', src: '/Tailwind_CSS_Logo.svg.png' },
  ];

  return (
    <div className="w-full overflow-hidden bg-white mb-16 flex flex-col gap-6">
      <div className="max-w-6xl px-6 md:px-12 font-urbanist">
        <h1 className="text-4xl md:text-5xl font-medium">Skills</h1>
      </div>
      <div className="relative w-full">
        <div className="animate-infinite-scroll flex">
          {skills.map((logo) => (
            <div key={logo.id} className="flex-shrink-0 px-4 lg:px-8">
              <div className="h-32 w-48 flex items-center justify-center bg-gray-50 rounded-lg">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-32 w-auto object-contain opacity-50"
                />
              </div>
            </div>
          ))}
          {/* Duplicate */}
          {skills.map((logo) => (
            <div
              key={`${logo.id}-duplicate`}
              className="flex-shrink-0 px-4 lg:px-8"
            >
              <div className="h-32 w-48 flex items-center justify-center bg-gray-50 rounded-lg">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-32 w-auto object-contain opacity-50"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const style = document.createElement('style');
style.textContent = `
  @keyframes infinite-scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }

  .animate-infinite-scroll {
    animation: infinite-scroll 20s linear infinite;
  }

  .animate-infinite-scroll:hover {
    animation-play-state: paused;
    cursor: pointer
  }
`;
document.head.appendChild(style);

export default Skills;
