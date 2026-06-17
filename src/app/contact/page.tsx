// src/app/contact/page.tsx
import type { Metadata } from 'next';
import { NavBar } from '@/components/NavBar';
import { ContactForm } from '@/components/contact/ContactForm';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Abdul-Majeed Nurudeen to discuss your next web or software project.',
};

export default function ContactPage() {
  return (
    <>
      <NavBar />
      <ContactForm />
      <Footer />
    </>
  );
}
