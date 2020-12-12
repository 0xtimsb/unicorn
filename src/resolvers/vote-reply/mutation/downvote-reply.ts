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
      const vote = new VoteReply();
      vote.user.id = req.session.userId;
      vote.reply.id = id;
      vote.voteStatus = -1;
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(VoteReply)
        .values(vote)
        .onConflict(`("id") DO UPDATE SET "voteStatus" = :voteStatus`)
        .setParameter("voteStatus", vote.voteStatus)
        .execute();
      await countVoteReply(id);
    } catch {
      return false;
    }
    return true;
  }
}
