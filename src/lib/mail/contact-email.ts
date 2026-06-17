// src/lib/mail/contact-email.ts
import 'server-only';
import { ENV } from '@/config/env';
import logger from '@/utils/logger';
import { getTransporter } from './transporter';
import { CONTACT, SITE } from '@/config/constants';
import type { IContactInput } from '@/validations/contact-validation';

const BRAND = 'Nurudeen Abdul-Majeed';
const TAGLINE = 'Full-Stack Software Developer';

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Wraps body HTML in a consistent, branded email shell. */
function shell(bodyHtml: string): string {
  return `
  <div style="background:#f5f5f5;padding:24px;font-family:'Segoe UI',system-ui,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #ececec;border-radius:14px;overflow:hidden;">
      <div style="background:#111111;color:#ffffff;padding:22px 28px;">
        <p style="margin:0;font-size:18px;font-weight:600;letter-spacing:-0.01em;">${BRAND}</p>
        <p style="margin:4px 0 0;font-size:12px;color:#b5b5b5;">${TAGLINE}</p>
      </div>
      <div style="padding:28px;color:#1d1d1d;font-size:14px;line-height:1.65;">${bodyHtml}</div>
      <div style="padding:18px 28px;border-top:1px solid #ececec;font-size:12px;color:#8a8a8a;">
        <p style="margin:0;">${BRAND} · <a href="mailto:${CONTACT.email}" style="color:#8a8a8a;">${CONTACT.email}</a></p>
        <p style="margin:6px 0 0;"><a href="${SITE.url}" style="color:#8a8a8a;">${SITE.url}</a></p>
      </div>
    </div>
  </div>`;
}

function fromHeader(): string {
  return `"${BRAND}" <${ENV.GMAIL_USER ?? CONTACT.email}>`;
}

/**
 * Notifies the site owner of a new inquiry AND sends the visitor a branded
 * acknowledgement that their message was received.
 */
export async function sendContactEmail(input: IContactInput): Promise<void> {
  const ownerTo = ENV.GMAIL_USER ?? CONTACT.email;

  const rows: [string, string | undefined][] = [
    ['Name', input.name],
    ['Email', input.email],
    ['Phone', input.phone],
    ['Company', input.companyName],
    ['Website', input.companyWebsite],
    ['Budget', input.budget],
    ['Exact budget', input.exactBudget],
    ['Timeline', input.timeline],
  ];
  const detailRows = rows
    .filter(([, v]) => v)
    .map(
      ([label, v]) =>
        `<tr><td style="padding:4px 14px 4px 0;color:#777;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:4px 0;">${escapeHtml(v as string)}</td></tr>`,
    )
    .join('');

  const ownerHtml = shell(`
    <h2 style="margin:0 0 16px;font-size:18px;">New project inquiry</h2>
    <table style="border-collapse:collapse;font-size:14px;width:100%;">${detailRows}</table>
    <h3 style="margin:24px 0 8px;font-size:14px;color:#777;text-transform:uppercase;letter-spacing:0.04em;">Message</h3>
    <p style="white-space:pre-wrap;margin:0;">${escapeHtml(input.message)}</p>
  `);

  const confirmHtml = shell(`
    <h2 style="margin:0 0 12px;font-size:18px;">Thanks for reaching out, ${escapeHtml(input.name.split(' ')[0])}!</h2>
    <p style="margin:0 0 14px;">
      I've received your message and will get back to you as soon as I can —
      usually within a day or two. Here's a copy of what you sent:
    </p>
    <blockquote style="margin:0;padding:12px 16px;border-left:3px solid #111;background:#fafafa;white-space:pre-wrap;border-radius:0 8px 8px 0;">${escapeHtml(input.message)}</blockquote>
    <p style="margin:16px 0 0;">Talk soon,<br/>${BRAND}</p>
  `);

  const transporter = getTransporter();
  if (!transporter) {
    logger.info(
      `\n──────── DEV EMAIL (no SMTP configured) ────────\nOwner → ${ownerTo}: New project inquiry from ${input.name}\nVisitor → ${input.email}: We received your message\n────────────────────────────────────────────────\n`,
    );
    return;
  }

  // Owner notification — reply-to the visitor so a reply goes straight to them.
  await transporter.sendMail({
    from: fromHeader(),
    to: ownerTo,
    replyTo: `"${input.name}" <${input.email}>`,
    subject: `New project inquiry from ${input.name}`,
    html: ownerHtml,
  });

  // Visitor acknowledgement. Best-effort: never fail the request over it.
  try {
    await transporter.sendMail({
      from: fromHeader(),
      to: input.email,
      subject: `Thanks for reaching out — ${BRAND}`,
      html: confirmHtml,
    });
  } catch (error) {
    logger.error({ error }, 'Failed to send contact acknowledgement email');
  }
}
