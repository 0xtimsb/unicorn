/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user {
  id: number;
  username: string;
  followed: boolean | null;
}

export interface User {
  user: User_user | null;
}

export interface UserVariables {
  username: string;
}
