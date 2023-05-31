import { TRPCError } from "@trpc/server";
import { authedProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";

export const addQuestionRouter = createTRPCRouter({
  createChapter: authedProcedure
    .input(
      z.object({
        chapterName: z.string().min(5).describe("Question Sheet Name"),
        chapterDesc: z
          .string()
          .min(5)
          .describe("Question Sheet Description")
          .nullable(),
      })
    )
    .query(
      async ({
        input: { chapterDesc, chapterName },
        ctx: { prisma, userId },
      }) => {
        const userBook = await prisma.questionBook.findUnique({
          where: {
            userId: userId,
          },
        });

        if (!userBook) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User book not found",
          });
        }

        const chapter = await prisma.questionChapter.create({
          data: {
            title: chapterName,
            description: chapterDesc,
            QuestionBook: {
              connect: {
                id: userBook.id,
              },
            },
          },
        });

        return chapter;
      }
    ),

  addSingleQuestionToChapter: authedProcedure
    .input(
      z.object({
        chapterId: z.string().min(5).describe("Chapter Id"),
        question: z.object({
          title: z.string().min(5).describe("Question Title"),
          description: z
            .string()
            .min(5)
            .describe("Question Description")
            .optional(),
          complexity: z
            .enum(["EASY", "MEDIUM", "HARD"])
            .describe("Question Complexity"),
          link: z.string().min(5).describe("Question Link"),
          category: z.string().min(5).optional().describe("Question Category"),
        }),
      })
    )
    .query(
      async ({ input: { chapterId, question }, ctx: { prisma, userId } }) => {
        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            QuestionBook: {
              include: {
                QuestionChapter: true,
              },
            },
          },
        });

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }

        if (!user.QuestionBook) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User book not found",
          });
        }

        const isChapterPresent = user.QuestionBook.QuestionChapter.find(
          (chapter) => chapter.id === chapterId
        );

        if (!isChapterPresent) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Chapter not found",
          });
        }

        const newQuestion = await prisma.question.create({
          data: {
            ...question,
            QuestionChapter: {
              connect: {
                id: chapterId,
              },
            },
          },
        });

        return newQuestion;
      }
    ),
});
