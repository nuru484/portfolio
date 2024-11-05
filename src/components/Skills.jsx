const Skills = () => {
  return (
    <div>
      {/* Skills Section */}
      <section id="skills" className="py-20 bg-blue-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              'JavaScript',
              'React',
              'Node.js',
              'Python',
              'SQL',
              'Git',
              'AWS',
              'Docker',
            ].map((skill) => (
              <div
                key={skill}
                className="bg-white p-6 rounded-lg shadow-sm text-center"
              >
                <h3 className="text-lg font-semibold text-gray-800">{skill}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;
