import { Resolver, Query, Arg, Int, Field, ObjectType } from "type-graphql";
import { getConnection } from "typeorm";

import { Reply } from "../../../entities/reply";

@ObjectType()
class PaginatedReplies {
  @Field(() => [Reply])
  result: Reply[];
  @Field()
  hasMore: boolean;
}

@Resolver()
export class RepliesResolver {
  @Query(() => PaginatedReplies)
  async replies(
    @Arg("id", () => Int) id: number,
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedReplies> {
    limit = Math.min(50, limit);
    const qb = getConnection()
      .getRepository(Reply)
      .createQueryBuilder("reply")
      .innerJoinAndSelect("reply.user", "user")
      .innerJoinAndSelect("reply.tagUser", "tagUser")
      .where("reply.comment.id = :id", { id })
      .orderBy("reply.createdAt", "DESC")
      .take(limit + 1);

    if (cursor) {
      qb.andWhere("reply.createdAt < :cursor", {
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
