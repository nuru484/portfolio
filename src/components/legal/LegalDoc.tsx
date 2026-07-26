// src/components/legal/LegalDoc.tsx
// Shared wrapper and type scale for the legal documents (/privacy-policy and
// /terms-of-service), so both pages stay on one visual system. Server
// components: the documents are static prose and ship no JS of their own.
import type { ReactNode } from 'react';
import Link from 'next/link';

interface LegalDocProps {
  title: string;
  lastUpdated: string;
  crossLink: { href: string; label: string };
  children: ReactNode;
}

export function LegalDoc({
  title,
  lastUpdated,
  crossLink,
  children,
}: LegalDocProps) {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-12 font-urbanist">
      <section className="py-12 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Legal
        </p>
        <h1 className="mt-3 text-4xl lg:text-5xl font-medium leading-tight tracking-normal">
          {title}
        </h1>
        <p className="mt-3 mb-10 text-muted-foreground">
          <span className="font-medium text-foreground">Last updated:</span>{' '}
          {lastUpdated}
        </p>

        {children}

        <div className="mt-14 border-t border-border pt-6 text-muted-foreground">
          <p>
            See also the{' '}
            <Link
              href={crossLink.href}
              className="font-medium text-foreground underline underline-offset-4"
            >
              {crossLink.label}
            </Link>
            , or{' '}
            <Link
              href="/"
              className="font-medium text-foreground underline underline-offset-4"
            >
              return home
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

/** A numbered document section with consistent spacing. */
export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-2xl font-medium">{title}</h2>
      {children}
    </section>
  );
}

/** Body paragraph on the documents' shared type style. */
export function LegalText({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-lg leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}

/** Bulleted list on the documents' shared type style. */
export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mb-3 ml-5 list-disc space-y-2 text-lg leading-relaxed text-muted-foreground">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

/** Inline emphasis that reads as a label inside muted body text. */
export function LegalStrong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>;
}

/** Inline link with the documents' shared link treatment. */
export function LegalLink({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  const className =
    'font-medium text-foreground underline underline-offset-4';
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
