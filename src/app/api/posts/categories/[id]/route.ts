// src/app/api/posts/categories/[id]/route.ts
import type { NextRequest } from 'next/server';
import { requireUser, requireAdmin } from '@/lib/api-auth';
import { updateCategory, deleteCategory } from '@/lib/posts/category-service';
import { categorySchema } from '@/validations/category-validation';
import { successResponse, handleApiError } from '@/utils/api-response';
import { revalidatePublicBlog } from '@/utils/revalidate';

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Ctx) {
  try {
    await requireUser();
    const { id } = await params;
    const body = categorySchema.parse(await req.json());
    const category = await updateCategory(id, body);
    revalidatePublicBlog();
    return successResponse(category, 'Category updated');
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  try {
    await requireAdmin();
    const { id } = await params;
    await deleteCategory(id);
    revalidatePublicBlog();
    return successResponse({ id }, 'Category removed');
  } catch (err) {
    return handleApiError(err);
  }
}
