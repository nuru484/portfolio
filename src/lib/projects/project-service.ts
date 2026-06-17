// src/lib/projects/project-service.ts
import 'server-only';
import prisma, { Prisma } from '@/lib/prisma';
import { uploadImage, deleteImage } from '@/lib/cloudinary';
import { generateSlug } from '@/utils/generate-slug';
import { NotFoundError } from '@/middlewares/error-handler';
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
  isPublished: true,
  displayOrder: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ProjectSelect;

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

/** Public read: published projects, paginated (for the projects page). */
export async function getPublishedProjectsPage(params: {
  page?: number;
  limit?: number;
} = {}) {
  const page = Math.max(params.page ?? 1, 1);
  const limit = Math.min(Math.max(params.limit ?? 5, 1), 50);

  const where: Prisma.ProjectWhereInput = { isPublished: true };

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
) {
  const slug = await uniqueSlug(input.title);

  const uploaded = await uploadImage(image);

  try {
    return await prisma.project.create({
      data: {
        slug,
        title: input.title,
        description: input.description,
        technologies: input.technologies,
        image: uploaded.secure_url,
        githubUrl: input.githubUrl ?? null,
        liveUrl: input.liveUrl ?? null,
        isPublished: input.isPublished ?? false,
        displayOrder: input.displayOrder ?? 0,
      },
      select: projectSelect,
    });
  } catch (error) {
    // Roll back the just-uploaded image if the DB write fails.
    await deleteImage(uploaded.secure_url);
    throw error;
  }
}

export async function updateProject(
  id: string,
  input: IUpdateProjectInput,
  image?: IUploadedFile,
) {
  const current = await prisma.project.findFirst({
    where: { id },
    select: { id: true, image: true },
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
  if (input.isPublished !== undefined) data.isPublished = input.isPublished;
  if (input.displayOrder !== undefined) data.displayOrder = input.displayOrder;

  let replacedImage: string | undefined;
  if (image) {
    const up = await uploadImage(image);
    data.image = up.secure_url;
    replacedImage = current.image;
  }

  const updated = await prisma.project.update({
    where: { id },
    data,
    select: projectSelect,
  });

  // Clean up the replaced image only after a successful update.
  if (replacedImage) await deleteImage(replacedImage);

  return updated;
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
