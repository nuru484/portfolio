import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const AboutMe = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 mb-16 font-urbanist flex flex-col gap-8">
      <p className="text-4xl lg:text-6xl font-medium leading-tight tracking-wide">
        Empowering businesses with adaptable and efficient software solutions.
      </p>
      <p className="text-xl lg:text-2xl lg:w-3/4 text-gray-700 leading-normal tracking-wide">
        I am a full-stack software developer specializing in the PERN stack
        (PostgreSQL, Express.js, React, and Node.js). With a versatile skill
        set, I thrive on learning new frameworks and programming languages
        quickly to tackle diverse challenges. My approach combines technical
        precision with a user-centric mindset to create scalable, reliable, and
        innovative applications that make an impact.
      </p>

      <div>
        <Link href="/about">
          <button className="bg-white text-black px-8 py-4 text-xl font-medium rounded-full flex justify-center items-center gap-2 hover:bg-black border border-black hover:text-white transition-colors duration-500 ease-in-out">
            About Me
            <ArrowRight />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutMe;
