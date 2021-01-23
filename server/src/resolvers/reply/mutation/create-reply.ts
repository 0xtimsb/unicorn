import { Resolver, Mutation, Arg, Ctx, UseMiddleware, Int } from "type-graphql";
import { getConnection } from "typeorm";

import { Reply } from "../../../entities/reply";

import { isAuth } from "../../../middleware/is-auth";
import { context } from "../../../types";

@Resolver()
export class CreateReplyResolver {
  @Mutation(() => Reply, { nullable: true })
  @UseMiddleware(isAuth)
  async createReply(
    @Arg("text", () => String) text: string,
    @Arg("id", () => Int) id: number,
    @Arg("tag", () => Int) tag: number,
    @Ctx() { req }: context
  ): Promise<Reply | undefined> {
    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Reply)
      .values({
        text,
        user: { id: req.session.userId },
        comment: { id },
        tagUser: { id: tag },
      })
      .output("*")
      .execute();

    return result.raw[0];
  }
}
