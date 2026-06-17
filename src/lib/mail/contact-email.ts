// src/lib/mail/contact-email.ts
import 'server-only';
import { ENV } from '@/config/env';
import logger from '@/utils/logger';
import { getTransporter } from './transporter';
import { CONTACT } from '@/config/constants';
import type { IContactInput } from '@/validations/contact-validation';

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Sends a contact-form submission to the site owner (reply-to = the sender). */
export async function sendContactEmail(input: IContactInput): Promise<void> {
  const to = ENV.GMAIL_USER ?? CONTACT.email;

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
        `<tr><td style="padding:4px 12px 4px 0;color:#666;white-space:nowrap;">${label}</td><td style="padding:4px 0;">${escapeHtml(v as string)}</td></tr>`,
    )
    .join('');

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="margin:0 0 16px;">New project inquiry</h2>
      <table style="border-collapse:collapse;font-size:14px;">${detailRows}</table>
      <h3 style="margin:24px 0 8px;">Message</h3>
      <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;">${escapeHtml(input.message)}</p>
    </div>`;

  const devConsole = [
    ...rows.filter(([, v]) => v).map(([l, v]) => `${l}: ${v}`),
    '',
    'Message:',
    input.message,
  ].join('\n');

  const transporter = getTransporter();
  if (!transporter) {
    logger.info(
      `\n──────── DEV EMAIL (no SMTP configured) ────────\nTo: ${to}\nSubject: New project inquiry from ${input.name}\n${devConsole}\n────────────────────────────────────────────────\n`,
    );
    return;
  }

  await transporter.sendMail({
    from: `"${ENV.EMAIL_FROM_NAME}" <${ENV.GMAIL_USER}>`,
    to,
    replyTo: `"${input.name}" <${input.email}>`,
    subject: `New project inquiry from ${input.name}`,
    html,
  });
}
