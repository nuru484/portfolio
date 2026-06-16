// src/app/api/posts/[id]/toggle-featured/route.ts
import type { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { togglePostFeatured } from '@/lib/posts/post-service';
import { successResponse, handleApiError } from '@/utils/api-response';
import { revalidatePublicBlog } from '@/utils/revalidate';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(_req: NextRequest, { params }: Ctx) {
  try {
    await requireAdmin();
    const { id } = await params;
    const result = await togglePostFeatured(id);
    revalidatePublicBlog();
    return successResponse(result, 'Post feature flag updated');
  } catch (err) {
    return handleApiError(err);
  }
}
