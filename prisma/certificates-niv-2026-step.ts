/**
 * The NiV / STEP coding cohort, February to July 2026.
 *
 * Transcribed from the issued certificates. Names are stored exactly as they
 * are printed, including capitalisation, so the verification page and the
 * paper copy can be compared character for character. IDs are permanent and
 * must never be renumbered - they are printed on certificates already handed
 * out, and each one is the URL a verifier will visit.
 */

const PROGRAMME = 'Coding Training Programme';
const ISSUER = 'MANURU';
const PARTNER = 'NiV';
const PROJECT_NAME = 'Skills Training and Economic Prosperity (STEP) Project';
const LOCATION = 'Tamale, Ghana';
const SIGNATORY_NAME = 'Nurudeen Abdul-Majeed';
const SIGNATORY_TITLE = 'Lead Instructor and Curriculum Developer';

/** The award paragraph, copied verbatim from the printed certificate. */
const DESCRIPTION =
  'for successfully completing the Coding Training Programme, delivered by ' +
  'MANURU in partnership with NiV under the Skills Training and Economic ' +
  'Prosperity (STEP) Project, covering computing and internet fundamentals, ' +
  'the Linux environment and command line, browser developer tools, HTML, ' +
  'CSS, JavaScript, and APIs, together with practical project work.';

// Bare dates (no time): the columns are @db.Date and every render forces UTC,
// so the displayed day cannot drift with the server's timezone.
const PERIOD_START = new Date('2026-02-01T00:00:00.000Z');
const PERIOD_END = new Date('2026-07-31T00:00:00.000Z');
const ISSUE_DATE = new Date('2026-07-31T00:00:00.000Z');

const RECIPIENTS: { certificateId: string; recipientName: string }[] = [
  { certificateId: 'NIV-2026-STEP-001', recipientName: 'MOHAMMED TIJANI' },
  { certificateId: 'NIV-2026-STEP-002', recipientName: 'ELVIS NYAMEKYE' },
  { certificateId: 'NIV-2026-STEP-003', recipientName: 'YAHAYA HADIJA' },
  { certificateId: 'NIV-2026-STEP-004', recipientName: 'ZAKARIA ZAINAB NABIA' },
  { certificateId: 'NIV-2026-STEP-005', recipientName: 'YUSSIF RUHIYA ANTO' },
  { certificateId: 'NIV-2026-STEP-006', recipientName: 'ABDUL KADIR ISSAH' },
  { certificateId: 'NIV-2026-STEP-007', recipientName: 'ASANA ALHASSAN' },
  { certificateId: 'NIV-2026-STEP-008', recipientName: 'IDDRISU TOFIK' },
  { certificateId: 'NIV-2026-STEP-009', recipientName: 'IDDRISU SAYIBU' },
];

export const NIV_2026_STEP_CERTIFICATES = RECIPIENTS.map((recipient) => ({
  ...recipient,
  programme: PROGRAMME,
  description: DESCRIPTION,
  issuer: ISSUER,
  partner: PARTNER,
  projectName: PROJECT_NAME,
  location: LOCATION,
  periodStart: PERIOD_START,
  periodEnd: PERIOD_END,
  issueDate: ISSUE_DATE,
  signatoryName: SIGNATORY_NAME,
  signatoryTitle: SIGNATORY_TITLE,
}));
