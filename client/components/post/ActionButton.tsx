const ActionButton: React.FC = ({ children }) => {
  return (
    <div className="h-full px-2 text-xs font-semibold flex justify-center items-center rounded bg-gray-50 hover:bg-gray-100 text-gray-700 cursor-pointer focus:outline-none">
      {children}
    </div>
  );
};

export default ActionButton;
