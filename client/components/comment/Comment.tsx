// Hooks
import useVoteComment from "../../hooks/useVoteComment";

// GraphQL Types
import { Comments_comments_result } from "../../graphql/__generated__/Comments";

// Components
import Vote from "../common/Vote";
import Content from "../common/Content";
import Panel from "../common/Panel";

interface CommentProps {
  comment: Comments_comments_result;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { id, user, text, createdAt, voteStatus, voteCount } = comment;

  const { handleUpvote, handleDownvote } = useVoteComment({
    id,
    voteCount,
    voteStatus,
  });

  const voteHelper = { voteStatus, voteCount, handleUpvote, handleDownvote };

  return (
    <Panel>
      <Vote voteHelper={voteHelper} />
      <div className="p-1 flex-1 flex flex-col space-between">
        <Content user={user} text={text} createdAt={createdAt} />
      </div>
    </Panel>
  );
};

export default Comment;
