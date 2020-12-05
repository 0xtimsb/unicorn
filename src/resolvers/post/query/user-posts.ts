import { Resolver, Query, Arg, Int } from "type-graphql";
import { getConnection } from "typeorm";

import { Post } from "../../../entities/post";
import { PaginatedPosts } from "../../../objects/paginated-posts";

@Resolver()
export class UserPostsResolver {
  @Query(() => PaginatedPosts)
  async userPosts(
    @Arg("username") username: string,
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedPosts> {
    limit = Math.min(50, limit);

    const qb = getConnection()
      .getRepository(Post)
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .where("user.username = :username", { username })
      .orderBy("post.createdAt", "DESC")
      .take(limit + 1);

    if (cursor) {
      qb.andWhere("post.createdAt < :cursor", {
        cursor: new Date(parseInt(cursor)),
      });
    }

    let result = await qb.getMany();

    let hasMore = false;

    if (result.length > limit) {
      hasMore = true;
      result.pop();
    }

    return { result, hasMore };
  }
}
