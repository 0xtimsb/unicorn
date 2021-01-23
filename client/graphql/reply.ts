import { gql } from "@apollo/client";

export const REPLIES = gql`
  query Replies($id: Int!, $limit: Int!, $cursor: String) {
    replies(id: $id, limit: $limit, cursor: $cursor) {
      result {
        id
        text
        createdAt
        user {
          id
          username
        }
      }
      hasMore
    }
  }
`;

export const CREATE_REPLY = gql`
  mutation CreateReply($text: String!, $id: Int!, $tag: Int!) {
    createReply(text: $text, id: $id, tag: $tag) {
      id
      text
    }
  }
`;
