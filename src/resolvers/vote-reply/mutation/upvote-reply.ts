import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";

import { context } from "../../../types";

import { VoteReply } from "../../../entities/vote-reply";

import countVoteReply from "../count-vote-reply";

@Resolver()
export class UpvoteReplyResolver {
  @Mutation(() => Boolean)
  async upvoteReply(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: context
  ): Promise<Boolean> {
    // If vote does not exist, create or if exist updates it to 1.
    await VoteReply.create({
      reply: { id },
      user: { id: req.session.userId },
      voteStatus: 1,
    }).save();

    countVoteReply(id);

    return true;
  }
}
