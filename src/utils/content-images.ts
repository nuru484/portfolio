// src/utils/content-images.ts
//
// Handles inline base64 images embedded in post HTML by the rich-text editor.
// Persisting base64 blobs bloats the DB, so each base64 <img> is uploaded to
// Cloudinary and its src rewritten to the hosted URL before saving.
import 'server-only';
import { uploadImage, deleteImage } from '@/lib/cloudinary';
import { assertValidImage } from '@/lib/uploads';
import { ValidationError } from '@/middlewares/error-handler';
import logger from '@/utils/logger';

const BLOG_CONTENT_FOLDER = 'portfolio/blog/content';

/** Caps concurrent Cloudinary uploads (and memory) from a single save. */
const MAX_CONTENT_IMAGES = 20;

const BASE64_IMAGE_REGEX = /data:image\/[a-z]+;base64,/i;
const IMG_SRC_BASE64_REGEX =
  /<img[^>]*\ssrc=["'](data:image\/([a-z]+);base64,[^"']+)["'][^>]*>/gi;
const IMG_SRC_URL_REGEX = /<img[^>]*\ssrc=["']([^"']+)["'][^>]*>/gi;

const isCloudinaryUrl = (url: string): boolean => url.includes('cloudinary.com');

const base64ToBuffer = (base64String: string): Buffer =>
  Buffer.from(base64String.replace(/^data:image\/\w+;base64,/, ''), 'base64');

/**
 * Uploads every base64 image in the HTML to Cloudinary and rewrites the src to
 * the hosted URL. Returns the new HTML plus the uploaded public IDs (for
 * rollback if the surrounding save fails). Fails fast on any upload error.
 */
export const uploadBase64ContentImages = async (
  html: string,
): Promise<{ html: string; uploadedPublicIds: string[] }> => {
  if (!BASE64_IMAGE_REGEX.test(html)) return { html, uploadedPublicIds: [] };

  IMG_SRC_BASE64_REGEX.lastIndex = 0;
  const matches = [...html.matchAll(IMG_SRC_BASE64_REGEX)];
  if (matches.length === 0) return { html, uploadedPublicIds: [] };

  if (matches.length > MAX_CONTENT_IMAGES) {
    throw new ValidationError(
      `A post can embed at most ${MAX_CONTENT_IMAGES} inline images (found ${matches.length}).`,
    );
  }

  // Validate every image before uploading any, so a bad one can't leave a
  // half-uploaded batch behind.
  for (const match of matches) {
    // Base64 encodes 3 bytes per 4 chars — close enough to gate on.
    const decodedSize = Math.floor((match[1].length * 3) / 4);
    assertValidImage(
      { size: decodedSize, mimetype: `image/${match[2]}` },
      'inline image',
    );
  }

  const uploadedPublicIds: string[] = [];

  const replacements = await Promise.all(
    matches.map(async (match) => {
      const fullImgTag = match[0];
      const base64Src = match[1];
      const result = await uploadImage(
        { buffer: base64ToBuffer(base64Src), mimetype: `image/${match[2]}` },
        { folder: BLOG_CONTENT_FOLDER },
      );
      uploadedPublicIds.push(result.public_id);
      return {
        original: fullImgTag,
        replacement: fullImgTag.replace(base64Src, result.secure_url),
      };
    }),
  );

  let modifiedHtml = html;
  for (const { original, replacement } of replacements) {
    modifiedHtml = modifiedHtml.replace(original, replacement);
  }
  return { html: modifiedHtml, uploadedPublicIds };
};

const extractCloudinaryUrls = (html: string): string[] => {
  IMG_SRC_URL_REGEX.lastIndex = 0;
  return [...html.matchAll(IMG_SRC_URL_REGEX)]
    .map((m) => m[1])
    .filter(isCloudinaryUrl);
};

/** Deletes Cloudinary images present in old content but absent in new content. */
export const deleteOrphanedContentImages = async (
  oldHtml: string,
  newHtml: string,
): Promise<void> => {
  const oldUrls = extractCloudinaryUrls(oldHtml);
  if (oldUrls.length === 0) return;

  const newUrls = new Set(extractCloudinaryUrls(newHtml));
  const orphaned = oldUrls.filter((url) => !newUrls.has(url));

  await Promise.all(orphaned.map((url) => deleteImage(url)));
};

/** Rollback helper: deletes a list of just-uploaded content images by id/url. */
export const deleteUploadedContentImages = async (
  ids: string[],
): Promise<void> => {
  if (ids.length === 0) return;
  await Promise.all(
    ids.map(async (id) => {
      try {
        await deleteImage(id);
      } catch (error) {
        logger.warn({ error, id }, 'Failed to roll back content image');
      }
    }),
  );
};
