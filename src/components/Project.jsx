import React from 'react';

const Project = ({
  title,
  description,
  technologies,
  imageUrl,
  demoUrl,
  codeUrl,
}) => {
  return (
    <div className="m-4 bg-white rounded-lg shadow-md overflow-hidden max-w-72 p-4 ">
      <div className="h-48 overflow-hidden rounded-md shadow-lg">
        {imageUrl && (
          <img
            src={`${imageUrl}`}
            alt="project screenshot"
            className="w-full h-full object-cover mx-auto "
          />
        )}
      </div>

      <div>
        <div className="py-5">
          <h3 className="text-xl font-bold mb-2 text-blue-600">{title}</h3>
          <p className="text-gray-700">{description}</p>

          <div className="mt-4">
            <span className="font-medium text-gray-700">Technologies:</span>
            <ul className="flex flex-wrap gap-2 mt-1">
              {technologies.map((tech, index) => (
                <li
                  key={index}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-2 py-1 rounded-full text-sm"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 flex gap-2 p-4">
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                Live Demo
              </button>
            </a>
          )}
          {codeUrl && (
            <a href={codeUrl} target="_blank" rel="noopener noreferrer">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm">
                View Code
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
