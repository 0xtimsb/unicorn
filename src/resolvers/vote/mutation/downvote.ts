import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";

import { context } from "../../../types";

import { VotePost } from "../../../entities/vote-post";
import { VoteComment } from "../../../entities/vote-comment";
import { VoteReply } from "../../../entities/vote-reply";

import countVotePost from "../count-vote-post";
import countVoteComment from "../count-vote-comment";
import countVoteReply from "../count-vote-reply";

@Resolver()
export class DownvoteResolver {
  @Mutation(() => Boolean)
  async downvote(
    @Arg("id", () => Int) id: number,
    @Arg("type", () => String) type: string,
    @Ctx() { req }: context
  ): Promise<Boolean> {
    // If vote does not exist, create or if exist updates it to -1.
    switch (type.toUpperCase()) {
      case "POST":
        await VotePost.create({
          post: { id },
          user: { id: req.session.userId },
          voteStatus: -1,
        }).save();
        await countVotePost(id);
        break;
      case "COMMENT":
        await VoteComment.create({
          comment: { id },
          user: { id: req.session.userId },
          voteStatus: -1,
        }).save();
        await countVoteComment(id);
        break;
      case "REPLY":
        await VoteReply.create({
          reply: { id },
          user: { id: req.session.userId },
          voteStatus: -1,
        }).save();
        await countVoteReply(id);
        break;
      default:
        return false;
    }
    return true;
  }
}
