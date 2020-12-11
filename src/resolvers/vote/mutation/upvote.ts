import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";

import { context } from "../../../types";

import { Vote } from "../../../entities/vote";

import countVote from "../count-vote";

@Resolver()
export class UpvoteResolver {
  @Mutation(() => Boolean)
  async upvote(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: context
  ): Promise<Boolean> {
    // If vote does not exist, create or if exist updates it to 1.
    await Vote.create({
      post: { id },
      user: { id: req.session.userId },
      voteStatus: 1,
    }).save();

    countVote(id);

    return true;
  }
}
