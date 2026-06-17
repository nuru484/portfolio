// src/lib/testimonials/testimonial-service.ts
import 'server-only';
import prisma, { Prisma } from '@/lib/prisma';
import { uploadImage, deleteImage } from '@/lib/cloudinary';
import { NotFoundError } from '@/middlewares/error-handler';
import type {
  ICreateTestimonialInput,
  IUpdateTestimonialInput,
} from '@/validations/testimonial-validation';
import type { IUploadedFile } from '@/types/cloudinary.types';
import type {
  ITestimonial,
  ITestimonialSocial,
  ITestimonialsQueryParams,
} from '@/types/testimonial.types';

const testimonialSelect = {
  id: true,
  author: true,
  role: true,
  quote: true,
  image: true,
  socials: true,
  isPublished: true,
  displayOrder: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.TestimonialSelect;

type TestimonialRow = Prisma.TestimonialGetPayload<{
  select: typeof testimonialSelect;
}>;

/** Coerces the stored JSON `socials` column into a typed array. */
function normalize(row: TestimonialRow): ITestimonial {
  const socials = Array.isArray(row.socials)
    ? (row.socials as unknown as ITestimonialSocial[])
    : [];
  return { ...row, socials };
}

export async function listTestimonials(params: ITestimonialsQueryParams) {
  const page = Math.max(params.page ?? 1, 1);
  const limit = Math.min(Math.max(params.limit ?? 20, 1), 100);

  const where: Prisma.TestimonialWhereInput = {};
  if (typeof params.isPublished === 'boolean') where.isPublished = params.isPublished;
  if (params.search) {
    where.OR = [
      { author: { contains: params.search, mode: 'insensitive' } },
      { role: { contains: params.search, mode: 'insensitive' } },
      { quote: { contains: params.search, mode: 'insensitive' } },
    ];
  }

  const [rows, total] = await Promise.all([
    prisma.testimonial.findMany({
      where,
      select: testimonialSelect,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.testimonial.count({ where }),
  ]);

  return {
    data: rows.map(normalize),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) || 1 },
  };
}

/** Public read: published testimonials in display order (no auth). */
export async function getPublishedTestimonials(limit?: number) {
  const rows = await prisma.testimonial.findMany({
    where: { isPublished: true },
    select: testimonialSelect,
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    ...(limit ? { take: limit } : {}),
  });
  return rows.map(normalize);
}

export async function getTestimonialById(id: string) {
  const row = await prisma.testimonial.findFirst({
    where: { id },
    select: testimonialSelect,
  });
  if (!row) throw new NotFoundError('Testimonial not found');
  return normalize(row);
}

export async function createTestimonial(
  input: ICreateTestimonialInput,
  image?: IUploadedFile,
) {
  const uploaded = image ? await uploadImage(image) : null;

  try {
    const row = await prisma.testimonial.create({
      data: {
        author: input.author,
        role: input.role,
        quote: input.quote,
        image: uploaded?.secure_url ?? null,
        socials: (input.socials ?? []) as unknown as Prisma.InputJsonValue,
        isPublished: input.isPublished ?? false,
        displayOrder: input.displayOrder ?? 0,
      },
      select: testimonialSelect,
    });
    return normalize(row);
  } catch (error) {
    // Roll back the just-uploaded image if the DB write fails.
    if (uploaded) await deleteImage(uploaded.secure_url);
    throw error;
  }
}

export async function updateTestimonial(
  id: string,
  input: IUpdateTestimonialInput,
  image?: IUploadedFile,
) {
  const current = await prisma.testimonial.findFirst({
    where: { id },
    select: { id: true, image: true },
  });
  if (!current) throw new NotFoundError('Testimonial not found');

  const data: Prisma.TestimonialUpdateInput = {};
  if (input.author !== undefined) data.author = input.author;
  if (input.role !== undefined) data.role = input.role;
  if (input.quote !== undefined) data.quote = input.quote;
  if (input.socials !== undefined) {
    data.socials = input.socials as unknown as Prisma.InputJsonValue;
  }
  if (input.isPublished !== undefined) data.isPublished = input.isPublished;
  if (input.displayOrder !== undefined) data.displayOrder = input.displayOrder;

  let replacedImage: string | null = null;
  if (image) {
    const up = await uploadImage(image);
    data.image = up.secure_url;
    replacedImage = current.image;
  }

  const row = await prisma.testimonial.update({
    where: { id },
    data,
    select: testimonialSelect,
  });

  // Clean up the replaced image only after a successful update.
  if (replacedImage) await deleteImage(replacedImage);

  return normalize(row);
}

/** Soft-deletes a testimonial. Image is kept so the record stays restorable. */
export async function deleteTestimonial(id: string): Promise<void> {
  const current = await prisma.testimonial.findFirst({
    where: { id },
    select: { id: true },
  });
  if (!current) throw new NotFoundError('Testimonial not found');

  await prisma.testimonial.delete({ where: { id } });
}

export async function toggleTestimonialPublish(id: string) {
  const current = await prisma.testimonial.findFirst({
    where: { id },
    select: { id: true, isPublished: true },
  });
  if (!current) throw new NotFoundError('Testimonial not found');

  return prisma.testimonial.update({
    where: { id },
    data: { isPublished: !current.isPublished },
    select: { id: true, isPublished: true },
  });
}
