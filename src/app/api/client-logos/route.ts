// src/app/api/client-logos/route.ts
import type { NextRequest } from 'next/server';
import { requireUser } from '@/lib/api-auth';
import {
  listClientLogos,
  createClientLogo,
} from '@/lib/client-logos/client-logo-service';
import { createClientLogoSchema } from '@/validations/client-logo-validation';
import { parseClientLogoFields } from '@/lib/client-logos/client-logo-form';
import { fileToUploaded } from '@/lib/uploads';
import {
  paginatedResponse,
  successResponse,
  handleApiError,
} from '@/utils/api-response';
import { revalidatePublicClientLogos } from '@/utils/revalidate';
import { intParam, boolParam, strParam } from '@/utils/query-params';

export async function GET(req: NextRequest) {
  try {
    await requireUser();

    const sp = req.nextUrl.searchParams;
    const { data, pagination } = await listClientLogos({
      isPublished: boolParam(sp, 'isPublished'),
      search: strParam(sp, 'search'),
      page: intParam(sp, 'page'),
      limit: intParam(sp, 'limit'),
    });

    return paginatedResponse(data, pagination, 'Client logos fetched');
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireUser();

    const formData = await req.formData();
    const fields = createClientLogoSchema.parse(parseClientLogoFields(formData));

    const logo = await fileToUploaded(formData.get('logo'));

    const clientLogo = await createClientLogo(fields, logo);
    revalidatePublicClientLogos();
    return successResponse(clientLogo, 'Client logo created', 201);
  } catch (err) {
    return handleApiError(err);
  }
}
