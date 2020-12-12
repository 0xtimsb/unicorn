import { getConnection } from "typeorm";

import { VoteComment } from "../../entities/vote-comment";
import { Comment } from "../../entities/comment";

const countVoteComment = async (id: number) => {
  // Updating vote count field.
  const { voteCount } = await getConnection()
    .getRepository(VoteComment)
    .createQueryBuilder("vote")
    .where("vote.comment.id = :id", { id })
    .select("SUM(vote.voteStatus)", "voteCount")
    .getRawOne();

  if (!voteCount) {
    Comment.update({ id }, { voteCount: 0 });
  } else {
    Comment.update({ id }, { voteCount });
  }
};

export default countVoteComment;
