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
        <Link
          href="/about"
          className="inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
        >
          About Me
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
