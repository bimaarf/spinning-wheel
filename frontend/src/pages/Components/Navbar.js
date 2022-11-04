import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const Navbar = ({ authCheck, setAuthCheck }) => {
  const navRedirect = useNavigate();
  const [showList, setShowList] = useState(false);
  const handleToggle = () => {
    setShowList(showList ? false : true);
  };
  const location = useLocation();

  const logoutNow = async (e) => {
    await axios.get("sanctum/csrf-cookie").then((res) => {
      axios.post(`api/logout`).then((res) => {
        toast.success("you are logged out!");
        navRedirect("/auth");
        localStorage.clear();
        handleDropdown();
      });
    });
  };
  const [isDropdown, setDropdown] = useState(false);
  const handleDropdown = () => {
    setDropdown(isDropdown === false ? true : false);
  };

  return (
    <>
      <div className="text-center bg-sky-900 text-white py-3 text-md">
        Apakah anda sudah mendaftar ?{" "}
        <a href="#" className="text-yellow-500 underline">
          di sini
        </a>{" "}
      </div>
      <nav className="bg-light border-b py-2 sticky top-0 bg-white">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                onClick={handleToggle}
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-sky-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <Link to="/" className="flex flex-shrink-0 items-center">
                <span className="text-sky-500 font-bold -ml-28 md:ml-1 mr-10">
                  Spinning Whell
                </span>
              </Link>
              {localStorage.getItem("auth_token") && (
                <>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <Link
                        to="/"
                        className={`${
                          location.pathname === "/"
                            ? "text-sky-500"
                            : "text-slate-500"
                        } px-3 py-2 rounded-md text-lg font-semibold hover:text-sky-500`}
                        aria-current="page"
                      >
                        Beranda
                      </Link>

                      <Link
                        to="/a/input-reedem"
                        className="text-slate-500 hover:text-sky-500 px-3 py-2 rounded-md text-lg font-semibold"
                      >
                        Input Reedem
                      </Link>
                    </div>
                  </div>
                  <button
                    onClick={logoutNow}
                    className="text-red-600 hover:text-sky-500 px-3 py-2 rounded-md text-lg font-semibold hidden md:block"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {localStorage.getItem("auth_token") ? (
                <div className="cursor-pointer" onClick={handleDropdown}>
                  <div className="uppercase text-xl bg-gray-50 hover:bg-gray-100 duration-300 ease-in-out py-2 px-5 rounded-sm border font-semibold">
                    <i className="fa fa-user-circle text-sky-300 mr-2"></i>
                    {localStorage.getItem("auth_name").split(" ")[0]}
                    <i className="fa fa-chevron-down text-sky-500 ml-2"></i>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="bg-gray-50 hover:bg-gray-100 duration-300 ease-in-out py-2 px-2 rounded-sm border text-sky-500 font-semibold"
                  >
                    Login / Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div
          className={`${showList ? "md:hidden" : "hidden"}`}
          id="mobile-menu"
        >
          {" "}
          {localStorage.getItem("auth_token") && (
            <div className="space-y-1 px-2 pt-2 pb-3">
              <Link
                onClick={handleToggle}
                to="/"
                className={`${
                  location.pathname === "/" ? "text-sky-500" : "text-slate-500"
                }  hover:text-sky-500 block px-3 py-2 rounded-md text-base font-medium`}
                aria-current="page"
              >
                Beranda
              </Link>

              <Link
                onClick={handleToggle}
                to="/a/input-reedem"
                className={`${
                  location.pathname === "/a/input-reedem"
                    ? "text-sky-500"
                    : "text-slate-500"
                }  hover:text-sky-500 block px-3 py-2 rounded-md text-base font-medium`}
              >
                Input Reedem
              </Link>
              <button
                onClick={logoutNow}
                className={`text-red-500 hover:text-sky-500 block px-3 py-2 rounded-md text-base font-medium`}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
