import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";

import { context } from "../../../types";
import { Follow } from "../../../entities/follow";

@Resolver()
export class FollowResolver {
  @Mutation(() => Boolean)
  async follow(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: context
  ): Promise<Boolean> {
    // Disabling self-follow
    if (id === req.session.userId) {
      return false;
    }

    try {
      await Follow.create({
        user: { id },
        follower: { id: req.session.userId },
      }).save();
    } catch {
      return false;
    }

    return true;
  }
}
