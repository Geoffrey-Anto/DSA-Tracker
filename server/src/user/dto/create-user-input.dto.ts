import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInputDTO {
  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  email: string;
}
