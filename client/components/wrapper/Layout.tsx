import Navbar from "../Navbar";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-gray-100">
      <Navbar />
      <div className="flex justify-center pt-4 space-x-4">{children}</div>
    </div>
  );
};

export default Layout;
