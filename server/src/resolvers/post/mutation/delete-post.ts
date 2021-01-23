import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";

import { Post } from "../../../entities/post";
import { isAuth } from "../../../middleware/is-auth";
import { context } from "../../../types";

@Resolver()
export class DeletePostResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("id") id: number,
    @Ctx() { req }: context
  ): Promise<boolean> {
    try {
      await Post.delete({ id, user: { id: req.session.userId } });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
