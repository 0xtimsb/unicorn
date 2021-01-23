import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useState } from "react";

// GraphQL
import {
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  DELETE_VOTE_COMMENT,
} from "../graphql/vote";
import {
  DownvoteComment,
  DownvoteCommentVariables,
} from "../graphql/__generated__/DownvoteComment";
import {
  UpvoteComment,
  UpvoteCommentVariables,
} from "../graphql/__generated__/UpvoteComment";
import {
  DeleteVoteComment,
  DeleteVoteCommentVariables,
} from "../graphql/__generated__/DeleteVoteComment";

type UseVoteCommentProps = {
  id: number;
  voteStatus: number;
  voteCount: number;
};

const useVoteComment = ({ id, voteStatus, voteCount }: UseVoteCommentProps) => {
  const client = useApolloClient();

  const [loading, setLoading] = useState(false);

  const [upvote] = useMutation<UpvoteComment, UpvoteCommentVariables>(
    UPVOTE_COMMENT
  );
  const [downvote] = useMutation<DownvoteComment, DownvoteCommentVariables>(
    DOWNVOTE_COMMENT
  );
  const [deleteVote] = useMutation<
    DeleteVoteComment,
    DeleteVoteCommentVariables
  >(DELETE_VOTE_COMMENT);

  const updateVoteCache = ({
    updatedVote,
    updatedCount,
  }: {
    updatedVote: number;
    updatedCount: number;
  }) => {
    client.writeFragment({
      id: `Comment:${id}`,
      fragment: gql`
        fragment NewComment on Comment {
          voteStatus
          voteCount
        }
      `,
      data: {
        voteStatus: updatedVote,
        voteCount: updatedCount,
      },
    });
  };

  const handleUpvote = () => {
    if (!loading) {
      setLoading(true);
      if (voteStatus !== 1) {
        upvote({ variables: { id } });
        if (voteStatus === -1) {
          updateVoteCache({ updatedVote: 1, updatedCount: voteCount + 2 }); // If already downvoted, increase by two.
        } else {
          updateVoteCache({ updatedVote: 1, updatedCount: voteCount + 1 });
        }
      } else {
        deleteVote({ variables: { id } });
        updateVoteCache({ updatedVote: 0, updatedCount: voteCount - 1 });
      }
      setLoading(false);
    }
  };

  const handleDownvote = () => {
    if (!loading) {
      setLoading(true);
      if (voteStatus !== -1) {
        downvote({ variables: { id } });
        if (voteStatus === 1) {
          updateVoteCache({ updatedVote: -1, updatedCount: voteCount - 2 }); // If already upvoted, decrease by two.
        } else {
          updateVoteCache({ updatedVote: -1, updatedCount: voteCount - 1 });
        }
      } else {
        deleteVote({ variables: { id } });
        updateVoteCache({ updatedVote: 0, updatedCount: voteCount + 1 });
      }
      setLoading(false);
    }
  };

  return { handleUpvote, handleDownvote };
};

export default useVoteComment;
