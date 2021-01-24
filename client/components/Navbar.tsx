import { useRouter } from "next/router";
import { BiSearch } from "react-icons/bi";

// Routes
import { useAuth } from "../store/AuthContext";

const Navbar: React.FC = () => {
  const { auth } = useAuth();

  if (!auth) return null;

  return (
    <nav className="sticky top-0 bg-white flex justify-center border-b py-4 space-x-4">
      <div className="flex-1 bg-gray-50 border rounded px-3 py-2 max-w-lg flex items-center space-x-1 text-gray-400">
        <BiSearch fontSize="18px" />
        <span className="text-sm">Search</span>
      </div>
      <div className="flex w-72 justify-end space-x-2">
        <button className="px-4">Login</button>
        <button className="border rounded hover:bg-gray-100 bg-gray-50 px-4">
          Signup
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
