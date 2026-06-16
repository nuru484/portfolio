// src/lib/posts/post-form.ts
import 'server-only';
import type { IUploadedFile } from '@/types/cloudinary.types';

/** Collects the non-file fields of a post from multipart FormData. */
export function parsePostFields(formData: FormData): Record<string, unknown> {
  const raw: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key === 'coverImage') continue;
    raw[key] = value;
  }
  return raw;
}

export interface CoverImageResult {
  /** A new file was uploaded. */
  file?: IUploadedFile;
  /** The cover was explicitly cleared (set to empty / "null"). */
  cleared: boolean;
}

/** Interprets the `coverImage` form entry: new file, cleared, or untouched. */
export async function extractCoverImage(
  formData: FormData,
): Promise<CoverImageResult> {
  const entry = formData.get('coverImage');

  if (entry === null) return { cleared: false };

  if (typeof entry === 'string') {
    if (entry === '' || entry === 'null' || entry === 'undefined') {
      return { cleared: true };
    }
    return { cleared: false };
  }

  if (entry.size > 0) {
    const buffer = Buffer.from(await entry.arrayBuffer());
    return {
      cleared: false,
      file: { buffer, originalname: entry.name, mimetype: entry.type },
    };
  }

  return { cleared: false };
}
