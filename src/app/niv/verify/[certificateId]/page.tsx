// src/app/niv/verify/[certificateId]/page.tsx
import type { Metadata } from 'next';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { CertificateResult } from '@/components/certificates/CertificateResult';
import {
  normalizeCertificateId,
  verifyCertificate,
} from '@/lib/certificates/certificate-service';

interface PageProps {
  params: Promise<{ certificateId: string }>;
}

/**
 * Always render fresh. A revoked certificate must stop reading as valid the
 * moment it is revoked, and this page is low-traffic enough that caching buys
 * nothing worth that risk.
 */
export const dynamic = 'force-dynamic';

/**
 * Deliberately noindex.
 *
 * These pages carry the names of private individuals. The URL is meant to be
 * reached from a certificate someone is holding, not found by searching a
 * graduate's name, so the page must not become a public directory of the
 * cohort. `follow` stays on so the links out are still crawled.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { certificateId } = await params;
  const id = normalizeCertificateId(decodeURIComponent(certificateId));

  return {
    title: `Verify certificate ${id}`,
    description:
      'Check whether a certificate issued by MANURU is genuine, using the certificate ID printed on it.',
    robots: { index: false, follow: true },
  };
}

export default async function VerifyCertificatePage({ params }: PageProps) {
  const { certificateId } = await params;
  const decoded = decodeURIComponent(certificateId);
  const lookup = await verifyCertificate(decoded);

  return (
    <>
      <NavBar />
      <CertificateResult
        lookup={lookup}
        certificateId={normalizeCertificateId(decoded)}
      />
      <div className="pt-6">
        <Footer />
      </div>
    </>
  );
}
