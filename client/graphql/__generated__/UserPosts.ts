/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserPosts
// ====================================================

export interface UserPosts_userPosts_result_user {
  id: number;
  username: string;
  followed: boolean | null;
}

export interface UserPosts_userPosts_result {
  id: number;
  text: string;
  createdAt: string;
  voteStatus: number;
  voteCount: number;
  user: UserPosts_userPosts_result_user;
}

export interface UserPosts_userPosts {
  result: UserPosts_userPosts_result[];
  hasMore: boolean;
}

export interface UserPosts {
  userPosts: UserPosts_userPosts;
}

export interface UserPostsVariables {
  username: string;
  limit: number;
  cursor?: string | null;
}
