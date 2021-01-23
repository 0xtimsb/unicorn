import { gql } from "@apollo/client";

// VOTE POST
export const UPVOTE_POST = gql`
  mutation UpvotePost($id: Int!) {
    upvotePost(id: $id)
  }
`;

export const DOWNVOTE_POST = gql`
  mutation DownvotePost($id: Int!) {
    downvotePost(id: $id)
  }
`;

export const DELETE_VOTE_POST = gql`
  mutation DeleteVotePost($id: Int!) {
    deleteVotePost(id: $id)
  }
`;

// VOTE COMMENT
export const UPVOTE_COMMENT = gql`
  mutation UpvoteComment($id: Int!) {
    upvoteComment(id: $id)
  }
`;

export const DOWNVOTE_COMMENT = gql`
  mutation DownvoteComment($id: Int!) {
    downvoteComment(id: $id)
  }
`;

export const DELETE_VOTE_COMMENT = gql`
  mutation DeleteVoteComment($id: Int!) {
    deleteVoteComment(id: $id)
  }
`;

// VOTE REPLY
export const UPVOTE_REPLY = gql`
  mutation UpvoteReply($id: Int!) {
    upvoteReply(id: $id)
  }
`;

export const DOWNVOTE_REPLY = gql`
  mutation DownvoteReply($id: Int!) {
    downvoteReply(id: $id)
  }
`;

export const DELETE_VOTE_REPLY = gql`
  mutation DeleteVoteReply($id: Int!) {
    deleteVoteReply(id: $id)
  }
`;
