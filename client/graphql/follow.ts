import { gql } from "@apollo/client";

export const FOLLOW = gql`
  mutation Follow($id: Int!) {
    follow(id: $id)
  }
`;

export const UNFOLLOW = gql`
  mutation Unfollow($id: Int!) {
    unfollow(id: $id)
  }
`;
