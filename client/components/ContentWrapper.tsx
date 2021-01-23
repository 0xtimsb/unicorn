const ContentWrapper: React.FC = ({ children }) => {
  return (
    <div className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
      <div className="pt-5 pb-24 lg:pb-16 w-full flex">
        <div className="min-w-0 flex-auto px-4 sm:px-6 xl:px-8">
          <div className="pb-5 mb-2 flex items-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Home</h1>
          </div>
          <div className="space-y-5">{children}</div>
        </div>
        <div className="hidden xl:text-sm xl:block flex-none w-64 pl-8 mr-8">
          <div className="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-18) -mt-10 pt-10 pb-4 top-16">
            <div className="mb-8">
              <h5 className="text-gray-900 uppercase tracking-wide font-semibold mb-3 text-sm lg:text-xs">
                On this page
              </h5>
              <ul className="overflow-x-hidden text-gray-500 font-medium">
                <li>
                  <a
                    href="#overview"
                    className="block transform transition-colors duration-200 py-2 hover:text-gray-900"
                  >
                    Overview
                  </a>
                </li>
                <li>
                  <a
                    href="#curating-colors"
                    className="block transform transition-colors duration-200 py-2 hover:text-gray-900"
                  >
                    Curating colors
                  </a>
                </li>
                <li>
                  <a
                    href="#custom-colors"
                    className="block transform transition-colors duration-200 py-2 hover:text-gray-900"
                  >
                    Custom colors
                  </a>
                </li>
                <li>
                  <a
                    href="#color-object-syntax"
                    className="block transform transition-colors duration-200 py-2 hover:text-gray-900"
                  >
                    Color object syntax
                  </a>
                </li>
                <li>
                  <a
                    href="#extending-the-defaults"
                    className="block transform transition-colors duration-200 py-2 hover:text-gray-900"
                  >
                    Extending the defaults
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentWrapper;
