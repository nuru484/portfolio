// src/app/terms-of-service/page.tsx
import type { Metadata } from 'next';
import { NavBar } from '@/components/NavBar';
import { TermsOfService } from '@/components/legal/TermsOfService';
import { Footer } from '@/components/Footer';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Service',
  description:
    'The terms for using this portfolio site: content ownership, as-is blog writing, linked project demos, and acceptable use.',
  path: '/terms-of-service',
});

export default function TermsOfServicePage() {
  return (
    <>
      <NavBar />
      <TermsOfService />
      <div className="pt-6">
        <Footer />
      </div>
    </>
  );
}
