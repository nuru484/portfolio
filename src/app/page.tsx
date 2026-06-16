// src/app/page.tsx
import { NavBar } from '@/components/NavBar';
import { Hero } from '@/components/home/Hero';
import { RecentProjects } from '@/components/home/RecentProjects';
import { AboutTeaser } from '@/components/home/AboutTeaser';
import { Services } from '@/components/home/Services';
import { Skills } from '@/components/home/Skills';
import { Testimonials } from '@/components/home/Testimonials';
import { Footer } from '@/components/Footer';

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
