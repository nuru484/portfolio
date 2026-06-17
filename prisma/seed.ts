// prisma/seed.ts
import 'dotenv/config';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { ENV } from '@/config/env';
import { BCRYPT_SALT_ROUNDS } from '@/config/constants';

async function seedAdmin() {
  if (!ENV.ADMIN_SEED_ENABLED) {
    console.log('Admin seed skipped (ADMIN_SEED_ENABLED=false).');
    return;
  }

  const email = ENV.ADMIN_EMAIL.toLowerCase().trim();
  const { ADMIN_PASSWORD: password, ADMIN_FULLNAME: fullname, ADMIN_PHONE: phone } = ENV;

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
 * Seeds the two original testimonials so the public section is populated after
 * the migration to a dynamic source. Idempotent: only runs when the table is
 * empty, so it never duplicates rows or overwrites admin edits.
 */
async function seedTestimonials() {
  const existing = await prisma.testimonial.count();
  if (existing > 0) {
    console.log(`Testimonial seed skipped (${existing} already present).`);
    return;
  }

  await prisma.testimonial.createMany({
    data: [
      {
        author: 'Mumuni Abdul Gafaru (KENZY)',
        role: 'Student, Tamale Technical University',
        quote:
          'Working with Nurudeen was an incredible experience. I needed a complex system for my final-year project, and they delivered it flawlessly, on time, and with all the features I required. Their professionalism and ability to break down technical concepts made the whole process smooth and stress-free. Thanks to their support, I achieved top marks for my project!',
        isPublished: true,
        displayOrder: 0,
      },
      {
        author: 'Zakaria Umar Papaja',
        role: 'Student, Tamale Technical University',
        quote:
          'As a final-year computer science student, I was struggling to bring my project idea to life. Nurudeen not only helped me build a fully functional application but also explained the technical aspects in a way that boosted my confidence. The project exceeded my expectations and received high praise from my professors. Working with Nurudeen was a game-changer for my academic journey!',
        isPublished: true,
        displayOrder: 1,
      },
    ],
  });

  console.log('Testimonial seed: created 2 testimonials.');
}

async function main() {
  await seedAdmin();
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
