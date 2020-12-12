import { getConnection } from "typeorm";
import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";

import { context } from "../../../types";

import { VotePost } from "../../../entities/vote-post";

import countVotePost from "../count-vote-post";

@Resolver()
export class DownvotePostResolver {
  @Mutation(() => Boolean)
  async downvotePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: context
  ): Promise<Boolean> {
    try {
      // If vote does not exist, create or if exist updates it to -1.
      const voteStatus = -1;
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(VotePost)
        .values({
          post: { id },
          user: { id: req.session.userId },
          voteStatus,
        })
        .onConflict(
          `("userId", "postId") DO UPDATE SET "voteStatus" = :voteStatus`
        )
        .setParameter("voteStatus", voteStatus)
        .execute();
      await countVotePost(id);
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }
}
