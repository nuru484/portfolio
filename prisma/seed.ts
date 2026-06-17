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


async function main() {
  await seedAdmin();
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
