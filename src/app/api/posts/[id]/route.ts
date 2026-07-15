// src/app/api/posts/[id]/route.ts
import type { NextRequest } from 'next/server';
import { requireUser, requireAdmin } from '@/lib/api-auth';
import { getPostById, updatePost, deletePost } from '@/lib/posts/post-service';
import { updatePostSchema } from '@/validations/post-validation';
import { parsePostFields, extractCoverImage } from '@/lib/posts/post-form';
import { successResponse, handleApiError } from '@/utils/api-response';
import { revalidatePublicBlog } from '@/utils/revalidate';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  try {
    await requireUser();
    const { id } = await params;
    const post = await getPostById(id);
    return successResponse(post, 'Post fetched');
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  try {
    const { userId, isAdmin } = await requireUser();
    const { id } = await params;

    const formData = await req.formData();
    const input = updatePostSchema.parse(parsePostFields(formData));
    const { file, cleared } = await extractCoverImage(formData);

    const { post, previousSlug } = await updatePost(
      id,
      input,
      { userId, isAdmin },
      { coverFile: file, coverCleared: cleared },
    );
    revalidatePublicBlog(post.slug);
    if (previousSlug !== post.slug) revalidatePublicBlog(previousSlug);
    return successResponse(post, 'Post updated');
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  try {
    await requireAdmin();
    const { id } = await params;
    await deletePost(id);
    revalidatePublicBlog();
    return successResponse({ id }, 'Post removed');
  } catch (err) {
    return handleApiError(err);
  }
}
