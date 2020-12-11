import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";

import { context } from "../../../types";

import { VotePost } from "../../../entities/vote-post";
import { VoteComment } from "../../../entities/vote-comment";
import { VoteReply } from "../../../entities/vote-reply";

import countVotePost from "../count-vote-post";
import countVoteComment from "../count-vote-comment";
import countVoteReply from "../count-vote-reply";

@Resolver()
export class DeleteVoteResolver {
  @Mutation(() => Boolean)
  async deleteVote(
    @Arg("id", () => Int) id: number,
    @Arg("type", () => String) type: "POST" | "COMMENT" | "REPLY",
    @Ctx() { req }: context
  ): Promise<Boolean> {
    switch (type.toUpperCase()) {
      case "POST":
        await VotePost.delete({
          post: { id },
          user: { id: req.session.userId },
        });
        countVotePost(id);
        break;
      case "COMMENT":
        await VoteComment.delete({
          comment: { id },
          user: { id: req.session.userId },
        });
        countVoteComment(id);
        break;
      case "REPLY":
        await VoteReply.delete({
          reply: { id },
          user: { id: req.session.userId },
        });
        countVoteReply(id);
        break;
      default:
        return false;
    }
    return true;
  }
}
