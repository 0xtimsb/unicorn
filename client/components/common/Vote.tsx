import { useEffect, useRef } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

interface VoteProps {
  voteHelper: {
    voteStatus: number;
    voteCount: number;
    handleUpvote: () => void;
    handleDownvote: () => void;
  };
}

const Vote: React.FC<VoteProps> = ({ voteHelper }) => {
  const { voteStatus, voteCount, handleUpvote, handleDownvote } = voteHelper;

  return (
    <div className="flex space-x-2">
      <button
        className={`cursor-pointer focus:outline-none ${
          voteStatus === 1
            ? "text-green-400 hover:text-green-500"
            : "text-gray-400 hover:text-gray-500"
        }`}
        onClick={handleUpvote}
      >
        <RiArrowUpSLine fontSize="21px" />
      </button>
      <div className="text-xs font-semibold flex items-center justify-center">
        {voteCount}
      </div>
      <button
        className={`cursor-pointer focus:outline-none ${
          voteStatus === -1
            ? "text-red-400 hover:text-red-500"
            : "text-gray-400 hover:text-gray-500"
        }`}
        onClick={handleDownvote}
      >
        <RiArrowDownSLine fontSize="21px" />
      </button>
    </div>
  );
};

export default Vote;
