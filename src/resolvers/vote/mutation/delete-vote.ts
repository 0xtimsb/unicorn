import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";
import { getConnection } from "typeorm";

import { context } from "../../../types";
import { Vote } from "../../../entities/vote";
import { Post } from "../../../entities/post";

@Resolver()
export class DeleteVoteResolver {
  @Mutation(() => Boolean)
  async deleteVote(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: context
  ): Promise<Boolean> {
    await Vote.delete({ post: { id }, user: { id: req.session.userId } });

    // Updating vote count field.
    const { voteCount } = await getConnection()
      .getRepository(Vote)
      .createQueryBuilder("vote")
      .where("vote.post.id = :id", { id })
      .select("SUM(vote.voteStatus)", "voteCount")
      .getRawOne();

    if (!voteCount) {
      Post.update({ id }, { voteCount: 0 });
    } else {
      Post.update({ id }, { voteCount });
    }

    return true;
  }
}
