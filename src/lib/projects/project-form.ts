// src/lib/projects/project-form.ts
import 'server-only';

export interface ParsedProjectFields {
  title?: string;
  description?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  overview?: string;
  problem?: string;
  solution?: string;
  outcome?: string;
  youtubeUrl?: string;
  /** Passed through as-is; Zod validates it against the enum. */
  projectType?: string;
  isRepoPublic?: boolean;
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

  for (const key of [
    'overview',
    'problem',
    'solution',
    'outcome',
    'youtubeUrl',
  ] as const) {
    const value = str(key);
    if (value !== undefined) fields[key] = value.trim();
  }

  const projectType = str('projectType');
  if (projectType !== undefined) fields.projectType = projectType;

  const isRepoPublic = str('isRepoPublic');
  if (isRepoPublic !== undefined) {
    fields.isRepoPublic = isRepoPublic === 'true' || isRepoPublic === 'on';
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

/**
 * Screenshot URLs the edit form wants to KEEP (existing ones the admin did
 * not remove), sent as a JSON array. undefined = field absent (create, or
 * client didn't send it) → keep everything.
 */
export function parseKeepScreenshots(formData: FormData): string[] | undefined {
  const raw = formData.get('keepScreenshots');
  if (typeof raw !== 'string') return undefined;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return undefined;
    return parsed.filter((v): v is string => typeof v === 'string');
  } catch {
    return undefined;
  }
}
