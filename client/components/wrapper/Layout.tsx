import Navbar from "../navbar/Navbar";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-gray-900">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
