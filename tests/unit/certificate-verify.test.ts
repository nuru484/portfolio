import { describe, it, expect, vi, beforeEach } from 'vitest';

// The database is a network boundary - replace it so these tests exercise the
// lookup/normalisation logic only.
const findFirst = vi.fn();
vi.mock('@/lib/prisma', () => ({
  default: { certificate: { findFirst: (...args: unknown[]) => findFirst(...args) } },
  Prisma: {},
}));

import {
  normalizeCertificateId,
  verifyCertificate,
  formatCertificateDate,
} from '@/lib/certificates/certificate-service';

const record = {
  certificateId: 'NIV-2026-STEP-006',
  recipientName: 'ABDUL KADIR ISSAH',
  programme: 'Coding Training Programme',
  description: 'for successfully completing the Coding Training Programme.',
  issuer: 'MANURU',
  partner: 'NiV',
  projectName: 'Skills Training and Economic Prosperity (STEP) Project',
  location: 'Tamale, Ghana',
  periodStart: new Date('2026-02-01T00:00:00.000Z'),
  periodEnd: new Date('2026-07-31T00:00:00.000Z'),
  issueDate: new Date('2026-07-31T00:00:00.000Z'),
  signatoryName: 'Nurudeen Abdul-Majeed',
  signatoryTitle: 'Lead Instructor and Curriculum Developer',
  status: 'VALID' as const,
  revokedReason: null,
  revokedAt: null,
};

beforeEach(() => {
  findFirst.mockReset();
});

describe('normalizeCertificateId', () => {
  it('uppercases and trims what a verifier retypes from paper', () => {
    expect(normalizeCertificateId('  niv-2026-step-006 ')).toBe(
      'NIV-2026-STEP-006',
    );
  });
});

describe('verifyCertificate', () => {
  it('resolves an issued certificate as valid', async () => {
    findFirst.mockResolvedValue(record);

    const result = await verifyCertificate('NIV-2026-STEP-006');

    expect(result).toEqual({ outcome: 'valid', certificate: record });
  });

  it('matches regardless of the case the ID was typed in', async () => {
    findFirst.mockResolvedValue(record);

    await verifyCertificate('niv-2026-step-006');

    expect(findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { certificateId: 'NIV-2026-STEP-006' },
      }),
    );
  });

  it('reports a withdrawn certificate as revoked, not as unknown', async () => {
    // The distinction matters: "we withdrew this" and "this was never issued"
    // are different answers for whoever is holding the paper.
    findFirst.mockResolvedValue({ ...record, status: 'REVOKED' });

    const result = await verifyCertificate('NIV-2026-STEP-006');

    expect(result.outcome).toBe('revoked');
  });

  it('reports an ID that was never issued as unknown', async () => {
    findFirst.mockResolvedValue(null);

    expect(await verifyCertificate('NIV-2026-STEP-999')).toEqual({
      outcome: 'unknown',
    });
  });

  it('rejects junk without querying the database', async () => {
    expect(await verifyCertificate('   ')).toEqual({ outcome: 'unknown' });
    expect(await verifyCertificate('X'.repeat(61))).toEqual({
      outcome: 'unknown',
    });
    expect(findFirst).not.toHaveBeenCalled();
  });
});

describe('formatCertificateDate', () => {
  it('renders the stored day in UTC so it cannot drift by a timezone', () => {
    // Midnight UTC would be the previous day anywhere west of Greenwich.
    expect(formatCertificateDate(new Date('2026-07-31T00:00:00.000Z'))).toBe(
      '31 July 2026',
    );
  });
});
