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
}
