import { Resolver, FieldResolver, Root, Ctx, Int } from "type-graphql";
import { getConnection } from "typeorm";

import { context } from "../../../types";

import { VoteComment } from "../../../entities/vote-comment";
import { Comment } from "../../../entities/comment";

@Resolver(Comment)
export class VoteStatusResolver {
  @FieldResolver(() => Int)
  async voteStatus(@Root() comment: Comment, @Ctx() { req }: context) {
    const vote = await getConnection()
      .getRepository(VoteComment)
      .createQueryBuilder("vote")
      .where("vote.comment.id = :id", { id: comment.id })
      .andWhere("vote.user.id = :userId", { userId: req.session.userId })
      .getOne();

    if (!vote) {
      return 0;
    }

    return vote.voteStatus;
  }
}
