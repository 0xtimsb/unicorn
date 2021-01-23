interface PanelProps {
  className?: string;
}

const Panel: React.FC<PanelProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-white rounded-md border border-gray-300 hover:shadow-sm overflow-hidden cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};

export default Panel;
