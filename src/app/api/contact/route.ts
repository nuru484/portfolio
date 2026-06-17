// src/app/api/contact/route.ts
import type { NextRequest } from 'next/server';
import { contactSchema } from '@/validations/contact-validation';
import { sendContactEmail } from '@/lib/mail/contact-email';
import { successResponse, handleApiError } from '@/utils/api-response';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = contactSchema.parse(body);
    await sendContactEmail(input);
    return successResponse(null, "Thanks for reaching out! I'll be in touch.");
  } catch (err) {
    return handleApiError(err);
  }
}
