import { Question } from './../../question/enitity/question.entity';
import { User } from './../../user/enitity/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class QList {
  @Field(() => String)
  id: string;

  @Field(() => Boolean)
  isPublic: boolean;

  @Field(() => User)
  user?: User;

  @Field(() => String)
  userId?: string;

  @Field(() => [Question], { nullable: true })
  allQuestions?: Question[];

  @Field(() => [Question], { nullable: true })
  todoQuestions?: Question[];

  @Field(() => [Question], { nullable: true })
  favoriteQuestions?: Question[];
}
