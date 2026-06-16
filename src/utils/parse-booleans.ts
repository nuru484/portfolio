// src/utils/parse-booleans.ts

/** Coerces form/query values ("true"/"on"/booleans) into a boolean. */
export function parseBoolean(value: unknown, defaultValue = false): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return ['true', '1', 'yes', 'on'].includes(value.toLowerCase());
  }
  return defaultValue;
}
