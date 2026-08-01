// src/components/certificates/CertificateResult.tsx
import Link from 'next/link';
import { BadgeCheck, CircleAlert, SearchX } from 'lucide-react';
import { formatCertificateDate } from '@/lib/certificates/certificate-service';
import type { CertificateLookup, ICertificate } from '@/types/certificate.types';
import { cn } from '@/lib/utils';

/**
 * One line of the credential record. Label above value below the phone
 * breakpoint: a label-left/value-right row cannot hold a 200-char name at
 * 280px without the label hanging off its own line anyway.
 */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border/60 py-3 last:border-b-0 min-[520px]:flex-row min-[520px]:items-baseline min-[520px]:gap-4">
      <dt className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground min-[520px]:w-44">
        {label}
      </dt>
      <dd className="min-w-0 text-base text-foreground [overflow-wrap:anywhere]">
        {value}
      </dd>
    </div>
  );
}

/** Green tick / amber warning / neutral miss, with matching copy. */
function StatusBanner({
  outcome,
  certificateId,
}: {
  outcome: CertificateLookup['outcome'];
  certificateId: string;
}) {
  const config = {
    valid: {
      Icon: BadgeCheck,
      title: 'Verified certificate',
      body: 'This certificate was issued by MANURU and is genuine. The details below match the issued record.',
      tone: 'border-emerald-600/30 bg-emerald-600/10 text-emerald-700 dark:text-emerald-400',
    },
    revoked: {
      Icon: CircleAlert,
      title: 'Certificate revoked',
      body: 'This certificate was issued by MANURU but has since been withdrawn. It should not be treated as a valid credential.',
      tone: 'border-amber-600/30 bg-amber-600/10 text-amber-700 dark:text-amber-400',
    },
    unknown: {
      Icon: SearchX,
      title: 'No certificate found',
      body: 'No certificate with this ID has been issued. Check the ID against the printed copy - if it still does not resolve, the certificate is not genuine.',
      tone: 'border-border bg-muted/50 text-foreground',
    },
  }[outcome];

  const { Icon, title, body, tone } = config;

  return (
    <div className={cn('rounded-2xl border p-5 sm:p-6', tone)}>
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 size-6 shrink-0" aria-hidden />
        <div className="min-w-0">
          <h1 className="text-xl font-semibold sm:text-2xl">{title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-foreground/80 [overflow-wrap:anywhere]">
            {body}
          </p>
          <p className="mt-3 font-mono text-sm text-foreground/70 [overflow-wrap:anywhere]">
            {certificateId}
          </p>
        </div>
      </div>
    </div>
  );
}

function CertificateRecord({ certificate }: { certificate: ICertificate }) {
  const period =
    certificate.periodStart && certificate.periodEnd
      ? `${formatCertificateDate(certificate.periodStart)} to ${formatCertificateDate(certificate.periodEnd)}`
      : null;

  return (
    <section className="mt-8">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Credential record
      </h2>

      <dl className="mt-4 rounded-2xl border border-border bg-card px-4 sm:px-6">
        <Field label="Awarded to" value={certificate.recipientName} />
        <Field label="Programme" value={certificate.programme} />
        {certificate.projectName && (
          <Field label="Project" value={certificate.projectName} />
        )}
        <Field label="Issued by" value={certificate.issuer} />
        {certificate.partner && (
          <Field label="In partnership with" value={certificate.partner} />
        )}
        {period && <Field label="Programme period" value={period} />}
        {certificate.location && (
          <Field label="Location" value={certificate.location} />
        )}
        <Field
          label="Issue date"
          value={formatCertificateDate(certificate.issueDate)}
        />
        <Field
          label="Signed by"
          value={`${certificate.signatoryName}, ${certificate.signatoryTitle}`}
        />
        <Field label="Certificate ID" value={certificate.certificateId} />
      </dl>

      <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-5 sm:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Award
        </h3>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          {certificate.recipientName} {certificate.description}
        </p>
      </div>

      {certificate.status === 'REVOKED' && certificate.revokedReason && (
        <div className="mt-6 rounded-2xl border border-amber-600/30 bg-amber-600/10 p-5 sm:p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-400">
            Reason for revocation
          </h3>
          <p className="mt-3 text-base leading-relaxed text-foreground [overflow-wrap:anywhere]">
            {certificate.revokedReason}
          </p>
          {certificate.revokedAt && (
            <p className="mt-2 text-sm text-muted-foreground">
              Revoked on {formatCertificateDate(certificate.revokedAt)}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export function CertificateResult({
  lookup,
  certificateId,
}: {
  lookup: CertificateLookup;
  certificateId: string;
}) {
  return (
    <main className="mx-auto min-h-[60vh] w-full max-w-3xl px-4 py-10 sm:px-6 md:px-12 md:py-16">
      <StatusBanner outcome={lookup.outcome} certificateId={certificateId} />

      {lookup.outcome === 'unknown' ? (
        <p className="mt-8 text-base leading-relaxed text-muted-foreground">
          Certificate IDs look like{' '}
          <span className="font-mono text-foreground">NIV-2026-STEP-001</span>{' '}
          and are printed at the bottom of the certificate.{' '}
          <Link
            href="/niv/verify"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Check another ID
          </Link>
          .
        </p>
      ) : (
        <CertificateRecord certificate={lookup.certificate} />
      )}

      <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
        Verification is served directly from the issuing record.{' '}
        <Link
          href="/contact"
          className="font-medium text-foreground underline underline-offset-4"
        >
          Contact the issuer
        </Link>{' '}
        if anything here does not match the certificate you are holding.
      </p>
    </main>
  );
}
