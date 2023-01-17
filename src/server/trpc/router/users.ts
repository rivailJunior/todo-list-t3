import type { Users } from "@prisma/client";
import { randomUUID } from "crypto";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const usersRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.users.findMany();
  }),
  addNewUser: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (req) => {
      const user: Users = {
        name: req.input?.name,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: randomUUID(),
      };
      return await req.ctx.prisma.users.create({ data: user });
    }),
  removeUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (req) => {
      return await req.ctx.prisma.users.delete({
        where: {
          id: req.input?.id,
        },
      });
    }),
  updateUser: publicProcedure
    .input(z.object({ name: z.string(), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.users.update({
        where: {
          id: input?.id,
        },
        data: {
          name: input?.name,
          updatedAt: new Date(),
        },
      });
    }),
});
