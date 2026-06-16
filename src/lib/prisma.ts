// src/lib/prisma.ts
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

/**
 * Soft-delete extension for models that carry a `deletedAt` column.
 *
 * - `delete` / `deleteMany` are rewritten to set `deletedAt` instead of
 *   physically removing the row.
 * - `findMany` / `findFirst` / `count` default to excluding soft-deleted rows
 *   (pass `deletedAt` explicitly in `where` to include them).
 *
 * `findUnique` is intentionally NOT filtered — Prisma only allows unique
 * fields in its `where`. Use `findFirst` when you need a soft-delete-aware
 * lookup (see `lib/auth` / `lib/users`).
 */
function withSoftDelete(base: PrismaClient) {
  return base.$extends({
    name: 'soft-delete',
    query: {
      user: {
        delete: ({ args }) =>
          base.user.update({
            where: args.where,
            data: { deletedAt: new Date() },
          }),
        deleteMany: ({ args }) =>
          base.user.updateMany({
            where: args.where ?? {},
            data: { deletedAt: new Date() },
          }),
        findMany: ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        findFirst: ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        count: ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
      },
      project: {
        delete: ({ args }) =>
          base.project.update({
            where: args.where,
            data: { deletedAt: new Date() },
          }),
        deleteMany: ({ args }) =>
          base.project.updateMany({
            where: args.where ?? {},
            data: { deletedAt: new Date() },
          }),
        findMany: ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        findFirst: ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        count: ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
      },
      post: {
        delete: ({ args }) =>
          base.post.update({
            where: args.where,
            data: { deletedAt: new Date() },
          }),
        deleteMany: ({ args }) =>
          base.post.updateMany({
            where: args.where ?? {},
            data: { deletedAt: new Date() },
          }),
        findMany: ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        findFirst: ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        count: ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
      },
      category: {
        delete: ({ args }) =>
          base.category.update({
            where: args.where,
            data: { deletedAt: new Date() },
          }),
        deleteMany: ({ args }) =>
          base.category.updateMany({
            where: args.where ?? {},
            data: { deletedAt: new Date() },
          }),
        findMany: ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        findFirst: ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        count: ({ args, query }) => {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
      },
    },
  });
}

const createPrismaClient = () => withSoftDelete(new PrismaClient({ adapter }));

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma?: ExtendedPrismaClient;
};

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;

export * from '../../generated/prisma/client';
