const NavButton: React.FC = ({ children }) => {
  return (
    <div className="h-12 w-12 text-2xl flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-900">
      {children}
    </div>
  );
};

export default NavButton;
