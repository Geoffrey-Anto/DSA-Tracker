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
}
