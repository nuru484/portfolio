// src/lib/client-logos/client-logo-service.ts
import 'server-only';
import prisma, { Prisma } from '@/lib/prisma';
import { uploadImage, deleteImage } from '@/lib/cloudinary';
import { NotFoundError, ValidationError } from '@/middlewares/error-handler';
import type {
  ICreateClientLogoInput,
  IUpdateClientLogoInput,
} from '@/validations/client-logo-validation';
import type { IUploadedFile } from '@/types/cloudinary.types';
import type { IClientLogosQueryParams } from '@/types/client-logo.types';

const clientLogoSelect = {
  id: true,
  name: true,
  logo: true,
  websiteUrl: true,
  isPublished: true,
  displayOrder: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ClientLogoSelect;

/** Logos live in their own Cloudinary folder, away from project imagery. */
const LOGO_FOLDER = 'portfolio/clients';

export async function listClientLogos(params: IClientLogosQueryParams) {
  const page = Math.max(params.page ?? 1, 1);
  const limit = Math.min(Math.max(params.limit ?? 20, 1), 100);

  const where: Prisma.ClientLogoWhereInput = {};
  if (typeof params.isPublished === 'boolean') {
    where.isPublished = params.isPublished;
  }
  if (params.search) {
    where.name = { contains: params.search, mode: 'insensitive' };
  }

  const [data, total] = await Promise.all([
    prisma.clientLogo.findMany({
      where,
      select: clientLogoSelect,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.clientLogo.count({ where }),
  ]);

  return {
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) || 1 },
  };
}

/** Public read: published logos in display order (no auth). */
export async function getPublishedClientLogos() {
  return prisma.clientLogo.findMany({
    where: { isPublished: true },
    select: clientLogoSelect,
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
  });
}

export async function getClientLogoById(id: string) {
  const row = await prisma.clientLogo.findFirst({
    where: { id },
    select: clientLogoSelect,
  });
  if (!row) throw new NotFoundError('Client logo not found');
  return row;
}

export async function createClientLogo(
  input: ICreateClientLogoInput,
  logo: IUploadedFile | undefined,
) {
  // The strip is nothing but logos, so unlike a testimonial's optional
  // portrait this one cannot be skipped.
  if (!logo) throw new ValidationError('A logo image is required.');

  const uploaded = await uploadImage(logo, { folder: LOGO_FOLDER });

  try {
    return await prisma.clientLogo.create({
      data: {
        name: input.name,
        logo: uploaded.secure_url,
        websiteUrl: input.websiteUrl ?? null,
        isPublished: input.isPublished ?? false,
        displayOrder: input.displayOrder ?? 0,
      },
      select: clientLogoSelect,
    });
  } catch (error) {
    // Roll back the upload if the row never lands.
    await deleteImage(uploaded.secure_url);
    throw error;
  }
}

export async function updateClientLogo(
  id: string,
  input: IUpdateClientLogoInput,
  logo?: IUploadedFile,
) {
  const current = await prisma.clientLogo.findFirst({
    where: { id },
    select: { id: true, logo: true },
  });
  if (!current) throw new NotFoundError('Client logo not found');

  const data: Prisma.ClientLogoUpdateInput = {};
  if (input.name !== undefined) data.name = input.name;
  if (input.websiteUrl !== undefined) {
    data.websiteUrl = input.websiteUrl ?? null;
  }
  if (input.isPublished !== undefined) data.isPublished = input.isPublished;
  if (input.displayOrder !== undefined) data.displayOrder = input.displayOrder;

  let replaced: string | undefined;
  try {
    if (logo) {
      const uploaded = await uploadImage(logo, { folder: LOGO_FOLDER });
      data.logo = uploaded.secure_url;
      replaced = current.logo;
    }

    const updated = await prisma.clientLogo.update({
      where: { id },
      data,
      select: clientLogoSelect,
    });

    // Only drop the old file once the row actually points elsewhere.
    if (replaced) await deleteImage(replaced);

    return updated;
  } catch (error) {
    if (typeof data.logo === 'string') await deleteImage(data.logo);
    throw error;
  }
}

/** Soft-deletes a logo. The image is kept so the record stays restorable. */
export async function deleteClientLogo(id: string): Promise<void> {
  const current = await prisma.clientLogo.findFirst({
    where: { id },
    select: { id: true },
  });
  if (!current) throw new NotFoundError('Client logo not found');

  await prisma.clientLogo.delete({ where: { id } });
}

export async function toggleClientLogoPublish(id: string) {
  const current = await prisma.clientLogo.findFirst({
    where: { id },
    select: { id: true, isPublished: true },
  });
  if (!current) throw new NotFoundError('Client logo not found');

  return prisma.clientLogo.update({
    where: { id },
    data: { isPublished: !current.isPublished },
    select: { id: true, isPublished: true },
  });
}
