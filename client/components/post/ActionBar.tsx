import Link from "next/link";
import Vote from "../common/Vote";

import ActionButton from "./ActionButton";

interface AcionBarProps {
  id: number;
  voteHelper: any;
}

const ActionBar: React.FC<AcionBarProps> = ({ id, voteHelper }) => {
  return (
    <div className="h-7 flex space-x-1 -mb-1 mt-1">
      <Vote voteHelper={voteHelper} />
      <Link href={`/posts/${id}`}>
        <a>
          <ActionButton>C</ActionButton>
        </a>
      </Link>
    </div>
  );
};

export default ActionBar;
