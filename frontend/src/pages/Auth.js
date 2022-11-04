import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
export const Auth = ({ setAuthCheck }) => {
  const navRedirect = useNavigate();
  useEffect(() => {
    setAuthCheck(localStorage.getItem("auth_token") ? true : false);
  });
  const [isActive, setIsActive] = useState("Login");
  const handleActive = (e) => {
    setIsActive(e.target.value);
  };
  return (
    <>
      <div className="lg:container-lg lg:mx-auto flex justify-center mt-10 mx-2 ">
        <div className="rounded-lg  w-96 border p-8 ">
          <h1 className="font-semibold text-sky-700 text-xl">Masuk</h1>
          <p className="text-gray-400 text-sm">
            Silahkan registrasi jika belum punya akun
          </p>
          <div className="flex justify-center gap-2 bg-gray-100 rounded-full mt-4">
            <button
              value="Login"
              onClick={handleActive}
              className={`${
                isActive === "Login" && "bg-white"
              } m-1 px-2 py-2 rounded-full w-full text-slate-700 font-semibold transition-all duration-300`}
            >
              Login
            </button>
            <button
              value="Register"
              onClick={handleActive}
              className={`${
                isActive === "Register" && "bg-white"
              } m-1 px-2 py-2 rounded-full w-full text-slate-700 font-semibold transition-all duration-300`}
            >
              Register
            </button>
          </div>
          {isActive === "Login" ? (
            <Login setAuthCheck={setAuthCheck} />
          ) : (
            <Register setAuthCheck={setAuthCheck} />
          )}
        </div>
      </div>
    </>
  );
};
