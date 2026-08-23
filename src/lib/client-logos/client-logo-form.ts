// src/lib/client-logos/client-logo-form.ts
import 'server-only';

export interface ParsedClientLogoFields {
  name?: string;
  /** True when the editor asked to drop the existing dark-theme variant. */
  removeLogoDark?: boolean;
  websiteUrl?: string;
  isPublished?: boolean;
  displayOrder?: number;
}

/** Extracts the text fields of a client logo from multipart FormData. */
export function parseClientLogoFields(
  formData: FormData,
): ParsedClientLogoFields {
  const str = (k: string): string | undefined => {
    const v = formData.get(k);
    return typeof v === 'string' ? v : undefined;
  };

  const fields: ParsedClientLogoFields = {};

  const name = str('name');
  if (name !== undefined) fields.name = name.trim();

  const websiteUrl = str('websiteUrl');
  if (websiteUrl !== undefined) fields.websiteUrl = websiteUrl.trim();

  const removeLogoDark = str('removeLogoDark');
  if (removeLogoDark !== undefined) {
    fields.removeLogoDark = removeLogoDark === 'true' || removeLogoDark === 'on';
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
