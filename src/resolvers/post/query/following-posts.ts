
import { Resolver, Query, Arg, Int, Ctx } from 'type-graphql';
import { getConnection } from 'typeorm';

import { context } from '../../../types';

import { Follow } from '../../../entities/follow';
import { Post } from '../../../entities/post';

import { PaginatedPosts } from '../../../objects/paginated-posts';

@Resolver()
export class FollowingPostsResolver {
  @Query(() => PaginatedPosts)
  async followingPosts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: context
  ): Promise<PaginatedPosts> {
    limit = Math.min(50, limit);

    const follows = await getConnection()
      .getRepository(Follow)
      .createQueryBuilder("follow")
      .leftJoinAndSelect("follow.user", "user")
      .where("follow.follower.id = :id", { id: req.session.userId })
      .getMany();

    const userIds = follows.map((follow) => follow.user.id);

    userIds.push(req.session.userId);

    const qb = getConnection()
      .getRepository(Post)
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .where("post.user.id IN (:...ids)", { ids: userIds })
      .orderBy("post.createdAt", "DESC")
      .take(limit + 1);

    if (cursor) {
      qb.andWhere("post.createdAt < :cursor", {
        cursor: new Date(parseInt(cursor))
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