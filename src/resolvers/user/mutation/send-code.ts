import { Resolver, Mutation, Arg, Ctx } from "type-graphql";

import { context } from '../../../types';

// import { sendEmail } from "../../../utils/send-email";

@Resolver()
export class SendCodeResolver {
  @Mutation(() => Boolean)
  async sendCode(
    @Arg('email') email: string,
    @Ctx() { redis }: context,
  ) {
    const code = Math.floor(100000 + (Math.random() * 899999)).toString();

    const status = await redis.set(email, code, 'ex', 60 * 60 * 2); // 2 hours.

    // await sendEmail(email, code);
    console.log(email, code);

    return !!status;
  }
}