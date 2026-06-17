// src/components/home/AboutTeaser.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function AboutTeaser() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-12 mb-24 md:mb-32 font-urbanist flex flex-col gap-8">
      <p className="text-4xl lg:text-6xl font-medium leading-tight tracking-wide">
        From the database to the interface, I build the whole thing.
      </p>
      <p className="text-lg lg:w-3/4 text-muted-foreground leading-relaxed tracking-normal">
        I am a full-stack software developer specializing in the PERN stack
        (PostgreSQL, Express.js, React, and Node.js). With a versatile skill
        set, I thrive on learning new frameworks and programming languages
        quickly to tackle diverse challenges. My approach combines technical
        precision with a user-centric mindset to create scalable, reliable, and
        innovative applications that make an impact.
      </p>

      <div>
        <Link href="/about">
          <button className="bg-background text-foreground px-8 py-4 text-base font-medium rounded-full flex justify-center items-center gap-2 hover:bg-foreground border border-foreground hover:text-background transition-colors duration-500 ease-in-out">
            About Me
            <ArrowRight />
          </button>
        </Link>
      </div>
    </section>
  );
}
