import { getConnection } from "typeorm";
import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";

import { context } from "../../../types";

import { VoteComment } from "../../../entities/vote-comment";

import countVoteComment from "../count-vote-comment";

@Resolver()
export class DownvoteCommentResolver {
  @Mutation(() => Boolean)
  async downvoteComment(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: context
  ): Promise<Boolean> {
    try {
      // If vote does not exist, create or if exist updates it to -1.
      const voteStatus = -1;
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(VoteComment)
        .values({
          comment: { id },
          user: { id: req.session.userId },
          voteStatus,
        })
        .onConflict(
          `("userId", "commentId") DO UPDATE SET "voteStatus" = :voteStatus`
        )
        .setParameter("voteStatus", voteStatus)
        .execute();
      await countVoteComment(id);
    } catch {
      return false;
    }
    return true;
  }
}
