import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const tableRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ baseId: z.string().min(1), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.table.create({
        data: {
          name: input.name,
          baseId: input.baseId
        },
      });
    }),
  
    getAll: protectedProcedure
      .input(z.object({ baseId: z.string().min(1) }))
      .query(async ({ ctx, input }) => {
        return ctx.db.table.findMany({
          where: { baseId: input.baseId }
        });
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.string().min(1) }))
      .query(async ({ ctx, input }) => {
        return ctx.db.table.findUnique({
          where: { id: input.id }
        });
      }),
});