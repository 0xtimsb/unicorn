import Link from "next/link";
import Vote from "../common/Vote";

interface AcionBarProps {
  id: number;
  voteHelper: any;
}

const ActionBar: React.FC<AcionBarProps> = ({ id, voteHelper }) => {
  return (
    <div className="h-7 flex space-x-2">
      <Vote voteHelper={voteHelper} />
      <Link href={`/posts/${id}`}>
        <a>
          <div className="h-full px-2 flex justify-center items-center rounded hover:bg-gray-100 cursor-pointer focus:outline-none">
            <span className="text-xs font-semibold">Comment</span>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ActionBar;
