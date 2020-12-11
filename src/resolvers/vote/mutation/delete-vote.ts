import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";

import { context } from "../../../types";

import { Vote } from "../../../entities/vote";

import countVote from "../count-vote";

@Resolver()
export class DeleteVoteResolver {
  @Mutation(() => Boolean)
  async deleteVote(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: context
  ): Promise<Boolean> {
    await Vote.delete({ post: { id }, user: { id: req.session.userId } });

    countVote(id);

    return true;
  }
}
