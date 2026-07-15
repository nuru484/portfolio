// src/app/api/projects/route.ts
import type { NextRequest } from 'next/server';
import { requireUser } from '@/lib/api-auth';
import {
  listProjects,
  createProject,
} from '@/lib/projects/project-service';
import { createProjectSchema } from '@/validations/project-validation';
import { parseProjectFields } from '@/lib/projects/project-form';
import { fileToUploaded } from '@/lib/uploads';
import { paginatedResponse, successResponse, handleApiError } from '@/utils/api-response';
import { revalidatePublicProjects } from '@/utils/revalidate';
import { intParam, boolParam, strParam } from '@/utils/query-params';
import { BadRequestError } from '@/middlewares/error-handler';

export async function GET(req: NextRequest) {
  try {
    await requireUser();

    const sp = req.nextUrl.searchParams;
    const { data, pagination } = await listProjects({
      isPublished: boolParam(sp, 'isPublished'),
      search: strParam(sp, 'search'),
      page: intParam(sp, 'page'),
      limit: intParam(sp, 'limit'),
    });

    return paginatedResponse(data, pagination, 'Projects fetched');
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireUser();

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
