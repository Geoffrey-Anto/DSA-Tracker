import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './../enitity/user.entity';

@ObjectType()
export class LoginResponse {
  @Field(() => User, { nullable: true })
  data?: User;

  @Field(() => String, { nullable: true })
  message?: string;
}
