import { Resolver, Mutation, Ctx, UseMiddleware } from "type-graphql";

import { User } from "../../../entities/user";
import { isAuth } from "../../../middleware/is-auth";
import { context } from "../../../types";

@Resolver()
export class DeleteUserResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUser(@Ctx() { req }: context): Promise<boolean> {
    try {
      await User.delete({ id: req.session.userId });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
