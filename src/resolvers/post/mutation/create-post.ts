import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql';
import { getConnection } from "typeorm";

import { Post } from '../../../entities/post';

import { isAuth } from '../../../middleware/is-auth';
import { context } from '../../../types';

@Resolver()
export class CreatePostResolver {
  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("text") text: string,
    @Ctx() { req }: context
  ): Promise<Post | undefined> {
    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values({ text, user: { id: req.session.userId } })
      .output('*')
      .execute();

    return result.raw[0];
  }
}