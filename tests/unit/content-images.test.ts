import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ValidationError } from '@/middlewares/error-handler';

// Cloudinary is a network boundary — replace it so tests exercise only the
// parsing/validation/rewrite logic.
vi.mock('@/lib/cloudinary', () => ({
  uploadImage: vi.fn(async () => ({
    public_id: 'portfolio/blog/content/mock',
    secure_url: 'https://res.cloudinary.com/demo/image/upload/mock.png',
    format: 'png',
    resource_type: 'image',
  })),
  deleteImage: vi.fn(async () => undefined),
}));

import { uploadBase64ContentImages } from '@/utils/content-images';
import { uploadImage } from '@/lib/cloudinary';

const pngTag = (data: string) => `<img src="data:image/png;base64,${data}">`;

beforeEach(() => {
  vi.mocked(uploadImage).mockClear();
});

describe('uploadBase64ContentImages', () => {
  it('passes through HTML without base64 images untouched', async () => {
    const html = '<p>hello</p><img src="https://example.com/a.png">';
    const result = await uploadBase64ContentImages(html);
    expect(result.html).toBe(html);
    expect(result.uploadedPublicIds).toEqual([]);
    expect(uploadImage).not.toHaveBeenCalled();
  });

  it('uploads base64 images and rewrites their src', async () => {
    const html = `<p>x</p>${pngTag('iVBORw0KGgo=')}`;
    const result = await uploadBase64ContentImages(html);
    expect(result.html).toContain('res.cloudinary.com');
    expect(result.html).not.toContain('base64');
    expect(result.uploadedPublicIds).toHaveLength(1);
  });

  it('rejects a save with more than 20 inline images before uploading any', async () => {
    const html = Array.from({ length: 21 }, () => pngTag('aWJi')).join('');
    await expect(uploadBase64ContentImages(html)).rejects.toThrow(
      ValidationError,
    );
    expect(uploadImage).not.toHaveBeenCalled();
  });

  it('rejects an oversized inline image before uploading any', async () => {
    // ~5MB decoded → base64 is 4/3 larger.
    const big = 'A'.repeat(7 * 1024 * 1024);
    const html = pngTag('aWJi') + pngTag(big);
    await expect(uploadBase64ContentImages(html)).rejects.toThrow(
      ValidationError,
    );
    expect(uploadImage).not.toHaveBeenCalled();
  });
});
