import { getConnection } from "typeorm";
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
    try {
      // If vote does not exist, create or if exist updates it to 1.
      const vote = new VoteComment();
      vote.user.id = req.session.userId;
      vote.comment.id = id;
      vote.voteStatus = 1;
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(VoteComment)
        .values(vote)
        .onConflict(`("id") DO UPDATE SET "voteStatus" = :voteStatus`)
        .setParameter("voteStatus", vote.voteStatus)
        .execute();
      await countVoteComment(id);
    } catch {
      return false;
    }
    return true;
  }
}
