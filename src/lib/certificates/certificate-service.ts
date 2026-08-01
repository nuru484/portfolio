// src/lib/certificates/certificate-service.ts
import 'server-only';
import prisma, { Prisma } from '@/lib/prisma';
import type { CertificateLookup } from '@/types/certificate.types';

const certificateSelect = {
  certificateId: true,
  recipientName: true,
  programme: true,
  description: true,
  issuer: true,
  partner: true,
  projectName: true,
  location: true,
  periodStart: true,
  periodEnd: true,
  issueDate: true,
  signatoryName: true,
  signatoryTitle: true,
  status: true,
  revokedReason: true,
  revokedAt: true,
} satisfies Prisma.CertificateSelect;

/** Matches the `certificateId` column width; anything longer cannot exist. */
const MAX_ID_LENGTH = 60;

/**
 * Canonical form of a certificate code.
 *
 * IDs are printed uppercase, but a verifier retyping one from paper may use
 * any case and will often paste surrounding whitespace, so both are absorbed
 * here rather than turning an honest typo into "not found".
 */
export function normalizeCertificateId(raw: string): string {
  return raw.trim().toUpperCase();
}

/**
 * Resolves a certificate code to a verification outcome.
 *
 * An over-long or empty code short-circuits to `unknown` without touching the
 * database - the route is public and unauthenticated, so a junk path segment
 * must not cost a query.
 */
export async function verifyCertificate(
  rawId: string,
): Promise<CertificateLookup> {
  const certificateId = normalizeCertificateId(rawId);
  if (!certificateId || certificateId.length > MAX_ID_LENGTH) {
    return { outcome: 'unknown' };
  }

  // findFirst (not findUnique) so the soft-delete extension applies: an
  // archived record must read as unknown rather than resolving.
  const certificate = await prisma.certificate.findFirst({
    where: { certificateId },
    select: certificateSelect,
  });

  if (!certificate) return { outcome: 'unknown' };

  return certificate.status === 'REVOKED'
    ? { outcome: 'revoked', certificate }
    : { outcome: 'valid', certificate };
}

/**
 * Formats a stored date for display.
 *
 * Forced to UTC: the column is a bare date, so letting the server's local
 * timezone interpret it could render "31 July" as "30 July" west of UTC.
 */
export function formatCertificateDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
