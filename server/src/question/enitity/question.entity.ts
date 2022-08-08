import { QList } from './../../qlist/enitity/qlist.enitity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Question {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  link: string;

  @Field()
  tags: string;

  @Field(() => Boolean, { defaultValue: false })
  isSolved: boolean;

  @Field(() => QList, { nullable: true })
  allList?: QList;

  @Field({ nullable: true })
  allListId?: string;

  @Field(() => QList, { nullable: true })
  todoList?: QList;

  @Field({ nullable: true })
  todoListId?: string;

  @Field(() => QList, { nullable: true })
  favoriteList?: QList;

  @Field({ nullable: true })
  favoriteListId?: string;
}
