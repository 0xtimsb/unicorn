import { Resolver, Query, Arg, Int } from "type-graphql";
import { getConnection } from "typeorm";

import { Post } from "../../../entities/post";

import { PaginatedPosts } from "../../../objects/paginated-posts";

@Resolver()
export class TrendingPostsResolver {
  @Query(() => PaginatedPosts)
  async trendingPosts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) _: string | null
  ): Promise<PaginatedPosts> {
    limit = Math.min(50, limit);

    // NOT WORKING RIGHT NOW

    const qb = getConnection()
      .getRepository(Post)
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .orderBy("post.voteCount", "DESC")
      .take(limit + 1);

    // if (cursor) {
    //   qb.andWhere("post.createdAt < :cursor", {
    //     cursor: new Date(parseInt(cursor)),
    //   });
    // }

    let result = await qb.getMany();

    let hasMore = false;

    if (result.length > limit) {
      hasMore = true;
      result.pop();
    }

    return { result, hasMore };
  }
}
