import { z } from 'zod';
import { router, publicProcedure } from './trpc';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * tRPC router for Post CRUD operations
 * - All input validated with zod
 * - Prisma used for DB access
 * - Errors handled and typed
 */
export const postRouter = router({
  /** List all posts */
  list: publicProcedure.query(async () => {
    return prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: true },
    });
  }),

  /** Get a post by ID */
  get: publicProcedure.input(z.object({ id: z.string().cuid() })).query(async ({ input }) => {
    const post = await prisma.post.findUnique({
      where: { id: input.id },
      include: { author: true },
    });
    if (!post) throw new Error('Post not found');
    return post;
  }),

  /** Create a new post */
  create: publicProcedure.input(z.object({
    title: z.string().min(1),
    body: z.string().min(1),
    authorId: z.string().cuid().optional(),
  })).mutation(async ({ input }) => {
    return prisma.post.create({
      data: {
        title: input.title,
        body: input.body,
        authorId: input.authorId,
      },
    });
  }),

  /** Update a post */
  update: publicProcedure.input(z.object({
    id: z.string().cuid(),
    title: z.string().min(1).optional(),
    body: z.string().min(1).optional(),
  })).mutation(async ({ input }) => {
    return prisma.post.update({
      where: { id: input.id },
      data: {
        title: input.title,
        body: input.body,
      },
    });
  }),

  /** Delete a post */
  delete: publicProcedure.input(z.object({ id: z.string().cuid() })).mutation(async ({ input }) => {
    return prisma.post.delete({ where: { id: input.id } });
  }),
});
