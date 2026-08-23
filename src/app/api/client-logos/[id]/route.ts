// src/app/api/client-logos/[id]/route.ts
import type { NextRequest } from 'next/server';
import { requireUser, requireAdmin } from '@/lib/api-auth';
import {
  getClientLogoById,
  updateClientLogo,
  deleteClientLogo,
} from '@/lib/client-logos/client-logo-service';
import { updateClientLogoSchema } from '@/validations/client-logo-validation';
import { parseClientLogoFields } from '@/lib/client-logos/client-logo-form';
import { fileToUploaded } from '@/lib/uploads';
import { successResponse, handleApiError } from '@/utils/api-response';
import { revalidatePublicClientLogos } from '@/utils/revalidate';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  try {
    await requireUser();
    const { id } = await params;
    const clientLogo = await getClientLogoById(id);
    return successResponse(clientLogo, 'Client logo fetched');
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  try {
    await requireAdmin();
    const { id } = await params;

    const formData = await req.formData();
    const fields = updateClientLogoSchema.parse(parseClientLogoFields(formData));

    const logo = await fileToUploaded(formData.get('logo'));

    const clientLogo = await updateClientLogo(id, fields, logo);
    revalidatePublicClientLogos();
    return successResponse(clientLogo, 'Client logo updated');
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  try {
    await requireAdmin();
    const { id } = await params;
    await deleteClientLogo(id);
    revalidatePublicClientLogos();
    return successResponse({ id }, 'Client logo removed');
  } catch (err) {
    return handleApiError(err);
  }
}
