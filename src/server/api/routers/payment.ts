import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const paymentRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email().min(1),
        amount: z.coerce.number(),
        status: z.enum(["pending", "confirmed", "canceled"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.payment.create({
        data: {
          email: input.email,
          amount: input.amount,
          status: input.status,
        },
      });
    }),

  getWithPagination: publicProcedure.query(({ ctx }) => {
    return ctx.db.payment.findMany();
  }),

  delete: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.payment.delete({
        where: { id: input.id },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        email: z.string().email().min(1),
        status: z.string().min(1),
        amount: z.coerce.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.payment.update({
        where: { id: input.id },
        data: {
          email: input.email,
          status: input.status,
          amount: input.amount,
        },
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(({ ctx, input }) => {
      return ctx.db.payment.findFirst({
        where: { id: input.id },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.payment.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
