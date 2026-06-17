// prisma/seed.ts
import 'dotenv/config';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { ENV } from '@/config/env';
import { BCRYPT_SALT_ROUNDS } from '@/config/constants';
import { generateSlug } from '@/utils/generate-slug';
import { calculateReadTime } from '@/utils/read-time-calculator';
import {
  demoCategories,
  demoProjects,
  demoPosts,
  demoPostContent,
  demoTestimonials,
} from './demo-data';

async function seedAdmin() {
  if (!ENV.ADMIN_SEED_ENABLED) {
    console.log('Admin seed skipped (ADMIN_SEED_ENABLED=false).');
    return;
  }

  const email = ENV.ADMIN_EMAIL.toLowerCase().trim();
  const {
    ADMIN_PASSWORD: password,
    ADMIN_FULLNAME: fullname,
    ADMIN_PHONE: phone,
  } = ENV;

  // findFirst (not findUnique) so soft-deleted rows are excluded by the extension.
  const existing = await prisma.user.findFirst({
    where: { email },
    select: { id: true, email: true },
  });

  if (existing && !ENV.ADMIN_SEED_FORCE_UPDATE) {
    console.log(
      `Admin seed: user already exists (${email}). No changes (force update disabled).`,
    );
    return;
  }

  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

  await prisma.user.upsert({
    where: { email },
    create: {
      email,
      password: hashedPassword,
      fullname,
      isAdmin: true,
      ...(phone ? { phone } : {}),
    },
    update: {
      password: hashedPassword,
      isAdmin: true,
      deletedAt: null,
      ...(fullname ? { fullname } : {}),
      ...(phone ? { phone } : {}),
    },
  });

  console.log(
    existing
      ? `Admin seed: updated admin (${email}) because ADMIN_SEED_FORCE_UPDATE=true.`
      : `Admin seed: created admin (${email}).`,
  );
}

/**
 * Seeds demo categories, projects, and posts for local development. Idempotent:
 * each record is upserted by its unique slug, so re-running never duplicates
 * rows and it coexists with any data you already created.
 */
async function seedContent() {
  // Categories
  const categories: { id: string; slug: string }[] = [];
  for (const name of demoCategories) {
    const slug = generateSlug(name);
    const category = await prisma.category.upsert({
      where: { slug },
      create: { name, slug },
      update: {},
      select: { id: true, slug: true },
    });
    categories.push(category);
  }
  console.log(`Content seed: ${categories.length} categories ready.`);

  // Projects
  for (let i = 0; i < demoProjects.length; i++) {
    const p = demoProjects[i];
    const slug = generateSlug(p.title);
    await prisma.project.upsert({
      where: { slug },
      create: {
        slug,
        title: p.title,
        description: p.description,
        technologies: p.technologies,
        image: `https://picsum.photos/seed/${slug}/1200/800`,
        githubUrl: p.githubUrl ?? null,
        liveUrl: p.liveUrl ?? null,
        isPublished: true,
        displayOrder: i,
      },
      update: {},
    });
  }
  console.log(`Content seed: ${demoProjects.length} demo projects ready.`);

  // Posts — need an author.
  const author = await prisma.user.findFirst({
    where: { isAdmin: true },
    select: { id: true },
  });
  if (!author) {
    console.log('Content seed: no admin user found — skipping posts.');
    return;
  }

  for (let i = 0; i < demoPosts.length; i++) {
    const post = demoPosts[i];
    const slug = generateSlug(post.title);
    const content = demoPostContent(post.title);
    const category = categories[i % categories.length];
    await prisma.post.upsert({
      where: { slug },
      create: {
        slug,
        title: post.title,
        excerpt: post.excerpt,
        content,
        readTime: calculateReadTime(content),
        coverImage: `https://picsum.photos/seed/${slug}/1200/675`,
        isPublished: true,
        isFeatured: i < 2,
        publishDate: new Date(Date.now() - i * 86_400_000),
        authorId: author.id,
        categoryId: category.id,
      },
      update: {},
    });
  }
  console.log(`Content seed: ${demoPosts.length} demo posts ready.`);
}

/**
 * Seeds demo testimonials. Idempotent by author — only creates the ones that
 * are not already present, so re-running is safe.
 */
async function seedTestimonials() {
  let created = 0;
  for (let i = 0; i < demoTestimonials.length; i++) {
    const t = demoTestimonials[i];
    const existing = await prisma.testimonial.findFirst({
      where: { author: t.author },
      select: { id: true },
    });
    if (existing) continue;
    await prisma.testimonial.create({
      data: {
        author: t.author,
        role: t.role,
        quote: t.quote,
        isPublished: true,
        displayOrder: 10 + i,
      },
    });
    created++;
  }
  console.log(`Testimonial seed: created ${created} new testimonials.`);
}

async function main() {
  await seedAdmin();
  await seedContent();
  await seedTestimonials();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error('Seed failed:', err);
    await prisma.$disconnect();
    process.exit(1);
  });
