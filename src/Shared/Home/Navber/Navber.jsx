import React, { useState } from 'react';
import { FaUserNurse } from 'react-icons/fa';
import { MdNotificationAdd } from 'react-icons/md';
import logo from '../../../../public/percelpath.png';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import useGetData from '../../../Hooks/useGetData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  const [userInfo] = useGetData();
  console.log(userInfo[0]?.name);
  const role = userInfo?.role || userInfo[0]?.role;
  console.log(userInfo);

  const handleLogOut = () => {
    logOut()
      .then(res => console.log(res.result))
      .then(error => console.log(error));
  };

  return (
    <nav className="w-full fixed z-[50] shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <div className="flex">
            <img className="w-auto h-10 " src={logo} alt="Logo" />
            <h1 className="text-3xl text-white font-semibold">ParcelPath</h1>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              {!isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu open: "block", Menu closed: "hidden" */}
        <div
          className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:flex md:items-center ${
            isOpen
              ? 'translate-x-0 opacity-100'
              : 'opacity-0 -translate-x-full md:opacity-100 md:translate-x-0'
          }`}
        >
          <div className="flex flex-col md:flex-row md:mx-6">
            <a
              className="my-2 text-white transition-colors duration-300 transform dark:text-gray-200 hover:text-orange-400 dark:hover:text-blue-400 md:mx-4 md:my-0"
              href="#"
            >
              Home
            </a>
            <a
              className="my-2 text-white transition-colors duration-300 transform hover:text-orange-400  dark:hover:text-blue-400 md:mx-4 md:my-0"
              href="#"
            >
              Dashboard
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              className="relative text-white transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
              href="#"
            >
              <MdNotificationAdd className="h-6 hover:text-orange-400 w-6" />
            </a>
            {user ? (
              <div className="relative">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-8 rounded-full border-2 border-gray-200 hover:border-gray-400 transition duration-300">
                      {user ? (
                        <img alt="User Avatar" src={userInfo[0]?.image} />
                      ) : (
                        <img
                          alt="User Avatar"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        />
                      )}
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg text-white rounded-lg w-52 border border-gray-200"
                  >
                    <li className=" rounded">
                      <a className="flex justify-between hover:bg-white hover:text-black items-center px-2 py-1">
                        <span>Name: {userInfo[0]?.name}</span>
                      </a>
                    </li>
                    <li className=" rounded">
                      {role === 'admin' && (
                        <NavLink
                          to={'Dashboard/Statistics'}
                          className="flex text-start items-center hover:bg-white hover:text-black px-2 py-1"
                        >
                          Dashboard
                        </NavLink>
                      )}

                      {role === 'user' && (
                        <NavLink
                          to={'Dashboard/MyProfile'}
                          className="flex text-start items-center hover:bg-white hover:text-black px-2 py-1"
                        >
                          Dashboard
                        </NavLink>
                      )}
                    </li>
                    <li className=" rounded">
                      <a
                        onClick={handleLogOut}
                        className="flex items-center hover:bg-white hover:text-black px-2 py-1"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <NavLink
                to={'Login'}
                className="relative lg:mr-10 text-white transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
                href="#"
              >
                <FaUserNurse className="h-5 hover:text-orange-400 hover:zoom-in w-5" />
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
