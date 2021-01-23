import { Resolver, Mutation, Arg, Ctx, UseMiddleware, Int } from 'type-graphql';
import { getConnection } from "typeorm";

import { Comment } from '../../../entities/comment';

import { isAuth } from '../../../middleware/is-auth';
import { context } from '../../../types';

@Resolver()
export class CreateCommentResolver {
  @Mutation(() => Comment, { nullable: true })
  @UseMiddleware(isAuth)
  async createComment(
    @Arg("text", () => String) text: string,
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: context
  ): Promise<Comment | undefined> {
    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Comment)
      .values({ text, user: { id: req.session.userId }, post: { id } })
      .output('*')
      .execute();

    return result.raw[0];
  }
}