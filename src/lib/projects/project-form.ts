// src/lib/projects/project-form.ts
import 'server-only';
import type { IUploadedFile } from '@/types/cloudinary.types';

export interface ParsedProjectFields {
  title?: string;
  description?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  isPublished?: boolean;
  displayOrder?: number;
}

/** Extracts the text fields of a project from multipart FormData. */
export function parseProjectFields(formData: FormData): ParsedProjectFields {
  const str = (k: string): string | undefined => {
    const v = formData.get(k);
    return typeof v === 'string' ? v : undefined;
  };

  const fields: ParsedProjectFields = {};

  const title = str('title');
  if (title !== undefined) fields.title = title.trim();

  const description = str('description');
  if (description !== undefined) fields.description = description.trim();

  const technologies = str('technologies');
  if (technologies !== undefined) {
    fields.technologies = technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  }

  const githubUrl = str('githubUrl');
  if (githubUrl !== undefined) fields.githubUrl = githubUrl.trim();

  const liveUrl = str('liveUrl');
  if (liveUrl !== undefined) fields.liveUrl = liveUrl.trim();

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

/** Converts an uploaded form File into a buffer the cloudinary layer accepts. */
export async function fileToUploaded(
  value: FormDataEntryValue | null,
): Promise<IUploadedFile | undefined> {
  if (!value || typeof value === 'string') return undefined;
  if (value.size === 0) return undefined;

  const buffer = Buffer.from(await value.arrayBuffer());
  return { buffer, originalname: value.name, mimetype: value.type };
}
