import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from 'type-graphql';
import { getConnection, getRepository } from 'typeorm';

import { Post } from '../../../entities/post';

import { isAuth } from '../../../middleware/is-auth';
import { context } from '../../../types';

@Resolver()
export class UpdatePostResolver {
  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(isAuth)
  async updatePost(
    @Arg("id") id: number,
    @Arg("text") text: string,
    @Ctx() { req }: context
  ): Promise<Post | undefined> {
    // Update answer with id, checking userId is correct.
    await getConnection()
      .createQueryBuilder()
      .update(Post)
      .set({ text })
      .where("id = :id", { id })
      .andWhere("user.id = :id", { id: req.session.userId })
      .execute();

    // This code below, adds 'user' query inside 'post'.
    const post = await getRepository(Post)
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .where("post.id = :id", { id })
      .getOne();

    return post;
  }
}

