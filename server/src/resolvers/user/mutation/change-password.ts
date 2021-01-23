import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import argon2 from 'argon2';

import { User } from '../../../entities/user';
import { UserResponse } from "../../../objects/user-response";
import { context } from "../../../types";
import { FORGET_PASSWORD_PREFIX } from '../../../constants';

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => UserResponse)
  async changePassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { redis, req }: context
  ): Promise<UserResponse> {

    if (newPassword.length <= 6) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "Length must be greater than 6.",
          },
        ],
      };
    }

    const key = FORGET_PASSWORD_PREFIX + token;

    const userId = await redis.get(key);

    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "Token expired.",
          },
        ],
      };
    }

    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum);

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "User no longer exists.",
          },
        ],
      };
    }

    await User.update({ id: userIdNum }, { password: await argon2.hash(newPassword) });

    await redis.del(key);

    // Login user after change password.
    req.session.userId = user.id;

    return { user };
  }
}