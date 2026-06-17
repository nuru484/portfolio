// src/app/api/posts/route.ts
import type { NextRequest } from 'next/server';
import { requireUser } from '@/lib/api-auth';
import { listPosts, createPost } from '@/lib/posts/post-service';
import { createPostSchema } from '@/validations/post-validation';
import { parsePostFields, extractCoverImage } from '@/lib/posts/post-form';
import {
  paginatedResponse,
  successResponse,
  handleApiError,
} from '@/utils/api-response';
import { revalidatePublicBlog } from '@/utils/revalidate';

export async function GET(req: NextRequest) {
  try {
    await requireUser();

    const sp = req.nextUrl.searchParams;
    const bool = (k: string) =>
      sp.get(k) === null ? undefined : sp.get(k) === 'true';

    const { data, pagination } = await listPosts({
      categoryId: sp.get('categoryId') ?? undefined,
      isPublished: bool('isPublished'),
      isFeatured: bool('isFeatured'),
      search: sp.get('search') ?? undefined,
      page: sp.get('page') ? Number(sp.get('page')) : undefined,
      limit: sp.get('limit') ? Number(sp.get('limit')) : undefined,
    });

    return paginatedResponse(data, pagination, 'Posts fetched');
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await requireUser();

    const formData = await req.formData();
    const input = createPostSchema.parse(parsePostFields(formData));
    const { file } = await extractCoverImage(formData);

    const post = await createPost(input, userId, file);
    revalidatePublicBlog(post.slug);
    return successResponse(post, 'Post created', 201);
  } catch (err) {
    return handleApiError(err);
  }
}
