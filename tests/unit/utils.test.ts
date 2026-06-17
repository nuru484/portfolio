import { describe, it, expect } from 'vitest';
import { generateSlug } from '@/utils/generate-slug';
import { calculateReadTime } from '@/utils/read-time-calculator';

describe('generateSlug', () => {
  it('lowercases and hyphenates', () => {
    expect(generateSlug('Hello World')).toBe('hello-world');
  });

  it('strips punctuation', () => {
    expect(generateSlug('Next.js & Prisma!')).toBe('nextjs-prisma');
  });

  it('trims and collapses whitespace', () => {
    expect(generateSlug('  multiple   spaces  ')).toBe('multiple-spaces');
  });
});

describe('calculateReadTime', () => {
  it('returns at least one minute', () => {
    expect(calculateReadTime('a few words')).toBe('1 min read');
  });

  it('scales with word count', () => {
    const words = Array.from({ length: 400 }, () => 'word').join(' ');
    expect(calculateReadTime(words)).toBe('2 min read');
  });

  it('ignores HTML tags', () => {
    expect(calculateReadTime('<p>hello there</p>')).toBe('1 min read');
  });
});
