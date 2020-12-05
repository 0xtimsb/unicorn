import { buildSchema } from "type-graphql";

import { FollowResolver } from "../resolvers/follow/mutation/follow";
import { UnfollowResolver } from "../resolvers/follow/mutation/unfollow";

import { IsFollowingResolver } from "../resolvers/follow/query/is-following";
import { FollowersResolver } from "../resolvers/follow/query/followers";
import { FollowingResolver } from "../resolvers/follow/query/following";

import { CreateCommentResolver } from "../resolvers/comment/mutation/create-comment";
import { CommentsResolver } from "../resolvers/comment/query/comments";

import { CreatePostResolver } from "../resolvers/post/mutation/create-post";
import { DeletePostResolver } from "../resolvers/post/mutation/delete-post";
import { UpdatePostResolver } from "../resolvers/post/mutation/update-post";
import { DeletePostsResolver } from "../resolvers/post/mutation/delete-posts";

import { PostResolver } from "../resolvers/post/query/post";
import { UserPostsResolver } from "../resolvers/post/query/user-posts";
import { FollowingPostsResolver } from "../resolvers/post/query/following-posts";

import { EmailResolver } from "../resolvers/user/field/email";
import { ChangePasswordResolver } from "../resolvers/user/mutation/change-password";
import { ForgotPasswordResolver } from "../resolvers/user/mutation/forgot-password";
import { LoginResolver } from "../resolvers/user/mutation/login";
import { LogoutResolver } from "../resolvers/user/mutation/logout";
import { SendCodeResolver } from "../resolvers/user/mutation/send-code";
import { SignupResolver } from "../resolvers/user/mutation/signup";

import { MeResolver } from "../resolvers/user/query/me";
import { UserResolver } from "../resolvers/user/query/user";
import { UsersResolver } from "../resolvers/user/query/users";

import { EmailExistResolver } from "../resolvers/user/query/email-exist";
import { UsernameExistResolver } from "../resolvers/user/query/username-exist";

import { UpvoteResolver } from "../resolvers/vote/mutation/upvote";
import { DownvoteResolver } from "../resolvers/vote/mutation/downvote";
import { DeleteVoteResolver } from "../resolvers/vote/mutation/delete-vote";

import { VoteStatusResolver } from "../resolvers/post/field/vote-status";
import { VoteCountResolver } from "../resolvers/post/field/vote-count";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      MeResolver,
      SignupResolver,
      LoginResolver,
      LogoutResolver,
      SendCodeResolver,
      ForgotPasswordResolver,
      ChangePasswordResolver,
      EmailResolver,

      UserResolver,
      UsersResolver,

      EmailExistResolver,
      UsernameExistResolver,

      CreateCommentResolver,
      CommentsResolver,

      CreatePostResolver,
      DeletePostResolver,
      UpdatePostResolver,
      DeletePostsResolver,

      PostResolver,
      UserPostsResolver,
      FollowingPostsResolver,

      FollowResolver,
      UnfollowResolver,
      IsFollowingResolver,

      FollowersResolver,
      FollowingResolver,

      UpvoteResolver,
      DownvoteResolver,
      DeleteVoteResolver,

      VoteStatusResolver,
      VoteCountResolver,
    ],
    validate: false,
  });
