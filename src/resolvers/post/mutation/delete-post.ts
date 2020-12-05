import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql';
import { getConnection } from "typeorm";

import { Post } from '../../../entities/post';
import { isAuth } from '../../../middleware/is-auth';
import { context } from '../../../types';

@Resolver()
export class DeletePostResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("id") id: number,
    @Ctx() { req }: context
  ): Promise<boolean> {
    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Post)
        .where("id = :id", { id })
        .andWhere("user.id = :id", { id: req.session.userId })
        .execute();
    } catch {
      return false;
    }
    return true;
  }
}