/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Users
// ====================================================

export interface Users_users_users {
  id: number;
  username: string;
  followed: boolean | null;
}

export interface Users_users {
  users: Users_users_users[];
  hasMore: boolean;
}

export interface Users {
  users: Users_users | null;
}

export interface UsersVariables {
  limit: number;
  skip: number;
}
