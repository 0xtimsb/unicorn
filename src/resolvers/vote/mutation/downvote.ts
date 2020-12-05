import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";

import { context } from "../../../types";
import { Vote } from "../../../entities/vote";

@Resolver()
export class DownvoteResolver {
  @Mutation(() => Boolean)
  async downvote(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: context
  ): Promise<Boolean> {
    const exist = await Vote.findOne({
      where: { post: { id }, user: { id: req.session.userId } },
    });

    if (exist) {
      // If vote exist, set vot value to -1.
      await Vote.update(
        { post: { id }, user: { id: req.session.userId } },
        { vote: -1 }
      );
    } else {
      // If vote does not exist. Create new vote and set to 1.
      await Vote.create({
        post: { id },
        user: { id: req.session.userId },
        vote: -1,
      }).save();
    }

    // Considering down-vote will always work in database.
    return true;
  }
}
