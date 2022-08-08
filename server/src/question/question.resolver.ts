import { QuestionService } from './question.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class QuestionResolver {
  constructor(private questionService: QuestionService) {}

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteQuestion(@Args('questionId') id: string): Promise<boolean> {
    return this.questionService.deleteQuestion(id);
  }
}
