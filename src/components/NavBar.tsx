import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-300 dark:border-gray-600 bg-white">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a
          href="/studentsDisplay/listingStudents"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://previews.123rf.com/images/ratoca/ratoca1707/ratoca170700401/82666250-student-icon.jpg"
            className="h-12"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            STUDENT MANAGEMENT SYSTEM
          </span>
        </a>

        <div className="md:hidden">
          <button className="block text-gray-700 dark:text-white focus:outline-none">
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 6H21V8H3V6Z"
              />
            </svg>
          </button>
        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/studentsDisplay/listingStudents"
                className="block py-2 px-3 text-white bg-blue-700 rounded
                md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                All Students
              </Link>
            </li>
            <li>
              <Link
                href="/CreateStudentForm"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Create Students
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
