import { router, publicProcedure } from './trpc';
import { z } from 'zod';
import { postRouter } from './postRouter';

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return {
        greeting: `Hello, ${input.name ?? 'world'}!`,
      };
    }),
  post: postRouter,
});

export type AppRouter = typeof appRouter;
