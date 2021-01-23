import { ObjectType, Field } from 'type-graphql';
import { Post } from '../entities/post';

@ObjectType()
export class PaginatedPosts {
  @Field(() => [Post])
  result: Post[];
  @Field()
  hasMore: boolean;
}