import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";

import { context } from "../../../types";

import { VoteReply } from "../../../entities/vote-reply";

import countVoteReply from "../count-vote-reply";

@Resolver()
export class DeleteVoteReplyResolver {
  @Mutation(() => Boolean)
  async deleteVoteReply(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: context
  ): Promise<Boolean> {
    try {
      await VoteReply.delete({
        reply: { id },
        user: { id: req.session.userId },
      });
      await countVoteReply(id);
    } catch {
      return false;
    }
    return true;
  }
}
