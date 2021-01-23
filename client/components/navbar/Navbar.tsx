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
    <nav className="sticky top-0 z-40 lg:z-50 w-full max-w-8xl mx-auto bg-white flex-none flex border-b">
      <div className="px-4 py-4 sm:px-2 gap-x-2 gap-y-3 flex items-center flex-wrap">
        <Link href={HOME}>
          <a>
            <div className="bg-gray-100 rounded-full h-12 w-12 flex items-center justify-center p-3">
              <img src="../../images/logo.svg" alt="" />
            </div>
          </a>
        </Link>
        <div className="flex items-center gap-2 order-last w-full md:order-none md:w-auto">
          <Link href={HOME}>
            <a>
              <Button active={router.pathname === HOME}>For You</Button>
            </a>
          </Link>
          <Link href={FOLLOWING}>
            <a>
              <Button active={router.pathname === FOLLOWING}>Following</Button>
            </a>
          </Link>
        </div>
        <Search />
        <div>
          <NavButton>
            <RiAddLine />
          </NavButton>
        </div>
        <Link href={"/" + auth.username}>
          <a>
            <NavButton>
              <img src="../../images/logo.svg" alt="" className="h-7 w-7" />
            </NavButton>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
