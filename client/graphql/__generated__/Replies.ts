/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Replies
// ====================================================

export interface Replies_replies_result_user {
  id: number;
  username: string;
}

export interface Replies_replies_result {
  id: number;
  text: string;
  createdAt: string;
  user: Replies_replies_result_user;
}

export interface Replies_replies {
  result: Replies_replies_result[];
  hasMore: boolean;
}

export interface Replies {
  replies: Replies_replies;
}

export interface RepliesVariables {
  id: number;
  limit: number;
  cursor?: string | null;
}
