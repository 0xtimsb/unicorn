import { getConnection } from "typeorm";
import { Resolver, FieldResolver, Root, Ctx } from "type-graphql";

import { Follow } from "../../../entities/follow";
import { User } from "../../../entities/user";
import { context } from "../../../types";

@Resolver(User)
export class FollowedResolver {
  @FieldResolver(() => Boolean)
  async followed(@Root() user: User, @Ctx() { req }: context) {
    const follow = await getConnection()
      .getRepository(Follow)
      .createQueryBuilder("follow")
      .where("follow.user.id = :id", { id: user.id })
      .andWhere("follow.follower.id = :userId", { userId: req.session.userId })
      .getOne();

    if (follow) {
      return true;
    }

    return false;
  }
}
