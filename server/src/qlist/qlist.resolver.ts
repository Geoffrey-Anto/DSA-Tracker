import { Question } from './../question/enitity/question.entity';
import { QList } from './enitity/qlist.enitity';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QlistService } from './qlist.service';
import { CreateQuestionInputDTO } from './dto/create-question-input.dto';
// import { GuardContextType } from 'types';

@Resolver()
export class QlistResolver {
  constructor(private qlistService: QlistService) {}

  @Query(() => QList)
  @UseGuards(JwtAuthGuard)
  async getQList(@Context() ctx: any): Promise<QList> {
    return this.qlistService.getQList(ctx.req.user?.userId as string);
  }

  @Query(() => Boolean)
  async isPublic(@Args('id') id: string): Promise<boolean> {
    return this.qlistService.isPublic(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async changeVisibility(
    @Context() ctx: any,
    @Args('isPublic') isPublic: boolean,
  ): Promise<boolean> {
    return this.qlistService.changeVisibility(
      ctx.req.user?.userId as string,
      isPublic,
    );
  }

  @Mutation(() => Question)
  @UseGuards(JwtAuthGuard)
  async addQuestion(
    @Context() ctx: any,
    @Args('createQuestionInput')
    createQuestionInput: CreateQuestionInputDTO,
  ): Promise<Question> {
    return this.qlistService.addQuestion(ctx, createQuestionInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async toggleTodoQuestion(
    @Context() ctx: any,
    @Args('questionId') questionId: string,
  ): Promise<boolean> {
    return await this.qlistService.toggleTodoQuestion(ctx, questionId);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async toggleFavoriteQuestion(
    @Context() ctx: any,
    @Args('questionId') questionId: string,
  ): Promise<boolean> {
    return await this.qlistService.toggleFavoriteQuestion(ctx, questionId);
  }
}
