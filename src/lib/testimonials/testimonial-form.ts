// src/lib/testimonials/testimonial-form.ts
import 'server-only';
import type { ITestimonialSocial } from '@/types/testimonial.types';

export interface ParsedTestimonialFields {
  author?: string;
  role?: string;
  quote?: string;
  socials?: ITestimonialSocial[];
  isPublished?: boolean;
  displayOrder?: number;
}

/** Extracts the text fields of a testimonial from multipart FormData. */
export function parseTestimonialFields(
  formData: FormData,
): ParsedTestimonialFields {
  const str = (k: string): string | undefined => {
    const v = formData.get(k);
    return typeof v === 'string' ? v : undefined;
  };

  const fields: ParsedTestimonialFields = {};

  const author = str('author');
  if (author !== undefined) fields.author = author.trim();

  const role = str('role');
  if (role !== undefined) fields.role = role.trim();

  const quote = str('quote');
  if (quote !== undefined) fields.quote = quote.trim();

  // Socials arrive as a JSON string. Trim platform/url and drop blank rows so
  // empty entries from the form never reach validation.
  const socials = str('socials');
  if (socials !== undefined) {
    try {
      const parsed = socials === '' ? [] : JSON.parse(socials);
      if (Array.isArray(parsed)) {
        fields.socials = parsed
          .map((s) => ({
            platform: typeof s?.platform === 'string' ? s.platform.trim() : '',
            url: typeof s?.url === 'string' ? s.url.trim() : '',
          }))
          .filter((s) => s.platform !== '' || s.url !== '');
      }
    } catch {
      // Leave socials undefined; validation will surface a clear error if the
      // field was required, otherwise it is simply ignored.
    }
  }

  const isPublished = str('isPublished');
  if (isPublished !== undefined) {
    fields.isPublished = isPublished === 'true' || isPublished === 'on';
  }

  const displayOrder = str('displayOrder');
  if (displayOrder !== undefined && displayOrder !== '') {
    const n = Number(displayOrder);
    if (Number.isFinite(n)) fields.displayOrder = n;
  }

  return fields;
}
