import { describe, it, expect } from 'vitest';
import { youtubeVideoId, youtubeEmbedUrl } from '@/utils/youtube';
import { updateProjectSchema } from '@/validations/project-validation';

describe('youtubeVideoId', () => {
  it('extracts ids from common URL shapes', () => {
    expect(youtubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(
      'dQw4w9WgXcQ',
    );
    expect(youtubeVideoId('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(youtubeVideoId('https://youtube.com/shorts/dQw4w9WgXcQ')).toBe(
      'dQw4w9WgXcQ',
    );
    expect(
      youtubeVideoId('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'),
    ).toBe('dQw4w9WgXcQ');
    expect(
      youtubeVideoId('https://m.youtube.com/watch?v=dQw4w9WgXcQ&t=42s'),
    ).toBe('dQw4w9WgXcQ');
  });

  it('rejects non-YouTube and malformed URLs', () => {
    expect(youtubeVideoId('https://vimeo.com/12345')).toBeNull();
    expect(youtubeVideoId('https://evil.example/watch?v=dQw4w9WgXcQ')).toBeNull();
    expect(youtubeVideoId('not a url')).toBeNull();
    expect(youtubeVideoId('https://youtube.com/watch')).toBeNull();
  });

  it('builds a privacy-friendly embed URL', () => {
    expect(youtubeEmbedUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(
      'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    );
    expect(youtubeEmbedUrl('https://vimeo.com/12345')).toBeNull();
  });
});

describe('project youtubeUrl validation', () => {
  it('accepts YouTube links and empty values', () => {
    expect(
      updateProjectSchema.safeParse({
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      }).success,
    ).toBe(true);
    const empty = updateProjectSchema.safeParse({ youtubeUrl: '' });
    expect(empty.success).toBe(true);
    if (empty.success) expect(empty.data.youtubeUrl).toBeUndefined();
  });

  it('rejects non-YouTube URLs', () => {
    expect(
      updateProjectSchema.safeParse({ youtubeUrl: 'https://vimeo.com/1' })
        .success,
    ).toBe(false);
  });
});
