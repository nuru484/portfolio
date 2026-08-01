// src/app/niv/verify/page.tsx
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Search } from 'lucide-react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { pageMetadata } from '@/lib/seo';
import { normalizeCertificateId } from '@/lib/certificates/certificate-service';

export const metadata: Metadata = pageMetadata({
  title: 'Verify a certificate',
  description:
    'Check whether a certificate issued by MANURU is genuine. Enter the certificate ID printed at the bottom of the certificate.',
  path: '/niv/verify',
});

interface PageProps {
  searchParams: Promise<{ code?: string }>;
}

export default async function VerifyLandingPage({ searchParams }: PageProps) {
  const { code } = await searchParams;

  // A plain GET form cannot target a path segment, so the submitted code
  // arrives as a query param and is forwarded to the canonical URL - the same
  // one printed on the certificate. Keeps the form working without JavaScript.
  const submitted = code ? normalizeCertificateId(code) : '';
  if (submitted) {
    redirect(`/niv/verify/${encodeURIComponent(submitted)}`);
  }

  return (
    <>
      <NavBar />
      <main className="mx-auto min-h-[60vh] w-full max-w-3xl px-4 py-10 sm:px-6 md:px-12 md:py-16">
        <h1 className="text-4xl font-medium leading-tight tracking-normal lg:text-6xl">
          Verify a certificate
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Certificates issued by MANURU carry an ID printed at the bottom of the
          certificate. Enter it here to check the credential against the issuing
          record.
        </p>

        <form action="/niv/verify" method="get" className="mt-8 max-w-md">
          <label
            htmlFor="code"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
          >
            Certificate ID
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-full border border-border px-4 py-2.5 transition-colors focus-within:border-foreground">
            <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <input
              id="code"
              name="code"
              type="text"
              required
              autoComplete="off"
              spellCheck={false}
              placeholder="NIV-2026-STEP-001"
              // 16px minimum: anything smaller makes iOS zoom the page on focus.
              className="w-full min-w-0 bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-foreground px-6 py-3 text-base font-medium text-background transition-opacity hover:opacity-90 active:opacity-80 sm:w-auto"
          >
            Verify certificate
          </button>
        </form>

        <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
          You can also go straight to the address printed on the certificate,
          for example{' '}
          <span className="font-mono text-foreground [overflow-wrap:anywhere]">
            manuru.dev/niv/verify/NIV-2026-STEP-001
          </span>
          .
        </p>
      </main>
      <div className="pt-6">
        <Footer />
      </div>
    </>
  );
}
