import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "~/server/api/routers/auth";
import { addQuestionRouter } from "./routers/addQuestion";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  addQuestion: addQuestionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
