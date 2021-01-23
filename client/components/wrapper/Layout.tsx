import Navbar from "../navbar/Navbar";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="w-full max-w-8xl mx-auto">{children}</div>
    </>
  );
};

export default Layout;
