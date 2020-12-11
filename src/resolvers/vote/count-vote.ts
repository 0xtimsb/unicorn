import { getConnection } from "typeorm";

import { Vote } from "../../entities/vote";
import { Post } from "../../entities/post";

const countVote = async (id: number) => {
  // Updating vote count field.
  const { voteCount } = await getConnection()
    .getRepository(Vote)
    .createQueryBuilder("vote")
    .where("vote.post.id = :id", { id })
    .select("SUM(vote.voteStatus)", "voteCount")
    .getRawOne();

  if (!voteCount) {
    Post.update({ id }, { voteCount: 0 });
  } else {
    Post.update({ id }, { voteCount });
  }
};

export default countVote;
