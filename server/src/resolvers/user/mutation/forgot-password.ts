import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { v4 } from "uuid";

import { User } from "../../../entities/user";
import { context } from '../../../types';
import { FORGET_PASSWORD_PREFIX } from '../../../constants';
import { sendEmail } from "../../../utils/send-email";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { redis }: context,
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return true;
    }

    const token = v4();
    await redis.set(FORGET_PASSWORD_PREFIX + token, user.id, 'ex', 1000 * 60 * 60 * 24); // 1 day expiration.

    await sendEmail(
      email,
      `http://localhost:3000/user/change-password/${token}`
    );

    return true;
  }
}