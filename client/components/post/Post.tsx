// GraphQL Types
import { Post_post } from "../../graphql/__generated__/Post";

// Hooks
import useVotePost from "../../hooks/useVotePost";

// Components
import Vote from "../common/Vote";
import Panel from "../common/Panel";
import Profile from "../common/Profile";
import ActionBar from "./ActionBar";
import User from "../common/User";

interface PostProps {
  post: Post_post;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { id, text, user, voteStatus, voteCount, createdAt } = post;

  const { handleUpvote, handleDownvote } = useVotePost({
    id,
    voteCount,
    voteStatus,
  });

  const voteHelper = { voteStatus, voteCount, handleUpvote, handleDownvote };

  return (
    <Panel className="px-3 py-2 space-y-2">
      <div className="flex space-x-3">
        <div>
          <Profile />
        </div>
        <div className="flex-1 -mt-1.5">
          <User createdAt={createdAt} user={user} />
          <div className="text-sm">{text}</div>
          <ActionBar id={id} voteHelper={voteHelper} />
        </div>
      </div>
    </Panel>
  );
};

export default Post;
