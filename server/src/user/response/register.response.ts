import { User } from '../enitity/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegisterResponse {
  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => User, { nullable: true })
  data?: User;
}
