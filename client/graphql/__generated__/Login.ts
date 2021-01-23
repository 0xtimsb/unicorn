/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_errors {
  field: string;
  message: string;
}

export interface Login_login_user {
  id: number;
  email: string;
  username: string;
}

export interface Login_login {
  errors: Login_login_errors[] | null;
  user: Login_login_user | null;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  usernameOrEmail: string;
  password: string;
}
