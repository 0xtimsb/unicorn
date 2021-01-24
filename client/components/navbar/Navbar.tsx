import Link from "next/link";
import { useRouter } from "next/router";
import { RiAddFill, RiAddLine, RiHeartFill, RiHeartLine } from "react-icons/ri";

// Components
import Button from "../Button";
import NavButton from "./NavButton";
import Search from "./Search";

// GrpahQL Types
import { Me_me } from "../../graphql/__generated__/Me";

// Routes
import { FOLLOWING, HOME } from "../../constants/routes";
import { useAuth } from "../../store/AuthContext";

const Navbar: React.FC = (props) => {
  const { auth } = useAuth();

  if (!auth) return null;

  const router = useRouter();

  return (
    <nav className="sticky top-0 bg-white flex justify-center border-b py-4 space-x-4">
      <div className="flex-1 bg-gray-50 border rounded px-3 py-2 max-w-lg">
        <span className="text-gray-400">Search</span>
      </div>
      <div className="flex w-72 justify-end space-x-2">
        <button className="px-4">Login</button>
        <button className="border rounded hover:bg-gray-50 px-4">Signup</button>
      </div>
    </nav>
  );
};

export default Navbar;
