// src/app/contact/page.tsx
import type { Metadata } from 'next';
import { NavBar } from '@/components/NavBar';
import { ContactForm } from '@/components/contact/ContactForm';
import { Footer } from '@/components/Footer';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Get in touch with Abdul-Majeed Nurudeen to discuss your next web or software project — new builds, improvements, or a quick consultation.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <NavBar />
      <ContactForm />
      <Footer />
    </>
  );
}
