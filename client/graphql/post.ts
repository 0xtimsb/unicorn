import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createPost($text: String!) {
    createPost(text: $text) {
      id
      text
      createdAt
    }
  }
`;

export const FOLLOWING_POSTS = gql`
  query FollowingPosts($limit: Int!, $cursor: String) {
    followingPosts(limit: $limit, cursor: $cursor) {
      result {
        id
        text
        createdAt
        voteStatus
        voteCount
        user {
          id
          username
          followed
        }
      }
      hasMore
    }
  }
`;

export const USER_POSTS = gql`
  query UserPosts($username: String!, $limit: Int!, $cursor: String) {
    userPosts(username: $username, limit: $limit, cursor: $cursor) {
      result {
        id
        text
        createdAt
        voteStatus
        voteCount
        user {
          id
          username
          followed
        }
      }
      hasMore
    }
  }
`;

export const POST = gql`
  query Post($id: Int!) {
    post(id: $id) {
      id
      text
      voteStatus
      voteCount
      createdAt
      user {
        id
        username
        followed
      }
    }
  }
`;
