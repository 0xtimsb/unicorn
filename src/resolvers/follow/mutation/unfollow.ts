import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";

import { context } from '../../../types';
import { Follow } from '../../../entities/follow';

@Resolver()
export class UnfollowResolver {
  @Mutation(() => Boolean)
  async unfollow(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: context
  ): Promise<Boolean> {
    try {
      await Follow.delete({ user: { id }, follower: { id: req.session.userId } });
    } catch {
      return false;
    }

    return true;
  }
}