import { getConnection } from "typeorm";
import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";

import { context } from "../../../types";

import { VoteReply } from "../../../entities/vote-reply";

import countVoteReply from "../count-vote-reply";

@Resolver()
export class DownvoteReplyResolver {
  @Mutation(() => Boolean)
  async downvoteReply(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: context
  ): Promise<Boolean> {
    try {
      // If vote does not exist, create or if exist updates it to -1.
      const voteStatus = -1;
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(VoteReply)
        .values({
          reply: { id },
          user: { id: req.session.userId },
          voteStatus,
        })
        .onConflict(
          `("userId", "replyId") DO UPDATE SET "voteStatus" = :voteStatus`
        )
        .setParameter("voteStatus", voteStatus)
        .execute();
      await countVoteReply(id);
    } catch {
      return false;
    }
    return true;
  }
}
