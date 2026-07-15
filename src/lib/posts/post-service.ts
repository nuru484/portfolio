// src/lib/posts/post-service.ts
import 'server-only';
import prisma, { Prisma } from '@/lib/prisma';
import { uploadImage, deleteImage } from '@/lib/cloudinary';
import { generateSlug } from '@/utils/generate-slug';
import { calculateReadTime } from '@/utils/read-time-calculator';
import {
  uploadBase64ContentImages,
  deleteOrphanedContentImages,
  deleteUploadedContentImages,
} from '@/utils/content-images';
import { NotFoundError, ForbiddenError } from '@/middlewares/error-handler';
import { sanitizeHtml } from '@/utils/sanitize-html';
import type {
  ICreatePostInput,
  IUpdatePostInput,
} from '@/validations/post-validation';
import type { IUploadedFile } from '@/types/cloudinary.types';
import type { IPostsQueryParams } from '@/types/post.types';

const BLOG_COVER_FOLDER = 'portfolio/blog';

const authorSelect = { id: true, fullname: true, email: true } as const;
const categorySelect = { id: true, name: true, slug: true } as const;

const postListSelect = {
  id: true,
  slug: true,
  title: true,
  excerpt: true,
  coverImage: true,
  readTime: true,
  isPublished: true,
  isFeatured: true,
  publishDate: true,
  createdAt: true,
  updatedAt: true,
  author: { select: authorSelect },
  category: { select: categorySelect },
} satisfies Prisma.PostSelect;

const postFullSelect = {
  ...postListSelect,
  content: true,
} satisfies Prisma.PostSelect;

async function uniqueSlug(title: string, excludeId?: string): Promise<string> {
  const base = generateSlug(title) || 'post';
  let slug = base;
  let n = 1;
  while (true) {
    const existing = await prisma.post.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (!existing || existing.id === excludeId) return slug;
    slug = `${base}-${++n}`;
  }
}

async function assertCategoryExists(categoryId: string): Promise<void> {
  const category = await prisma.category.findFirst({
    where: { id: categoryId },
    select: { id: true },
  });
  if (!category) throw new NotFoundError('Category not found');
}

// ── Reads ──────────────────────────────────────────────────────────────────

export async function listPosts(params: IPostsQueryParams) {
  const page = Math.max(params.page ?? 1, 1);
  const limit = Math.min(Math.max(params.limit ?? 10, 1), 100);

  const where: Prisma.PostWhereInput = {};
  if (params.categoryId) where.categoryId = params.categoryId;
  if (typeof params.isPublished === 'boolean') where.isPublished = params.isPublished;
  if (typeof params.isFeatured === 'boolean') where.isFeatured = params.isFeatured;
  if (params.search) {
    where.OR = [
      { title: { contains: params.search, mode: 'insensitive' } },
      { excerpt: { contains: params.search, mode: 'insensitive' } },
    ];
  }

  const [data, total] = await Promise.all([
    prisma.post.findMany({
      where,
      select: postListSelect,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where }),
  ]);

  return {
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) || 1 },
  };
}

/** Public list: published posts, optionally filtered by category slug. */
export async function getPublishedPosts(params: IPostsQueryParams = {}) {
  const page = Math.max(params.page ?? 1, 1);
  const limit = Math.min(Math.max(params.limit ?? 12, 1), 100);

  const where: Prisma.PostWhereInput = { isPublished: true };
  if (params.categorySlug) where.category = { slug: params.categorySlug };
  if (params.search) {
    where.OR = [
      { title: { contains: params.search, mode: 'insensitive' } },
      { excerpt: { contains: params.search, mode: 'insensitive' } },
    ];
  }

  const [data, total] = await Promise.all([
    prisma.post.findMany({
      where,
      select: postListSelect,
      orderBy: [
        { isFeatured: 'desc' },
        { publishDate: 'desc' },
        { createdAt: 'desc' },
      ],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where }),
  ]);

  return {
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) || 1 },
  };
}

/** Public detail: a published post by slug, or null. */
export async function getPublishedPostBySlug(slug: string) {
  return prisma.post.findFirst({
    where: { slug, isPublished: true },
    select: postFullSelect,
  });
}

/** Slugs of published posts — for the sitemap. */
export async function getPublishedPostSlugs() {
  return prisma.post.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true },
  });
}

/** Admin: any post by id (published or draft). */
export async function getPostById(id: string) {
  const post = await prisma.post.findFirst({
    where: { id },
    select: postFullSelect,
  });
  if (!post) throw new NotFoundError('Post not found');
  return post;
}

// ── Writes ─────────────────────────────────────────────────────────────────

export async function createPost(
  input: ICreatePostInput,
  authorId: string,
  coverFile?: IUploadedFile,
) {
  // Sanitize before uploading inline images so nothing is uploaded for
  // content that gets stripped.
  const { html: content, uploadedPublicIds } = await uploadBase64ContentImages(
    sanitizeHtml(input.content),
  );
  let coverUrl: string | null = null;

  try {
    if (input.categoryId) await assertCategoryExists(input.categoryId);
    if (coverFile) {
      coverUrl = (await uploadImage(coverFile, { folder: BLOG_COVER_FOLDER }))
        .secure_url;
    }

    const isPublished = input.isPublished ?? false;
    const publishDate = isPublished
      ? input.publishDate
        ? new Date(input.publishDate)
        : new Date()
      : null;

    return await prisma.post.create({
      data: {
        slug: await uniqueSlug(input.title),
        title: input.title,
        excerpt: input.excerpt,
        content,
        readTime: calculateReadTime(content),
        coverImage: coverUrl,
        isPublished,
        isFeatured: input.isFeatured ?? false,
        publishDate,
        authorId,
        categoryId: input.categoryId ?? null,
      },
      select: postFullSelect,
    });
  } catch (error) {
    if (coverUrl) await deleteImage(coverUrl);
    await deleteUploadedContentImages(uploadedPublicIds);
    throw error;
  }
}

export interface PostActor {
  userId: string;
  isAdmin: boolean;
}

export async function updatePost(
  id: string,
  input: IUpdatePostInput,
  actor: PostActor,
  opts: { coverFile?: IUploadedFile; coverCleared?: boolean } = {},
) {
  const existing = await prisma.post.findFirst({
    where: { id },
    select: {
      id: true,
      slug: true,
      authorId: true,
      coverImage: true,
      content: true,
      publishDate: true,
    },
  });
  if (!existing) throw new NotFoundError('Post not found');

  // Only the post's author or an admin may change it.
  if (!actor.isAdmin && existing.authorId !== actor.userId) {
    throw new ForbiddenError('Only the author or an admin can edit this post');
  }

  let newCoverUrl: string | undefined;
  let processedContent: string | undefined;
  let uploadedPublicIds: string[] = [];

  try {
    if (input.categoryId) await assertCategoryExists(input.categoryId);

    if (opts.coverFile) {
      newCoverUrl = (await uploadImage(opts.coverFile, { folder: BLOG_COVER_FOLDER }))
        .secure_url;
    }

    if (input.content !== undefined) {
      const result = await uploadBase64ContentImages(sanitizeHtml(input.content));
      processedContent = result.html;
      uploadedPublicIds = result.uploadedPublicIds;
    }

    const data: Prisma.PostUpdateInput = {};
    if (input.title !== undefined) {
      data.title = input.title;
      data.slug = await uniqueSlug(input.title, id);
    }
    if (input.excerpt !== undefined) data.excerpt = input.excerpt;
    if (processedContent !== undefined) {
      data.content = processedContent;
      data.readTime = calculateReadTime(processedContent);
    }
    if (input.categoryId !== undefined) {
      data.category = input.categoryId
        ? { connect: { id: input.categoryId } }
        : { disconnect: true };
    }
    if (input.isFeatured !== undefined) data.isFeatured = input.isFeatured;

    if (input.isPublished !== undefined) {
      data.isPublished = input.isPublished;
      data.publishDate = input.isPublished
        ? input.publishDate
          ? new Date(input.publishDate)
          : (existing.publishDate ?? new Date())
        : null;
    } else if (input.publishDate !== undefined) {
      data.publishDate = input.publishDate ? new Date(input.publishDate) : null;
    }

    let oldCoverToDelete: string | null = null;
    if (opts.coverCleared) {
      data.coverImage = null;
      oldCoverToDelete = existing.coverImage;
    } else if (newCoverUrl) {
      data.coverImage = newCoverUrl;
      oldCoverToDelete =
        existing.coverImage && existing.coverImage !== newCoverUrl
          ? existing.coverImage
          : null;
    }

    const updated = await prisma.post.update({
      where: { id },
      data,
      select: postFullSelect,
    });

    // Best-effort cleanup after a successful update.
    if (oldCoverToDelete) await deleteImage(oldCoverToDelete);
    if (processedContent !== undefined && existing.content) {
      await deleteOrphanedContentImages(existing.content, processedContent);
    }

    // previousSlug lets the route revalidate the old public URL when a title
    // change renames the slug (otherwise the stale page lingers in the cache).
    return { post: updated, previousSlug: existing.slug };
  } catch (error) {
    if (newCoverUrl) await deleteImage(newCoverUrl);
    await deleteUploadedContentImages(uploadedPublicIds);
    throw error;
  }
}

/** Soft-deletes a post. Images are kept so the record stays restorable. */
export async function deletePost(id: string): Promise<void> {
  const existing = await prisma.post.findFirst({
    where: { id },
    select: { id: true },
  });
  if (!existing) throw new NotFoundError('Post not found');
  await prisma.post.delete({ where: { id } });
}

export async function togglePostPublish(id: string) {
  const post = await prisma.post.findFirst({
    where: { id },
    select: { id: true, isPublished: true, publishDate: true },
  });
  if (!post) throw new NotFoundError('Post not found');

  const isPublished = !post.isPublished;
  return prisma.post.update({
    where: { id },
    data: {
      isPublished,
      publishDate: isPublished ? (post.publishDate ?? new Date()) : null,
    },
    select: { id: true, isPublished: true },
  });
}

export async function togglePostFeatured(id: string) {
  const post = await prisma.post.findFirst({
    where: { id },
    select: { id: true, isFeatured: true },
  });
  if (!post) throw new NotFoundError('Post not found');

  return prisma.post.update({
    where: { id },
    data: { isFeatured: !post.isFeatured },
    select: { id: true, isFeatured: true },
  });
}
