import { User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email("Invalid email"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      const user = await prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        return new TRPCError({
          code: "CONFLICT",
          message: "Email already exists, please login",
        });
      }

      const { email, name, password } = input;

      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password,
        },
      });

      return newUser;
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email("Invalid email"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      })
    )
    .mutation(async ({ input, ctx: { prisma,res } }) => {

      const user = await prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        return new TRPCError({
          code: "NOT_FOUND",
          message: "User not found, Please register",
        });
      }

      const { password } = input;

      const {password: DBPassword} = user;

      if(password !== DBPassword){
        return new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid password",
        });
      }

      res.setHeader("Set-Cookie", `token=${user.id}; path=/; httponly`)

      return user;
    }),
});
