import NavBar from './components/NavBar';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import AboutMe from './components/AboutMe';
import Services from './components/Services';
import Skills from './components/Skills';
import TestimonialCarousel from './components/testimonials';
import Footer from './components/Footer';

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const App = () => {
  const projects = [1, 2, 3];
  return (
    <div>
      <NavBar />
      <Hero />
      <div className="mb-14 md:mb-12">
        <div className="flex justify-between flex-wrap gap-4 max-w-6xl mx-auto px-6 md:px-12 font-urbanist">
          <h1 className="text-4xl md:text-5xl font-medium">Recent Projects</h1>

          <Link
            to={'projects'}
            className="px-8 py-4 border border-black rounded-full flex justify-center items-center gap-2 flex-nowrap hover:bg-gray-100 transition-colors duration-300"
          >
            View All
            <ArrowRight />
          </Link>
        </div>

        {projects.map((project) => (
          <ProjectCard />
        ))}
      </div>
      <AboutMe />
      <Services />
      <Skills />
      <TestimonialCarousel />
      <Footer />
    </div>
  );
};

export default App;
