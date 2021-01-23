const Sidebar: React.FC = () => {
  return (
    <div className="fixed z-40 inset-0 flex-none h-full bg-black bg-opacity-25 w-full lg:bg-white lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block hidden">
      <div className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:sticky lg:bg-transparent overflow-hidden lg:top-18 bg-white mr-24 lg:mr-0">
        <div className="hidden lg:block h-12 pointer-events-none absolute inset-x-0 z-10 bg-gradient-to-b from-white"></div>
        <nav className="px-1 pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pt-10 lg:pb-16 sticky?lg:h-(screen-18)">
          <div className="relative flex mb-8 px-3 lg:hidden"></div>
          <ul>
            <li>
              <a
                href="/docs"
                className="flex items-center px-3 hover:text-gray-900 transition-colors duration-200 mb-4 text-gray-900"
              >
                <div className="mr-3 rounded-md bg-gradient-to-br from-pink-500 to-rose-500">
                  <svg className="h-6 w-6" viewBox="0 0 24 24">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9 6C10.0929 6 11.1175 6.29218 12 6.80269V16.8027C11.1175 16.2922 10.0929 16 9 16C7.90714 16 6.88252 16.2922 6 16.8027V6.80269C6.88252 6.29218 7.90714 6 9 6Z"
                      fill="#FFF1F2"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15 6C16.0929 6 17.1175 6.29218 18 6.80269V16.8027C17.1175 16.2922 16.0929 16 15 16C13.9071 16 12.8825 16.2922 12 16.8027V6.80269C12.8825 6.29218 13.9071 6 15 6Z"
                      fill="#FECDD3"
                    ></path>
                  </svg>
                </div>
                Documentation
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
