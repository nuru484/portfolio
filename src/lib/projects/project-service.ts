// src/lib/projects/project-service.ts
import 'server-only';
import prisma, { Prisma } from '@/lib/prisma';
import { uploadImage, deleteImage } from '@/lib/cloudinary';
import { generateSlug } from '@/utils/generate-slug';
import { NotFoundError, ValidationError } from '@/middlewares/error-handler';
import type {
  ICreateProjectInput,
  IUpdateProjectInput,
} from '@/validations/project-validation';
import type { IUploadedFile } from '@/types/cloudinary.types';
import type { IProjectsQueryParams } from '@/types/project.types';

const projectSelect = {
  id: true,
  slug: true,
  title: true,
  description: true,
  technologies: true,
  image: true,
  githubUrl: true,
  liveUrl: true,
  overview: true,
  problem: true,
  solution: true,
  outcome: true,
  screenshots: true,
  youtubeUrl: true,
  projectType: true,
  isRepoPublic: true,
  isPublished: true,
  displayOrder: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ProjectSelect;

/** Cap on case-study screenshots per project (memory + page weight). */
export const MAX_SCREENSHOTS = 8;

const SCREENSHOT_FOLDER = 'portfolio/projects/screenshots';

/** Uploads screenshots concurrently; returns their delivery URLs. */
async function uploadScreenshots(files: IUploadedFile[]): Promise<string[]> {
  const results = await Promise.all(
    files.map((file) => uploadImage(file, { folder: SCREENSHOT_FOLDER })),
  );
  return results.map((r) => r.secure_url);
}

/** Best-effort cleanup of a list of Cloudinary URLs. */
async function deleteImages(urls: string[]): Promise<void> {
  await Promise.all(urls.map((url) => deleteImage(url)));
}

/** Builds a slug unique across all rows (incl. soft-deleted, which keep slug). */
async function uniqueSlug(title: string, excludeId?: string): Promise<string> {
  const base = generateSlug(title) || 'project';
  let slug = base;
  let n = 1;

  // findUnique is NOT soft-delete filtered → checks every row.
  while (true) {
    const existing = await prisma.project.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (!existing || existing.id === excludeId) return slug;
    slug = `${base}-${++n}`;
  }
}

export async function listProjects(params: IProjectsQueryParams) {
  const page = Math.max(params.page ?? 1, 1);
  const limit = Math.min(Math.max(params.limit ?? 20, 1), 100);

  const where: Prisma.ProjectWhereInput = {};
  if (typeof params.isPublished === 'boolean') where.isPublished = params.isPublished;
  if (params.search) {
    where.OR = [
      { title: { contains: params.search, mode: 'insensitive' } },
      { description: { contains: params.search, mode: 'insensitive' } },
    ];
  }

  const [data, total] = await Promise.all([
    prisma.project.findMany({
      where,
      select: projectSelect,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.project.count({ where }),
  ]);

  return {
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) || 1 },
  };
}

/** Public read: published projects in display order (no auth). */
export async function getPublishedProjects(limit?: number) {
  return prisma.project.findMany({
    where: { isPublished: true },
    select: projectSelect,
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    ...(limit ? { take: limit } : {}),
  });
}

/** Public read: a published project by slug, or null (detail page). */
export async function getPublishedProjectBySlug(slug: string) {
  return prisma.project.findFirst({
    where: { slug, isPublished: true },
    select: projectSelect,
  });
}

/** Slugs of published projects — for the sitemap. */
export async function getPublishedProjectSlugs() {
  return prisma.project.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true },
  });
}

/**
 * Public read: published projects grouped by type, each group in display
 * order. One query; the split happens in memory (portfolio-sized data).
 * `limitPerGroup` caps each group (homepage teaser).
 */
export async function getPublishedProjectsByType(limitPerGroup?: number) {
  const projects = await prisma.project.findMany({
    where: { isPublished: true },
    select: projectSelect,
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
  });

  const client = projects.filter((p) => p.projectType === 'CLIENT');
  const side = projects.filter((p) => p.projectType === 'SIDE');

  return {
    client: limitPerGroup ? client.slice(0, limitPerGroup) : client,
    side: limitPerGroup ? side.slice(0, limitPerGroup) : side,
  };
}

/**
 * Public read: published projects, paginated (for the projects page).
 * Ordered client work first (enum order), so the Client/Side group headings
 * render as contiguous runs across pages.
 */
export async function getPublishedProjectsPage(params: {
  page?: number;
  limit?: number;
} = {}) {
  const page = Math.max(params.page ?? 1, 1);
  const limit = Math.min(Math.max(params.limit ?? 6, 1), 50);

  const where: Prisma.ProjectWhereInput = { isPublished: true };

  const [data, total] = await Promise.all([
    prisma.project.findMany({
      where,
      select: projectSelect,
      orderBy: [
        { projectType: 'asc' },
        { displayOrder: 'asc' },
        { createdAt: 'desc' },
      ],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.project.count({ where }),
  ]);

  return {
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) || 1 },
  };
}

export async function getProjectById(id: string) {
  const project = await prisma.project.findFirst({
    where: { id },
    select: projectSelect,
  });
  if (!project) throw new NotFoundError('Project not found');
  return project;
}

export async function createProject(
  input: ICreateProjectInput,
  image: IUploadedFile,
  screenshotFiles: IUploadedFile[] = [],
) {
  if (screenshotFiles.length > MAX_SCREENSHOTS) {
    throw new ValidationError(
      `At most ${MAX_SCREENSHOTS} screenshots per project.`,
    );
  }

  const slug = await uniqueSlug(input.title);

  const uploaded = await uploadImage(image);
  let screenshots: string[] = [];

  try {
    screenshots = await uploadScreenshots(screenshotFiles);

    return await prisma.project.create({
      data: {
        slug,
        title: input.title,
        description: input.description,
        technologies: input.technologies,
        image: uploaded.secure_url,
        githubUrl: input.githubUrl ?? null,
        liveUrl: input.liveUrl ?? null,
        overview: input.overview ?? null,
        problem: input.problem ?? null,
        solution: input.solution ?? null,
        outcome: input.outcome ?? null,
        screenshots,
        youtubeUrl: input.youtubeUrl ?? null,
        projectType: input.projectType ?? 'SIDE',
        isRepoPublic: input.isRepoPublic ?? true,
        isPublished: input.isPublished ?? false,
        displayOrder: input.displayOrder ?? 0,
      },
      select: projectSelect,
    });
  } catch (error) {
    // Roll back everything just uploaded if any step fails.
    await deleteImages([uploaded.secure_url, ...screenshots]);
    throw error;
  }
}

export async function updateProject(
  id: string,
  input: IUpdateProjectInput,
  opts: {
    image?: IUploadedFile;
    screenshotFiles?: IUploadedFile[];
    /** Existing screenshot URLs to keep; undefined = keep all. */
    keepScreenshots?: string[];
  } = {},
) {
  const current = await prisma.project.findFirst({
    where: { id },
    select: { id: true, image: true, screenshots: true },
  });
  if (!current) throw new NotFoundError('Project not found');

  const data: Prisma.ProjectUpdateInput = {};
  if (input.title !== undefined) {
    data.title = input.title;
    data.slug = await uniqueSlug(input.title, id);
  }
  if (input.description !== undefined) data.description = input.description;
  if (input.technologies !== undefined) data.technologies = input.technologies;
  if (input.githubUrl !== undefined) data.githubUrl = input.githubUrl ?? null;
  if (input.liveUrl !== undefined) data.liveUrl = input.liveUrl ?? null;
  if (input.overview !== undefined) data.overview = input.overview ?? null;
  if (input.problem !== undefined) data.problem = input.problem ?? null;
  if (input.solution !== undefined) data.solution = input.solution ?? null;
  if (input.outcome !== undefined) data.outcome = input.outcome ?? null;
  if (input.youtubeUrl !== undefined) data.youtubeUrl = input.youtubeUrl ?? null;
  if (input.projectType !== undefined) data.projectType = input.projectType;
  if (input.isRepoPublic !== undefined) data.isRepoPublic = input.isRepoPublic;
  if (input.isPublished !== undefined) data.isPublished = input.isPublished;
  if (input.displayOrder !== undefined) data.displayOrder = input.displayOrder;

  // Screenshots: kept (existing minus removed) + newly uploaded, capped.
  const screenshotFiles = opts.screenshotFiles ?? [];
  const kept =
    opts.keepScreenshots !== undefined
      ? current.screenshots.filter((url) => opts.keepScreenshots!.includes(url))
      : current.screenshots;
  const removed = current.screenshots.filter((url) => !kept.includes(url));

  if (kept.length + screenshotFiles.length > MAX_SCREENSHOTS) {
    throw new ValidationError(
      `At most ${MAX_SCREENSHOTS} screenshots per project.`,
    );
  }

  let newScreenshots: string[] = [];
  if (screenshotFiles.length > 0) {
    newScreenshots = await uploadScreenshots(screenshotFiles);
  }
  if (screenshotFiles.length > 0 || opts.keepScreenshots !== undefined) {
    data.screenshots = [...kept, ...newScreenshots];
  }

  let replacedImage: string | undefined;
  try {
    if (opts.image) {
      const up = await uploadImage(opts.image);
      data.image = up.secure_url;
      replacedImage = current.image;
    }

    const updated = await prisma.project.update({
      where: { id },
      data,
      select: projectSelect,
    });

    // Clean up replaced/removed images only after a successful update.
    if (replacedImage) await deleteImage(replacedImage);
    if (removed.length > 0) await deleteImages(removed);

    return updated;
  } catch (error) {
    // Roll back anything just uploaded if the update fails.
    await deleteImages(newScreenshots);
    if (typeof data.image === 'string') await deleteImage(data.image);
    throw error;
  }
}

/** Soft-deletes a project. Images are kept so the record stays restorable. */
export async function deleteProject(id: string): Promise<void> {
  const current = await prisma.project.findFirst({
    where: { id },
    select: { id: true },
  });
  if (!current) throw new NotFoundError('Project not found');

  await prisma.project.delete({ where: { id } });
}

export async function toggleProjectPublish(id: string) {
  const current = await prisma.project.findFirst({
    where: { id },
    select: { id: true, isPublished: true },
  });
  if (!current) throw new NotFoundError('Project not found');

  return prisma.project.update({
    where: { id },
    data: { isPublished: !current.isPublished },
    select: { id: true, isPublished: true },
  });
}
