// src/app/about/page.tsx
import type { Metadata } from 'next';
import { NavBar } from '@/components/NavBar';
import { AboutContent } from '@/components/about/AboutContent';
import { Footer } from '@/components/Footer';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'Self-taught full-stack developer working with the PERN stack — the services I offer and how I approach building software.',
  path: '/about',
});

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
