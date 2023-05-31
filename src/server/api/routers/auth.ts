import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { loginInputSchema, registerInputSchema } from "~/schema/auth";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .meta({
      description: "Register a new user",
    })
    .input(registerInputSchema)
    .mutation(async ({ input, ctx: { prisma } }) => {
      const user = await prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (user) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already exists, please login",
        });
      }

      const { email, name, password } = input;

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          QuestionBook: {
            create: {},
          },
        },
        select: {
          id: true,
          email: true,
          name: true,
          QuestionBook: true,
        },
      });

      return newUser;
    }),

  login: publicProcedure
    .input(loginInputSchema)
    .mutation(async ({ input, ctx: { prisma, res } }) => {
      const user = await prisma.user.findFirst({
        where: {
          email: input.email,
        },
        include: {
          QuestionBook: true,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Please register first",
        });
      }

      const { password } = input;

      const { password: DBPassword } = user;

      const isPasswordValid = await bcrypt.compare(password, DBPassword);

      if (!isPasswordValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid password",
        });
      }

      const access_token = jwt.sign({ id: user.id }, env.SECRET, {
        expiresIn: "3h",
      });

      const refresh_token = jwt.sign({ id: user.id }, env.SECRET, {
        expiresIn: "7d",
      });

      const h3 = 3 * 60 * 60;

      const d7 = 7 * 24 * 60 * 60;

      res.setHeader("set-cookie", [
        `access_token=${access_token}; Path=/;max-age=${h3};httpOnly=true;SameSite=Strict;Secure=true;`,
        `refresh_token=${refresh_token}; Path=/;max-age=${d7};httpOnly=true;SameSite=Strict;Secure=true;`,
      ]);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        QuestionBook: user.QuestionBook,
      };
    }),
});
