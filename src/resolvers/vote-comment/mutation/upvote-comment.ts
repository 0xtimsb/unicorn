import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";

import { context } from "../../../types";

import { VoteComment } from "../../../entities/vote-comment";

import countVoteComment from "../count-vote-comment";

@Resolver()
export class UpvoteCommentResolver {
  @Mutation(() => Boolean)
  async upvoteComment(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: context
  ): Promise<Boolean> {
    // If vote does not exist, create or if exist updates it to 1.
    await VoteComment.create({
      comment: { id },
      user: { id: req.session.userId },
      voteStatus: 1,
    }).save();

    countVoteComment(id);

    return true;
  }
}
