import { Question } from './../question/enitity/question.entity';
import { CreateQuestionInputDTO } from './dto/create-question-input.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { QList } from './enitity/qlist.enitity';

@Injectable()
export class QlistService {
  constructor(private prismaService: PrismaService) {}

  async getQList(userId: string): Promise<QList> {
    return await this.prismaService.qList.findFirst({
      where: {
        userId,
      },
      include: {
        allQuestions: {
          orderBy: {
            id: 'desc',
          },
        },
        favoriteQuestions: true,
        todoQuestions: true,
        // user: true,
      },
    });
  }

  async isPublic(id: string): Promise<boolean> {
    const qlist = await this.prismaService.qList.findUnique({
      where: {
        id,
      },
      select: {
        isPublic: true,
      },
    });
    if (!qlist) {
      return false;
    }
    return qlist.isPublic;
  }

  async changeVisibility(id: string, isPublic: boolean): Promise<boolean> {
    try {
      await this.prismaService.qList.update({
        where: {
          userId: id,
        },
        data: {
          isPublic,
        },
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async addQuestion(
    context: any,
    createQuestionInput: CreateQuestionInputDTO,
  ): Promise<Question> {
    const qListId = context.req.user.qListId;
    const newQuestion = await this.prismaService.question.create({
      data: {
        title: createQuestionInput.title,
        link: createQuestionInput.link,
        tags: createQuestionInput.tags,
        isSolved: false,
        allListId: qListId,
      },
    });
    return newQuestion;
  }

  async toggleTodoQuestion(context: any, questionId: string): Promise<boolean> {
    const qListId = context.req.user.qListId;
    if (!qListId) return false;
    const question = await this.prismaService.question.findUnique({
      where: {
        id: questionId,
      },
      select: {
        todoListId: true,
      },
    });
    if (!question) return false;
    if (question.todoListId === null) {
      await this.prismaService.question.update({
        where: {
          id: questionId,
        },
        data: {
          todoListId: qListId,
        },
      });
    } else {
      await this.prismaService.question.update({
        where: {
          id: questionId,
        },
        data: {
          todoListId: null,
        },
      });
    }
    return true;
  }

  async toggleFavoriteQuestion(
    context: any,
    questionId: string,
  ): Promise<boolean> {
    const qListId = context.req.user.qListId;
    if (!qListId) return false;
    const question = await this.prismaService.question.findUnique({
      where: {
        id: questionId,
      },
      select: {
        favoriteListId: true,
      },
    });
    if (!question) return false;
    if (question.favoriteListId === null) {
      await this.prismaService.question.update({
        where: {
          id: questionId,
        },
        data: {
          favoriteListId: qListId,
        },
      });
    } else {
      await this.prismaService.question.update({
        where: {
          id: questionId,
        },
        data: {
          favoriteListId: null,
        },
      });
    }
    return true;
  }
}
