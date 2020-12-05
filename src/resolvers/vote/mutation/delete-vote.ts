import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";

import { context } from "../../../types";
import { Vote } from "../../../entities/vote";

@Resolver()
export class DeleteVoteResolver {
  @Mutation(() => Boolean)
  async deleteVote(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: context
  ): Promise<Boolean> {
    try {
      await Vote.delete({ post: { id }, user: { id: req.session.userId } });
    } catch {
      return false;
    }

    return true;
  }
}
