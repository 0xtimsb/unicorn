import { Resolver, Query, Arg, Int, Field, ObjectType } from 'type-graphql';
import { getConnection } from 'typeorm';

import { Comment } from '../../../entities/comment';

@ObjectType()
class PaginatedComments {
  @Field(() => [Comment])
  result: Comment[];
  @Field()
  hasMore: boolean;
}

@Resolver()
export class CommentsResolver {
  @Query(() => PaginatedComments)
  async comments(
    @Arg("id", () => Int) id: number,
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
  ): Promise<PaginatedComments> {
    limit = Math.min(50, limit);
    const qb = getConnection()
      .getRepository(Comment)
      .createQueryBuilder("comment")
      .innerJoinAndSelect("comment.user", "user")
      .where("comment.post.id = :id", { id })
      .orderBy("comment.createdAt", "DESC")
      .take(limit + 1);

    if (cursor) {
      qb.andWhere("comment.createdAt < :cursor", {
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