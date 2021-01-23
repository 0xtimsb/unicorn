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
    <div className="flex">
      <button
        className={`p-0.5 text-lg cursor-pointer rounded hover:bg-gray-100 focus:outline-none ${
          voteStatus === 1
            ? "text-green-400 hover:text-green-500"
            : "text-gray-400 hover:text-gray-900"
        }`}
        onClick={handleUpvote}
      >
        <RiArrowUpSLine />
      </button>
      <div className="py-1 text-xs font-semibold flex items-center justify-center hover:text-gray-900 cursor-pointer">
        {voteCount}
      </div>
      <button
        className={`p-0.5 text-lg rounded hover:bg-gray-100 cursor-pointer focus:outline-none ${
          voteStatus === -1
            ? "text-red-400 hover:text-red-500"
            : "text-gray-400 hover:text-gray-700"
        }`}
        onClick={handleDownvote}
      >
        <RiArrowDownSLine />
      </button>
    </div>
  );
};

export default Vote;
