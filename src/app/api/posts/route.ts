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
import { intParam, boolParam, strParam } from '@/utils/query-params';

export async function GET(req: NextRequest) {
  try {
    await requireUser();

    const sp = req.nextUrl.searchParams;
    const { data, pagination } = await listPosts({
      categoryId: strParam(sp, 'categoryId'),
      isPublished: boolParam(sp, 'isPublished'),
      isFeatured: boolParam(sp, 'isFeatured'),
      search: strParam(sp, 'search'),
      page: intParam(sp, 'page'),
      limit: intParam(sp, 'limit'),
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
