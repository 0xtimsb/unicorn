/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateComment
// ====================================================

export interface CreateComment_createComment {
  id: number;
  text: string;
}

export interface CreateComment {
  createComment: CreateComment_createComment | null;
}

export interface CreateCommentVariables {
  text: string;
  id: number;
}
