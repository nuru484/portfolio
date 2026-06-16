import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import AboutMe from '@/components/AboutMe';
import Services from '@/components/Services';
import Skills from '@/components/Skills';
import TestimonialCarousel from '@/components/Testimonials';
import Footer from '@/components/Footer';
import projects from '@/data/projects';

export default function Home() {
  return (
    <div>
      <NavBar />
      <Hero />
      <div className="mb-12 md:mb-14">
        <div className="flex justify-between flex-wrap gap-4 max-w-6xl mx-auto px-6 md:px-12 md:pb-6 font-urbanist">
          <h1 className="text-4xl md:text-5xl font-medium">Recent Projects</h1>

          <Link
            href="/projects"
            className="px-8 py-4 border border-black rounded-full flex justify-center items-center gap-2 flex-nowrap hover:bg-gray-100 transition-colors duration-300"
          >
            View All
            <ArrowRight />
          </Link>
        </div>

        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
      <AboutMe />
      <Services />
      <Skills />
      <TestimonialCarousel />
      <Footer />
    </div>
  );
}
