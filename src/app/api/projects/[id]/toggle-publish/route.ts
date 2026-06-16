// src/app/api/projects/[id]/toggle-publish/route.ts
import type { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { toggleProjectPublish } from '@/lib/projects/project-service';
import { successResponse, handleApiError } from '@/utils/api-response';
import { revalidatePublicProjects } from '@/utils/revalidate';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(_req: NextRequest, { params }: Ctx) {
  try {
    await requireAdmin();
    const { id } = await params;
    const result = await toggleProjectPublish(id);
    revalidatePublicProjects();
    return successResponse(result, 'Project visibility updated');
  } catch (err) {
    return handleApiError(err);
  }
}
