// src/lib/posts/category-service.ts
import 'server-only';
import prisma from '@/lib/prisma';
import { generateSlug } from '@/utils/generate-slug';
import { NotFoundError, ConflictError } from '@/middlewares/error-handler';
import type { ICategoryInput } from '@/validations/category-validation';

const categorySelect = {
  id: true,
  name: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
} as const;

async function uniqueCategorySlug(
  name: string,
  excludeId?: string,
): Promise<string> {
  const base = generateSlug(name) || 'category';
  let slug = base;
  let n = 1;
  while (true) {
    const existing = await prisma.category.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (!existing || existing.id === excludeId) return slug;
    slug = `${base}-${++n}`;
  }
}

/** Lists categories with a count of their published posts. */
export async function listCategories() {
  const [categories, grouped] = await Promise.all([
    prisma.category.findMany({ select: categorySelect, orderBy: { name: 'asc' } }),
    prisma.post.groupBy({
      by: ['categoryId'],
      where: { isPublished: true, deletedAt: null, categoryId: { not: null } },
      _count: { _all: true },
    }),
  ]);

  const counts = new Map(grouped.map((g) => [g.categoryId, g._count._all]));
  return categories.map((c) => ({ ...c, postsCount: counts.get(c.id) ?? 0 }));
}

export async function createCategory(input: ICategoryInput) {
  const name = input.name.trim();

  // findUnique is NOT soft-delete filtered → also catches archived names.
  const existing = await prisma.category.findUnique({
    where: { name },
    select: { id: true },
  });
  if (existing) throw new ConflictError('A category with that name already exists.');

  return prisma.category.create({
    data: { name, slug: await uniqueCategorySlug(name) },
    select: categorySelect,
  });
}

export async function updateCategory(id: string, input: ICategoryInput) {
  const current = await prisma.category.findFirst({
    where: { id },
    select: { id: true },
  });
  if (!current) throw new NotFoundError('Category not found');

  const name = input.name.trim();
  const dup = await prisma.category.findUnique({
    where: { name },
    select: { id: true },
  });
  if (dup && dup.id !== id) {
    throw new ConflictError('A category with that name already exists.');
  }

  return prisma.category.update({
    where: { id },
    data: { name, slug: await uniqueCategorySlug(name, id) },
    select: categorySelect,
  });
}

/** Soft-deletes a category and detaches it from its posts. */
export async function deleteCategory(id: string): Promise<void> {
  const current = await prisma.category.findFirst({
    where: { id },
    select: { id: true },
  });
  if (!current) throw new NotFoundError('Category not found');

  await prisma.post.updateMany({
    where: { categoryId: id },
    data: { categoryId: null },
  });
  await prisma.category.delete({ where: { id } });
}
