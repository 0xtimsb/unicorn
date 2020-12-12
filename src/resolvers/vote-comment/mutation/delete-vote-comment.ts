import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";

import { context } from "../../../types";

import { VoteComment } from "../../../entities/vote-comment";

import countVoteComment from "../count-vote-comment";

@Resolver()
export class DeleteVoteCommentResolver {
  @Mutation(() => Boolean)
  async deleteVoteComment(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: context
  ): Promise<Boolean> {
    try {
      await VoteComment.delete({
        comment: { id },
        user: { id: req.session.userId },
      });
      await countVoteComment(id);
    } catch {
      return false;
    }
    return true;
  }
}
