import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";

import { context } from "../../../types";

import { VotePost } from "../../../entities/vote-post";

import countVotePost from "../count-vote-post";

@Resolver()
export class DeleteVotePostResolver {
  @Mutation(() => Boolean)
  async deleteVotePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: context
  ): Promise<Boolean> {
    try {
      await VotePost.delete({
        post: { id },
        user: { id: req.session.userId },
      });
      await countVotePost(id);
    } catch {
      return false;
    }
    return true;
  }
}
