// src/app/api/posts/[id]/toggle-publish/route.ts
import type { NextRequest } from 'next/server';
import { requireUser } from '@/lib/api-auth';
import { togglePostPublish } from '@/lib/posts/post-service';
import { successResponse, handleApiError } from '@/utils/api-response';
import { revalidatePublicBlog } from '@/utils/revalidate';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(_req: NextRequest, { params }: Ctx) {
  try {
    await requireUser();
    const { id } = await params;
    const result = await togglePostPublish(id);
    revalidatePublicBlog();
    return successResponse(result, 'Post visibility updated');
  } catch (err) {
    return handleApiError(err);
  }
}
