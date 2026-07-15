import { describe, it, expect } from 'vitest';
import {
  assertValidImage,
  fileToUploaded,
  MAX_UPLOAD_BYTES,
} from '@/lib/uploads';
import { ValidationError } from '@/middlewares/error-handler';

describe('assertValidImage', () => {
  it('accepts an allowed type within the size limit', () => {
    expect(() =>
      assertValidImage({ size: 1024, mimetype: 'image/png' }),
    ).not.toThrow();
    expect(() =>
      assertValidImage({ size: MAX_UPLOAD_BYTES, mimetype: 'image/webp' }),
    ).not.toThrow();
  });

  it('rejects files over the limit', () => {
    expect(() =>
      assertValidImage({ size: MAX_UPLOAD_BYTES + 1, mimetype: 'image/png' }),
    ).toThrow(ValidationError);
  });

  it('rejects SVG (stored-XSS vector) and non-image types', () => {
    expect(() =>
      assertValidImage({ size: 10, mimetype: 'image/svg+xml' }),
    ).toThrow(ValidationError);
    expect(() =>
      assertValidImage({ size: 10, mimetype: 'application/pdf' }),
    ).toThrow(ValidationError);
    expect(() =>
      assertValidImage({ size: 10, mimetype: 'text/html' }),
    ).toThrow(ValidationError);
  });

  it('is case-insensitive on MIME type', () => {
    expect(() =>
      assertValidImage({ size: 10, mimetype: 'IMAGE/JPEG' }),
    ).not.toThrow();
  });

  it('names the field in the error message', () => {
    expect(() =>
      assertValidImage({ size: 10, mimetype: 'text/html' }, 'cover image'),
    ).toThrow(/cover image/);
  });
});

describe('fileToUploaded', () => {
  it('returns undefined for absent, string, or empty entries', async () => {
    expect(await fileToUploaded(null)).toBeUndefined();
    expect(await fileToUploaded('https://example.com/a.png')).toBeUndefined();
    expect(
      await fileToUploaded(new File([], 'empty.png', { type: 'image/png' })),
    ).toBeUndefined();
  });

  it('converts a valid file to an upload buffer', async () => {
    const file = new File([new Uint8Array([1, 2, 3])], 'a.png', {
      type: 'image/png',
    });
    const uploaded = await fileToUploaded(file);
    expect(uploaded).toMatchObject({
      originalname: 'a.png',
      mimetype: 'image/png',
    });
    expect(uploaded!.buffer.length).toBe(3);
  });

  it('rejects an oversized file before buffering', async () => {
    const big = new File([new Uint8Array(MAX_UPLOAD_BYTES + 1)], 'big.png', {
      type: 'image/png',
    });
    await expect(fileToUploaded(big)).rejects.toThrow(ValidationError);
  });

  it('rejects disallowed types', async () => {
    const svg = new File(['<svg onload="alert(1)"/>'], 'x.svg', {
      type: 'image/svg+xml',
    });
    await expect(fileToUploaded(svg)).rejects.toThrow(ValidationError);
  });
});
