interface FeedLayoutType {
  title?: string;
}

const FeedLayout: React.FC<FeedLayoutType> = ({ children, title }) => {
  return (
    <div className="space-y-4 pt-4">
      <div className="sticky top-24">Hello</div>
      {children}
    </div>
  );
};

export default FeedLayout;
