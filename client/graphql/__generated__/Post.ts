/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Post
// ====================================================

export interface Post_post_user {
  id: number;
  username: string;
  followed: boolean | null;
}

export interface Post_post {
  id: number;
  text: string;
  voteStatus: number;
  voteCount: number;
  createdAt: string;
  user: Post_post_user;
}

export interface Post {
  post: Post_post | null;
}

export interface PostVariables {
  id: number;
}
