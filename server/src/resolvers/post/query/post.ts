import { Resolver, Query, Arg, Int } from 'type-graphql';

import { Post } from '../../../entities/post';

@Resolver()
export class PostResolver {
  @Query(() => Post, { nullable: true })
  post(@Arg('id', () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne(id, { relations: ['user'] });
  }
}