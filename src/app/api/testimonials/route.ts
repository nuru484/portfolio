// src/app/api/testimonials/route.ts
import type { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import {
  listTestimonials,
  createTestimonial,
} from '@/lib/testimonials/testimonial-service';
import { createTestimonialSchema } from '@/validations/testimonial-validation';
import {
  parseTestimonialFields,
  fileToUploaded,
} from '@/lib/testimonials/testimonial-form';
import {
  paginatedResponse,
  successResponse,
  handleApiError,
} from '@/utils/api-response';
import { revalidatePublicTestimonials } from '@/utils/revalidate';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const sp = req.nextUrl.searchParams;
    const isPublishedParam = sp.get('isPublished');

    const { data, pagination } = await listTestimonials({
      isPublished:
        isPublishedParam === null ? undefined : isPublishedParam === 'true',
      search: sp.get('search') ?? undefined,
      page: sp.get('page') ? Number(sp.get('page')) : undefined,
      limit: sp.get('limit') ? Number(sp.get('limit')) : undefined,
    });

    return paginatedResponse(data, pagination, 'Testimonials fetched');
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const formData = await req.formData();
    const fields = createTestimonialSchema.parse(parseTestimonialFields(formData));

    const image = await fileToUploaded(formData.get('image'));

    const testimonial = await createTestimonial(fields, image);
    revalidatePublicTestimonials();
    return successResponse(testimonial, 'Testimonial created', 201);
  } catch (err) {
    return handleApiError(err);
  }
}
