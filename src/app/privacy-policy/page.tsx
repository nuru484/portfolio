// src/app/privacy-policy/page.tsx
import type { Metadata } from 'next';
import { NavBar } from '@/components/NavBar';
import { PrivacyPolicy } from '@/components/legal/PrivacyPolicy';
import { Footer } from '@/components/Footer';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'What this portfolio site collects about visitors (very little), how the contact form and analytics work, and how to reach me about your data.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <NavBar />
      <main id="main">
        <PrivacyPolicy />
      </main>
      <div className="pt-6">
        <Footer />
      </div>
    </>
  );
}
