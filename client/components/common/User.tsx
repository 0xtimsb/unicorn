import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";

// GraphQL types
import { Post_post_user } from "../../graphql/__generated__/Post";

// Utils
import { timeAgo } from "../../utils/date";

interface UserTypes {
  user: Post_post_user;
  createdAt: string;
}

const User: React.FC<UserTypes> = ({ user, createdAt }) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center space-x-3">
        <img
          src="http://placekitten.com/g/300/300"
          alt="pic"
          width="28"
          height="28"
          className="rounded"
        />
        <div className="flex items-center space-x-1">
          <Link href={"/" + user.username}>
            <span className="font-bold cursor-pointer hover:underline">
              {user.username}
            </span>
          </Link>
          <span className="text-sm text-gray-500">{`· ${timeAgo(
            createdAt
          )}`}</span>
        </div>
      </div>
      <div className="cursor-pointer text-gray-500 flex items-center">
        <BsThreeDotsVertical />
      </div>
    </div>
  );
};

export default User;
