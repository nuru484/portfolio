// src/app/api/client-logos/[id]/toggle-publish/route.ts
import type { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { toggleClientLogoPublish } from '@/lib/client-logos/client-logo-service';
import { successResponse, handleApiError } from '@/utils/api-response';
import { revalidatePublicClientLogos } from '@/utils/revalidate';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(_req: NextRequest, { params }: Ctx) {
  try {
    await requireAdmin();
    const { id } = await params;
    const result = await toggleClientLogoPublish(id);
    revalidatePublicClientLogos();
    return successResponse(result, 'Client logo visibility updated');
  } catch (err) {
    return handleApiError(err);
  }
}
