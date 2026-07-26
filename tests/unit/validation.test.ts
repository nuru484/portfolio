import { describe, it, expect } from 'vitest';
import { contactSchema } from '@/validations/contact-validation';
import { createProjectSchema } from '@/validations/project-validation';

describe('contactSchema', () => {
  it('rejects a missing name and message', () => {
    const result = contactSchema.safeParse({ email: 'a@b.com' });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid email', () => {
    const result = contactSchema.safeParse({
      name: 'Jane',
      email: 'not-an-email',
      message: 'Hi there',
    });
    expect(result.success).toBe(false);
  });

  it('accepts a valid submission', () => {
    const result = contactSchema.safeParse({
      name: 'Jane',
      email: 'jane@example.com',
      message: 'I would like to work with you.',
    });
    expect(result.success).toBe(true);
  });
});

describe('createProjectSchema', () => {
  const base = {
    title: 'My Project',
    description: 'A short description.',
    technologies: ['React', 'Node'],
  };

  it('accepts valid input', () => {
    expect(createProjectSchema.safeParse(base).success).toBe(true);
  });

  it('rejects a title over 80 characters', () => {
    const result = createProjectSchema.safeParse({
      ...base,
      title: 'x'.repeat(81),
    });
    expect(result.success).toBe(false);
  });

  it('accepts a long tech stack but rejects more than 20 technologies', () => {
    const nine = createProjectSchema.safeParse({
      ...base,
      technologies: Array.from({ length: 9 }, (_, i) => `tech-${i}`),
    });
    expect(nine.success).toBe(true);

    const twentyOne = createProjectSchema.safeParse({
      ...base,
      technologies: Array.from({ length: 21 }, (_, i) => `tech-${i}`),
    });
    expect(twentyOne.success).toBe(false);
  });

  it('requires at least one technology', () => {
    const result = createProjectSchema.safeParse({ ...base, technologies: [] });
    expect(result.success).toBe(false);
  });
});
