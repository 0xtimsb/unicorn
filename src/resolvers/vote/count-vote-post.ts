import { getConnection } from "typeorm";

import { VotePost } from "../../entities/vote-post";
import { Post } from "../../entities/post";

const countVotePost = async (id: number) => {
  // Updating vote count field.
  const { voteCount } = await getConnection()
    .getRepository(VotePost)
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

export default countVotePost;
