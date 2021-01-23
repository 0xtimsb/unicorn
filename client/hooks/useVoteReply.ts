import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useState } from "react";

// GraphQL
import {
  UPVOTE_REPLY,
  DOWNVOTE_REPLY,
  DELETE_VOTE_REPLY,
} from "../graphql/vote";
import {
  DownvoteReply,
  DownvoteReplyVariables,
} from "../graphql/__generated__/DownvoteReply";
import {
  UpvoteReply,
  UpvoteReplyVariables,
} from "../graphql/__generated__/UpvoteReply";
import {
  DeleteVoteReply,
  DeleteVoteReplyVariables,
} from "../graphql/__generated__/DeleteVoteReply";

type UseVoteReplyProps = {
  id: number;
  voteStatus: number;
  voteCount: number;
};

const useVoteReply = ({ id, voteStatus, voteCount }: UseVoteReplyProps) => {
  const client = useApolloClient();

  const [loading, setLoading] = useState(false);

  const [upvote] = useMutation<UpvoteReply, UpvoteReplyVariables>(UPVOTE_REPLY);
  const [downvote] = useMutation<DownvoteReply, DownvoteReplyVariables>(
    DOWNVOTE_REPLY
  );
  const [deleteVote] = useMutation<DeleteVoteReply, DeleteVoteReplyVariables>(
    DELETE_VOTE_REPLY
  );

  const updateVoteCache = ({
    updatedVote,
    updatedCount,
  }: {
    updatedVote: number;
    updatedCount: number;
  }) => {
    client.writeFragment({
      id: `Reply:${id}`,
      fragment: gql`
        fragment NewReply on Reply {
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

export default useVoteReply;
