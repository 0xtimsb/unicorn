import { useQuery } from "@apollo/client";

// Limit
import { COMMENTS_LIMIT } from "../../constants/dataLimits";

// GraphQL
import { COMMENTS } from "../../graphql/comment";

// GraphQL Types
import {
  Comments,
  CommentsVariables,
} from "../../graphql/__generated__/Comments";

// Components
import Comment from "./Comment";

interface CommentSectionProps {
  postId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { loading, data } = useQuery<Comments, CommentsVariables>(COMMENTS, {
    variables: { id: postId, limit: COMMENTS_LIMIT },
  });

  if (loading) {
    return <p>Comments loading...</p>;
  }

  return (
    <div>
      {data.comments.result.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentSection;
