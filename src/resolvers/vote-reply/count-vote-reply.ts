import { getConnection } from "typeorm";

import { VoteReply } from "../../entities/vote-reply";
import { Reply } from "../../entities/reply";

const countVoteReply = async (id: number) => {
  // Updating vote count field.
  const { voteCount } = await getConnection()
    .getRepository(VoteReply)
    .createQueryBuilder("vote")
    .where("vote.reply.id = :id", { id })
    .select("SUM(vote.voteStatus)", "voteCount")
    .getRawOne();

  if (!voteCount) {
    Reply.update({ id }, { voteCount: 0 });
  } else {
    Reply.update({ id }, { voteCount });
  }
};

export default countVoteReply;
