// src/app/page.tsx
import type { Metadata } from 'next';
import { NavBar } from '@/components/NavBar';
import { Hero } from '@/components/home/Hero';
import { RecentProjects } from '@/components/home/RecentProjects';
import { AboutTeaser } from '@/components/home/AboutTeaser';
import { Services } from '@/components/home/Services';
import { Skills } from '@/components/home/Skills';
import { Testimonials } from '@/components/home/Testimonials';
import { Footer } from '@/components/Footer';
import { pageMetadata } from '@/lib/seo';
import { SITE } from '@/config/constants';

export const metadata: Metadata = pageMetadata({
  title: SITE.title,
  absoluteTitle: true,
  description:
    'Abdul-Majeed Nurudeen is a full-stack software developer building fast, reliable web applications with the PERN stack — PostgreSQL, Express, React, and Node.js. Explore projects, services, and writing.',
  path: '/',
  image: '/og/og-home.png',
});

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <RecentProjects />
      <AboutTeaser />
      <Services />
      <Skills />
      <Testimonials />
      <Footer />
    </>
  );
}
