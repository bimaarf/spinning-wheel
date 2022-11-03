import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
export const Sidebar = () => {
  const location = useLocation();
  const navRedirect = useNavigate();
  const logoutNow = async (e) => {
    await axios.get("sanctum/csrf-cookie").then((res) => {
      axios.post(`api/logout`).then((res) => {
        localStorage.clear();
        toast.success("you are logged out!");
        navRedirect("/auth");
      });
    });
  };
  return (
    <div className="bg-white w-2/6 rounded-xl hidden md:block md:pb-10">
      <div className="flex justify-start gap-4 p-10 items-center border-b">
        <i className="fa fa-user-circle text-4xl text-sky-300 "></i>
        <h1 className="text-gray-600 text-3xl">
          {localStorage.getItem("auth_name")}
        </h1>
      </div>
      <div className="font-normal">
        <div className="flex justify-start gap-4 px-10 py-2 items-center mt-4">
          <Link
            to="/"
            className={`${
              location.pathname === "/" || location.pathname === '/whell'
                ? " bg-sky-500 text-white"
                : "text-gray-600 hover:bg-sky-500 hover:text-white "
            } flex items-center gap-4 w-full px-4 py-2 rounded-lg duration-300 ease-in-out`}
          >
            <i className="fa fa-user text-3xl"></i>
            <h1 className="text-xl">Beranda</h1>
          </Link>
        </div>
        {localStorage.getItem("auth_role") ===
          "8fdba5bdd7f7a9237c4bcb6e820cc94d5d8ac198" && (
          <div className="flex justify-start gap-4 px-10 py-2 items-center ">
            <Link
              to="/a/input-reedem"
              className={`${
                location.pathname === "/a/input-reedem"
                  ? " bg-sky-500 text-white"
                  : "text-gray-600 hover:bg-sky-500 hover:text-white "
              } flex items-center gap-4 w-full px-4 py-2 rounded-lg duration-300 ease-in-out`}
            >
              <i className="fa fa-paste text-3xl hover:text-white"></i>
              <h1 className="text-xl">Input Reedem</h1>
            </Link>
          </div>
        )}
        <div className="flex justify-start gap-4 px-10 py-2 items-center mt-52">
          <button
            onClick={logoutNow}
            className="cursor-pointer flex items-center gap-4 w-full px-4 py-2 rounded-lg text-gray-600 hover:bg-red-900 hover:text-white duration-300"
          >
            <i className="fa fa-power-off text-3xl hover:text-white"></i>
            <h1 className="text-xl">Keluar dari akun</h1>
          </button>
        </div>
      </div>
    </div>
  );
};
