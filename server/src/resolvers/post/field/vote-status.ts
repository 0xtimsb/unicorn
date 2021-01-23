import { Resolver, FieldResolver, Root, Ctx, Int } from "type-graphql";
import { getConnection } from "typeorm";

import { VotePost } from "../../../entities/vote-post";
import { Post } from "../../../entities/post";
import { context } from "../../../types";

@Resolver(Post)
export class VoteStatusResolver {
  @FieldResolver(() => Int)
  async voteStatus(@Root() post: Post, @Ctx() { req }: context) {
    const vote = await getConnection()
      .getRepository(VotePost)
      .createQueryBuilder("vote")
      .where("vote.post.id = :id", { id: post.id })
      .andWhere("vote.user.id = :userId", { userId: req.session.userId })
      .getOne();

    if (!vote) {
      return 0;
    }

    return vote.voteStatus;
  }
}
