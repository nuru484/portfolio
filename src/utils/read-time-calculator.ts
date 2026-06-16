// src/utils/read-time-calculator.ts

/**
 * Estimates reading time from post content (HTML or plain text).
 * Returns a label like "5 min read".
 */
export const calculateReadTime = (content: string): string => {
  const WORDS_PER_MINUTE = 200;

  const text = content.replace(/<[^>]*>/g, ' ');
  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  const minutes = Math.max(Math.ceil(wordCount / WORDS_PER_MINUTE), 1);
  return `${minutes} min read`;
};
