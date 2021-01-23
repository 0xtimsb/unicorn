import { gql } from "@apollo/client";

export const COMMENTS = gql`
  query Comments($id: Int!, $limit: Int!, $cursor: String) {
    comments(id: $id, limit: $limit, cursor: $cursor) {
      result {
        id
        text
        createdAt
        voteCount
        voteStatus
        user {
          id
          username
        }
      }
      hasMore
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($text: String!, $id: Int!) {
    createComment(text: $text, id: $id) {
      id
      text
    }
  }
`;
