import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { QList } from './enitity/qlist.enitity';
// import { GuardContextType } from 'types';

@Injectable()
export class QlistService {
  constructor(private prismaService: PrismaService) {}

  async getQList(userId: string): Promise<QList> {
    return await this.prismaService.qList.findFirst({
      where: {
        userId,
      },
      include: {
        allQuestions: true,
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
}
