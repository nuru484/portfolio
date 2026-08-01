// src/types/certificate.types.ts

/** Mirrors the Prisma `CertificateStatus` enum. */
export type CertificateStatus = 'VALID' | 'REVOKED';

/**
 * A credential as shown on the public verification page. Every field is a
 * copy of what the printed certificate says, so a verifier can compare the
 * page against the paper line by line.
 */
export interface ICertificate {
  certificateId: string;
  recipientName: string;
  programme: string;
  description: string;
  issuer: string;
  partner: string | null;
  projectName: string | null;
  location: string | null;
  periodStart: Date | null;
  periodEnd: Date | null;
  issueDate: Date;
  signatoryName: string;
  signatoryTitle: string;
  status: CertificateStatus;
  revokedReason: string | null;
  revokedAt: Date | null;
}

/**
 * The outcome of a lookup. `unknown` is deliberately distinct from `revoked`:
 * a code that was never issued and a code that was withdrawn are different
 * answers, and collapsing them would tell a verifier the wrong story.
 */
export type CertificateLookup =
  | { outcome: 'valid'; certificate: ICertificate }
  | { outcome: 'revoked'; certificate: ICertificate }
  | { outcome: 'unknown' };
