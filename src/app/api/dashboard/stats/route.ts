// src/app/api/dashboard/stats/route.ts
import { requireAdmin } from '@/lib/api-auth';
import prisma from '@/lib/prisma';
import { successResponse, handleApiError } from '@/utils/api-response';

export async function GET() {
  try {
    await requireAdmin();

    const [
      projectsTotal,
      projectsPublished,
      postsTotal,
      postsPublished,
      testimonialsTotal,
      testimonialsPublished,
      usersTotal,
      usersAdmins,
      recentPosts,
      recentProjects,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { isPublished: true } }),
      prisma.post.count(),
      prisma.post.count({ where: { isPublished: true } }),
      prisma.testimonial.count(),
      prisma.testimonial.count({ where: { isPublished: true } }),
      prisma.user.count(),
      prisma.user.count({ where: { isAdmin: true } }),
      prisma.post.findMany({
        select: { id: true, slug: true, title: true, isPublished: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      prisma.project.findMany({
        select: { id: true, title: true, isPublished: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

    return successResponse(
      {
        projects: {
          total: projectsTotal,
          published: projectsPublished,
          draft: projectsTotal - projectsPublished,
        },
        posts: {
          total: postsTotal,
          published: postsPublished,
          draft: postsTotal - postsPublished,
        },
        testimonials: {
          total: testimonialsTotal,
          published: testimonialsPublished,
        },
        users: { total: usersTotal, admins: usersAdmins },
        recentPosts,
        recentProjects,
      },
      'Dashboard stats fetched',
    );
  } catch (err) {
    return handleApiError(err);
  }
}
