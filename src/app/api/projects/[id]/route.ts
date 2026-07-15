// src/app/api/projects/[id]/route.ts
import type { NextRequest } from 'next/server';
import { requireUser, requireAdmin } from '@/lib/api-auth';
import {
  getProjectById,
  updateProject,
  deleteProject,
} from '@/lib/projects/project-service';
import { updateProjectSchema } from '@/validations/project-validation';
import { parseProjectFields } from '@/lib/projects/project-form';
import { fileToUploaded } from '@/lib/uploads';
import { successResponse, handleApiError } from '@/utils/api-response';
import { revalidatePublicProjects } from '@/utils/revalidate';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  try {
    await requireUser();
    const { id } = await params;
    const project = await getProjectById(id);
    return successResponse(project, 'Project fetched');
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  try {
    await requireAdmin();
    const { id } = await params;

    const formData = await req.formData();
    const fields = updateProjectSchema.parse(parseProjectFields(formData));

    const image = await fileToUploaded(formData.get('image'));

    const project = await updateProject(id, fields, image);
    revalidatePublicProjects();
    return successResponse(project, 'Project updated');
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  try {
    await requireAdmin();
    const { id } = await params;
    await deleteProject(id);
    revalidatePublicProjects();
    return successResponse({ id }, 'Project removed');
  } catch (err) {
    return handleApiError(err);
  }
}
