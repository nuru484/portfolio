// src/app/api/testimonials/[id]/toggle-publish/route.ts
import type { NextRequest } from 'next/server';
import { requireUser } from '@/lib/api-auth';
import { toggleTestimonialPublish } from '@/lib/testimonials/testimonial-service';
import { successResponse, handleApiError } from '@/utils/api-response';
import { revalidatePublicTestimonials } from '@/utils/revalidate';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(_req: NextRequest, { params }: Ctx) {
  try {
    await requireUser();
    const { id } = await params;
    const result = await toggleTestimonialPublish(id);
    revalidatePublicTestimonials();
    return successResponse(result, 'Testimonial visibility updated');
  } catch (err) {
    return handleApiError(err);
  }
}
