import Link from "next/link";
import { useRef, useState } from "react";
import { Me_me } from "../graphql/__generated__/Me";
import useClickOutside from "../hooks/useClickOutside";
import UserSection from "./post/components/UserSection";

interface CreatePostProps {
  auth: Me_me;
}

const CreatePost: React.FC<CreatePostProps> = ({ auth }) => {
  if (!auth) return null;

  const ref = useRef();

  const [isModalOpen, setModalOpen] = useState(false);

  useClickOutside(ref, () => setModalOpen(false));

  return (
    <div ref={ref}>
      <div className="absolute inset-0 bg-black z-20 opacity-50 overflow-hidden" />
      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30">
        <div className="p-4 rounded bg-white space-y-2">
          <div className="flex items-center space-x-3">
            <Link href={"/" + auth.username}>
              <img
                src="https://placekitten.com/300/300"
                alt="kit"
                className="w-7 h-7 rounded cursor-pointer"
              />
            </Link>
            <div className="flex-1 flex items-baseline">
              <Link href={"/" + auth.username}>
                <div className="text-base font-bold text-gray-800 dark:text-gray-200 cursor-pointer">
                  {auth.username}
                </div>
              </Link>
            </div>
          </div>
          <input
            className="w-full outline-none text-base font-medium"
            placeholder="Enter something here..."
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
