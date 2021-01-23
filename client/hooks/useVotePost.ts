import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useState } from "react";

// GraphQL
import { UPVOTE_POST, DOWNVOTE_POST, DELETE_VOTE_POST } from "../graphql/vote";
import {
  DeleteVotePost,
  DeleteVotePostVariables,
} from "../graphql/__generated__/DeleteVotePost";
import {
  DownvotePost,
  DownvotePostVariables,
} from "../graphql/__generated__/DownvotePost";
import {
  UpvotePost,
  UpvotePostVariables,
} from "../graphql/__generated__/UpvotePost";

type UseVotePostProps = {
  id: number;
  voteStatus: number;
  voteCount: number;
};

const useVotePost = ({ id, voteStatus, voteCount }: UseVotePostProps) => {
  const client = useApolloClient();

  const [loading, setLoading] = useState(false);

  const [upvote] = useMutation<UpvotePost, UpvotePostVariables>(UPVOTE_POST);
  const [downvote] = useMutation<DownvotePost, DownvotePostVariables>(
    DOWNVOTE_POST
  );
  const [deleteVote] = useMutation<DeleteVotePost, DeleteVotePostVariables>(
    DELETE_VOTE_POST
  );

  const updateVoteCache = ({
    updatedVote,
    updatedCount,
  }: {
    updatedVote: number;
    updatedCount: number;
  }) => {
    client.writeFragment({
      id: `Post:${id}`,
      fragment: gql`
        fragment NewPost on Post {
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

export default useVotePost;
