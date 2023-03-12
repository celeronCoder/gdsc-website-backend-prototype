import { EventType } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const eventDetails = z.object({
  name: z.string(),
  dateFrom: z.date(),
  dateTill: z.date(),
  tag: z.nativeEnum(EventType),
});

export const eventRouter = createTRPCRouter({
  create: protectedProcedure
    .input(eventDetails)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.event.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany();
  }),
  getAllCreatedByUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.event.findFirst({ where: { id: input.id } });
    }),
  updateEvent: protectedProcedure
    .input(eventDetails.merge(z.object({ id: z.string().cuid() })))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.event.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    }),
  deleteEvent: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.event.delete({ where: { ...input } });
    }),
});
