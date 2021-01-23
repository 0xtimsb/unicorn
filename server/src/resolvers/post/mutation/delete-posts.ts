import { Resolver, Mutation, Ctx, UseMiddleware } from 'type-graphql';
import { getConnection } from "typeorm";

import { Post } from '../../../entities/post';
import { isAuth } from '../../../middleware/is-auth';
import { context } from '../../../types';

@Resolver()
export class DeletePostsResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePosts(
    @Ctx() { req }: context
  ): Promise<boolean> {
    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Post)
        .where("user.id = :id", { id: req.session.userId })
        .execute();
    } catch {
      return false;
    }
    return true;
  }
}