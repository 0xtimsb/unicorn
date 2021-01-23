/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateReply
// ====================================================

export interface CreateReply_createReply {
  id: number;
  text: string;
}

export interface CreateReply {
  createReply: CreateReply_createReply | null;
}

export interface CreateReplyVariables {
  text: string;
  id: number;
  tag: number;
}
