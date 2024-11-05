const Hero = () => {
  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="py-20 bg-blue-600">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Hi, I'm Nurudeen
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            A full stack web developer with a strong math and algorithmic
            background, highly driven and well-versed in RESTful API
            architecture. Passionate about Web development and Software
            engineering. You can check my out the projects I have worked on or
            contact me
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#projects"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="border border-white text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
