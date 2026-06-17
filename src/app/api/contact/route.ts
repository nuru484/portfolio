// src/app/api/contact/route.ts
import type { NextRequest } from 'next/server';
import { contactSchema } from '@/validations/contact-validation';
import { sendContactEmail } from '@/lib/mail/contact-email';
import { ratelimit } from '@/lib/rate-limit';
import { successResponse, handleApiError } from '@/utils/api-response';
import { TooManyRequestsError } from '@/middlewares/error-handler';

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  return fwd?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot: real users never fill this hidden field. Pretend success so
    // bots get no signal, but never send anything.
    if (typeof body?.honeypot === 'string' && body.honeypot.trim() !== '') {
      return successResponse(null, "Thanks for reaching out! I'll be in touch.");
    }

    // Rate limit by IP to curb spam/abuse.
    const { success } = await ratelimit.limit(`contact:${clientIp(req)}`);
    if (!success) {
      throw new TooManyRequestsError(
        'Too many messages — please try again in a minute.',
      );
    }

    const input = contactSchema.parse(body);
    await sendContactEmail(input);
    return successResponse(null, "Thanks for reaching out! I'll be in touch.");
  } catch (err) {
    return handleApiError(err);
  }
}
