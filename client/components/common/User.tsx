import Link from "next/link";
import { RiArrowDownSLine } from "react-icons/ri";

// GraphQL types
import { Post_post_user } from "../../graphql/__generated__/Post";

// Utils
import { currentDate, timeAgo } from "../../utils/date";

interface UserTypes {
  user: Post_post_user;
  createdAt: string;
}

const User: React.FC<UserTypes> = ({ user, createdAt }) => {
  return (
    <div className="space-x-1.5">
      <Link href={"/" + user.username}>
        <span className="text-sm font-black text-gray-800 dark:text-gray-200 hover:underline">
          {user.username}
        </span>
      </Link>
      <span className="text-xs text-gray-500 cursor-pointer hover:underline">
        {currentDate(createdAt)}
      </span>
    </div>
  );
};

export default User;
