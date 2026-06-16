// src/app/api/posts/categories/route.ts
import type { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { listCategories, createCategory } from '@/lib/posts/category-service';
import { categorySchema } from '@/validations/category-validation';
import { successResponse, handleApiError } from '@/utils/api-response';
import { revalidatePublicBlog } from '@/utils/revalidate';

export async function GET() {
  try {
    await requireAdmin();
    const categories = await listCategories();
    return successResponse(categories, 'Categories fetched');
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = categorySchema.parse(await req.json());
    const category = await createCategory(body);
    revalidatePublicBlog();
    return successResponse(category, 'Category created', 201);
  } catch (err) {
    return handleApiError(err);
  }
}
