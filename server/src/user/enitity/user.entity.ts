import { QList } from './../../qlist/enitity/qlist.enitity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => QList, { nullable: true })
  qList?: QList;
}
