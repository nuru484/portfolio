// src/app/api/testimonials/route.ts
import type { NextRequest } from 'next/server';
import { requireUser } from '@/lib/api-auth';
import {
  listTestimonials,
  createTestimonial,
} from '@/lib/testimonials/testimonial-service';
import { createTestimonialSchema } from '@/validations/testimonial-validation';
import { parseTestimonialFields } from '@/lib/testimonials/testimonial-form';
import { fileToUploaded } from '@/lib/uploads';
import {
  paginatedResponse,
  successResponse,
  handleApiError,
} from '@/utils/api-response';
import { revalidatePublicTestimonials } from '@/utils/revalidate';
import { intParam, boolParam, strParam } from '@/utils/query-params';

export async function GET(req: NextRequest) {
  try {
    await requireUser();

    const sp = req.nextUrl.searchParams;
    const { data, pagination } = await listTestimonials({
      isPublished: boolParam(sp, 'isPublished'),
      search: strParam(sp, 'search'),
      page: intParam(sp, 'page'),
      limit: intParam(sp, 'limit'),
    });

    return paginatedResponse(data, pagination, 'Testimonials fetched');
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireUser();

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
