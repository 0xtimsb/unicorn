/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createPost
// ====================================================

export interface createPost_createPost {
  id: number;
  text: string;
  createdAt: string;
}

export interface createPost {
  createPost: createPost_createPost | null;
}

export interface createPostVariables {
  text: string;
}
