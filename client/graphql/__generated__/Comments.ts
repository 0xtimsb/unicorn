/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Comments
// ====================================================

export interface Comments_comments_result_user {
  id: number;
  username: string;
}

export interface Comments_comments_result {
  id: number;
  text: string;
  createdAt: string;
  voteCount: number;
  voteStatus: number;
  user: Comments_comments_result_user;
}

export interface Comments_comments {
  result: Comments_comments_result[];
  hasMore: boolean;
}

export interface Comments {
  comments: Comments_comments;
}

export interface CommentsVariables {
  id: number;
  limit: number;
  cursor?: string | null;
}
