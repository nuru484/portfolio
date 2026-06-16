import type { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import ContactForm from '@/components/ContactForm';
import { BottomBar } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Abdul-Majeed Nurudeen to discuss your next web or software project.',
};

export default function ContactPage() {
  return (
    <div>
      <NavBar />
      <div className="bg-gray-100">
        <ContactForm />
      </div>
      <BottomBar />
    </div>
  );
}
