import { describe, it, expect } from 'vitest';
import { normalizePath } from '@/hooks/use-current-path';

describe('normalizePath', () => {
  it('treats an absent or empty path as the root', () => {
    expect(normalizePath(null)).toBe('/');
    expect(normalizePath(undefined)).toBe('/');
    expect(normalizePath('')).toBe('/');
  });

  it('leaves a plain path alone', () => {
    expect(normalizePath('/')).toBe('/');
    expect(normalizePath('/projects')).toBe('/projects');
    expect(normalizePath('/blog/some-post')).toBe('/blog/some-post');
  });

  it('strips trailing slashes so they still match a nav href', () => {
    expect(normalizePath('/projects/')).toBe('/projects');
    expect(normalizePath('/blog//')).toBe('/blog');
    expect(normalizePath('//')).toBe('/');
  });
});
