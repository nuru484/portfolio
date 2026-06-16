// src/app/about/page.tsx
import type { Metadata } from 'next';
import { NavBar } from '@/components/NavBar';
import { AboutContent } from '@/components/about/AboutContent';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Abdul-Majeed Nurudeen — a self-taught full-stack developer, his experience, and the services he offers.',
};

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <AboutContent />
      <div className="pt-6">
        <Footer />
      </div>
    </>
  );
}
