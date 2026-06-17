// src/app/api/testimonials/[id]/route.ts
import type { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import {
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} from '@/lib/testimonials/testimonial-service';
import { updateTestimonialSchema } from '@/validations/testimonial-validation';
import {
  parseTestimonialFields,
  fileToUploaded,
} from '@/lib/testimonials/testimonial-form';
import { successResponse, handleApiError } from '@/utils/api-response';
import { revalidatePublicTestimonials } from '@/utils/revalidate';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  try {
    await requireAdmin();
    const { id } = await params;
    const testimonial = await getTestimonialById(id);
    return successResponse(testimonial, 'Testimonial fetched');
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  try {
    await requireAdmin();
    const { id } = await params;

    const formData = await req.formData();
    const fields = updateTestimonialSchema.parse(parseTestimonialFields(formData));

    const image = await fileToUploaded(formData.get('image'));

    const testimonial = await updateTestimonial(id, fields, image);
    revalidatePublicTestimonials();
    return successResponse(testimonial, 'Testimonial updated');
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  try {
    await requireAdmin();
    const { id } = await params;
    await deleteTestimonial(id);
    revalidatePublicTestimonials();
    return successResponse({ id }, 'Testimonial removed');
  } catch (err) {
    return handleApiError(err);
  }
}
