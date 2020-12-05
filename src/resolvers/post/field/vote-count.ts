import { Resolver, FieldResolver, Root, Int } from "type-graphql";
import { getConnection } from "typeorm";

import { Vote } from "../../../entities/vote";
import { Post } from "../../../entities/post";

@Resolver(Post)
export class VoteCountResolver {
  @FieldResolver(() => Int)
  async voteCount(@Root() post: Post) {
    const upvoteCount = await getConnection()
      .getRepository(Vote)
      .createQueryBuilder("vote")
      .where("vote.post.id = :id", { id: post.id })
      .andWhere("vote.vote = :status", { status: 1 })
      .getCount();

    const downvoteCount = await getConnection()
      .getRepository(Vote)
      .createQueryBuilder("vote")
      .where("vote.post.id = :id", { id: post.id })
      .andWhere("vote.vote = :status", { status: -1 })
      .getCount();

    return upvoteCount - downvoteCount;
  }
}
