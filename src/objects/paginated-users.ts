import { ObjectType, Field } from 'type-graphql';
import { User } from '../entities/user';

@ObjectType()
export class PaginatedUsers {
  @Field(() => [User])
  users: User[];
  @Field()
  hasMore: boolean;
}