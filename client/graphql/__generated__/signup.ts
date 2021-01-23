/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: signup
// ====================================================

export interface signup_signup_errors {
  field: string;
  message: string;
}

export interface signup_signup_user {
  id: number;
  email: string;
  username: string;
}

export interface signup_signup {
  errors: signup_signup_errors[] | null;
  user: signup_signup_user | null;
}

export interface signup {
  signup: signup_signup;
}

export interface signupVariables {
  data: UserInput;
  code: string;
}
