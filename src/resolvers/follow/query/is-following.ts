import { Resolver, Query, Arg, Int, Ctx } from 'type-graphql';
import { getConnection } from 'typeorm';

import { Follow } from '../../../entities/follow';
import { context } from '../../../types';

@Resolver()
export class IsFollowingResolver {
  @Query(() => Boolean)
  async isFollowing(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: context
  ): Promise<Boolean> {

    const follow = await getConnection()
      .getRepository(Follow)
      .createQueryBuilder("follow")
      .where("follow.user.id = :id", { id })
      .andWhere("follow.follower.id = :followerId", { followerId: req.session.userId })
      .getOne();

    if (follow) {
      return true;
    }

    return false;
  }
}