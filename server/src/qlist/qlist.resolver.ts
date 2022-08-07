import { QList } from './enitity/qlist.enitity';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QlistService } from './qlist.service';
// import { GuardContextType } from 'types';

@Resolver()
export class QlistResolver {
  constructor(private qlistService: QlistService) {}

  @Query(() => QList)
  @UseGuards(JwtAuthGuard)
  async getQList(@Context() ctx: any): Promise<QList> {
    return this.qlistService.getQList(ctx.user?.userId as string);
  }

  @Query(() => Boolean)
  async isPublic(@Args('id') id: string): Promise<boolean> {
    return this.qlistService.isPublic(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async changeVisibility(
    @Args('isPublic') isPublic: boolean,
    @Context() ctx: any,
  ): Promise<boolean> {
    return this.qlistService.changeVisibility(
      ctx.user?.userId as string,
      isPublic,
    );
  }
}
