import { getConnection } from "typeorm";
import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";

import { context } from "../../../types";

import { VotePost } from "../../../entities/vote-post";

import countVotePost from "../count-vote-post";

@Resolver()
export class UpvotePostResolver {
  @Mutation(() => Boolean)
  async upvotePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: context
  ): Promise<Boolean> {
    try {
      // If vote does not exist, create or if exist updates it to 1.
      const vote = new VotePost();
      vote.user.id = req.session.userId;
      vote.post.id = id;
      vote.voteStatus = 1;
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(VotePost)
        .values(vote)
        .onConflict(`("id") DO UPDATE SET "voteStatus" = :voteStatus`)
        .setParameter("voteStatus", vote.voteStatus)
        .execute();
      await countVotePost(id);
    } catch {
      return false;
    }
    return true;
  }
}
