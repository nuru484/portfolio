// src/app/api/projects/route.ts
import type { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import {
  listProjects,
  createProject,
} from '@/lib/projects/project-service';
import { createProjectSchema } from '@/validations/project-validation';
import { parseProjectFields, fileToUploaded } from '@/lib/projects/project-form';
import { paginatedResponse, successResponse, handleApiError } from '@/utils/api-response';
import { revalidatePublicProjects } from '@/utils/revalidate';
import { BadRequestError } from '@/middlewares/error-handler';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const sp = req.nextUrl.searchParams;
    const isPublishedParam = sp.get('isPublished');

    const { data, pagination } = await listProjects({
      isPublished:
        isPublishedParam === null ? undefined : isPublishedParam === 'true',
      search: sp.get('search') ?? undefined,
      page: sp.get('page') ? Number(sp.get('page')) : undefined,
      limit: sp.get('limit') ? Number(sp.get('limit')) : undefined,
    });

    return paginatedResponse(data, pagination, 'Projects fetched');
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const formData = await req.formData();
    const fields = createProjectSchema.parse(parseProjectFields(formData));

    const image = await fileToUploaded(formData.get('image'));
    if (!image) {
      throw new BadRequestError('A project image is required.');
    }

    const project = await createProject(fields, image);
    revalidatePublicProjects();
    return successResponse(project, 'Project created', 201);
  } catch (err) {
    return handleApiError(err);
  }
}
