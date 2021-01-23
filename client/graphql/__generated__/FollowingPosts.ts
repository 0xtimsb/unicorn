/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FollowingPosts
// ====================================================

export interface FollowingPosts_followingPosts_result_user {
  id: number;
  username: string;
  followed: boolean | null;
}

export interface FollowingPosts_followingPosts_result {
  id: number;
  text: string;
  createdAt: string;
  voteStatus: number;
  voteCount: number;
  user: FollowingPosts_followingPosts_result_user;
}

export interface FollowingPosts_followingPosts {
  result: FollowingPosts_followingPosts_result[];
  hasMore: boolean;
}

export interface FollowingPosts {
  followingPosts: FollowingPosts_followingPosts;
}

export interface FollowingPostsVariables {
  limit: number;
  cursor?: string | null;
}
