import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionService {
  constructor(private prismaService: PrismaService) {}

  async deleteQuestion(id: string): Promise<boolean> {
    try {
      await this.prismaService.question.delete({
        where: {
          id,
        },
        select: {
          id: true,
        },
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async toggleSolved(id: string) {
    try {
      const ques = await this.prismaService.question.findUnique({
        where: {
          id: id,
        },
        select: {
          isSolved: true,
        },
      });
      if (!ques) {
        return false;
      }
      const isSolved = ques.isSolved;
      await this.prismaService.question.update({
        where: {
          id: id,
        },
        data: {
          isSolved: !isSolved,
        },
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
