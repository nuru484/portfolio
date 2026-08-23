import { describe, it, expect } from 'vitest';
import { projectsHref, parseProjectTab } from '@/utils/projects-href';

describe('projectsHref', () => {
  it('keeps the default tab on the bare path', () => {
    expect(projectsHref('CLIENT')).toBe('/projects');
    expect(projectsHref('CLIENT', 1)).toBe('/projects');
  });

  it('names the side tab', () => {
    expect(projectsHref('SIDE')).toBe('/projects?tab=side');
  });

  it('pages within a tab without losing it', () => {
    expect(projectsHref('CLIENT', 3)).toBe('/projects?page=3');
    expect(projectsHref('SIDE', 2)).toBe('/projects?tab=side&page=2');
  });
});

describe('parseProjectTab', () => {
  it('defaults to client work', () => {
    expect(parseProjectTab(undefined)).toBe('CLIENT');
    expect(parseProjectTab('')).toBe('CLIENT');
    expect(parseProjectTab('client')).toBe('CLIENT');
  });

  it('falls back rather than trusting a hand-edited query', () => {
    expect(parseProjectTab('bogus')).toBe('CLIENT');
    expect(parseProjectTab('SIDE')).toBe('CLIENT');
  });

  it('reads the side tab', () => {
    expect(parseProjectTab('side')).toBe('SIDE');
  });
});
