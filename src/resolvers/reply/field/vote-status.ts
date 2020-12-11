import { Resolver, FieldResolver, Root, Ctx, Int } from "type-graphql";
import { getConnection } from "typeorm";

import { context } from "../../../types";

import { VoteReply } from "../../../entities/vote-reply";
import { Reply } from "../../../entities/reply";

@Resolver(Reply)
export class VoteStatusResolver {
  @FieldResolver(() => Int)
  async voteStatus(@Root() reply: Reply, @Ctx() { req }: context) {
    const vote = await getConnection()
      .getRepository(VoteReply)
      .createQueryBuilder("vote")
      .where("vote.reply.id = :id", { id: reply.id })
      .andWhere("vote.user.id = :userId", { userId: req.session.userId })
      .getOne();

    if (!vote) {
      return 0;
    }

    return vote.voteStatus;
  }
}
