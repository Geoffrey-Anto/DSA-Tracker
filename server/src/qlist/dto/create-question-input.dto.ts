import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateQuestionInputDTO {
  @Field()
  title: string;

  @Field()
  link: string;

  @Field()
  tags: string;

  @Field(() => Boolean)
  isSolved: boolean;
}
