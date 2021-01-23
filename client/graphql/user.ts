import { gql } from "@apollo/client";

// Query
export const ME = gql`
  query Me {
    me {
      id
      email
      username
    }
  }
`;

export const USER = gql`
  query User($username: String!) {
    user(username: $username) {
      id
      username
      followed
    }
  }
`;

export const USERS = gql`
  query Users($limit: Int!, $skip: Int!) {
    users(limit: $limit, skip: $skip) {
      users {
        id
        username
        followed
      }
      hasMore
    }
  }
`;

export const EMAIL_EXIST = gql`
  query EmailExist($email: String!) {
    emailExist(email: $email)
  }
`;

export const USERNAME_EXIST = gql`
  query UsernameExist($username: String!) {
    usernameExist(username: $username)
  }
`;

// Mutation
export const SEND_CODE = gql`
  mutation SendCode($email: String!) {
    sendCode(email: $email)
  }
`;

export const SIGNUP = gql`
  mutation signup($data: UserInput!, $code: String!) {
    signup(data: $data, code: $code) {
      errors {
        field
        message
      }
      user {
        id
        email
        username
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      errors {
        field
        message
      }
      user {
        id
        email
        username
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
