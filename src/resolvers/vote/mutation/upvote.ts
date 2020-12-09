import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";
import { getConnection } from "typeorm";

import { context } from "../../../types";
import { Vote } from "../../../entities/vote";
import { Post } from "../../../entities/post";

@Resolver()
export class UpvoteResolver {
  @Mutation(() => Boolean)
  async upvote(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: context
  ): Promise<Boolean> {
    const exist = await Vote.findOne({
      where: { post: { id }, user: { id: req.session.userId } },
    });

    if (exist) {
      // If vote exist, set vot value to 1.
      await Vote.update(
        { post: { id }, user: { id: req.session.userId } },
        { voteStatus: 1 }
      );
    } else {
      // If vote does not exist. Create new vote and set to 1.
      await Vote.create({
        post: { id },
        user: { id: req.session.userId },
        voteStatus: 1,
      }).save();
    }

    // Updating vote count field.
    const { voteCount } = await getConnection()
      .getRepository(Vote)
      .createQueryBuilder("vote")
      .where("vote.post.id = :id", { id })
      .select("SUM(vote.voteStatus)", "voteCount")
      .getRawOne();

    Post.update({ id }, { voteCount });

    return true;
  }
}
