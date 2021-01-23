import { Resolver, Query, Ctx } from "type-graphql";

import { User } from "../../../entities/user";
import { context } from '../../../types';

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: context) {
    if (!req.session.userId) {
      return null;
    }

    return User.findOne(req.session.userId, { relations: ['following', 'followers', 'following.user', 'followers.follower'] });
  }
}