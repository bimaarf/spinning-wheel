import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";
export const Login = ({ setAuthCheck }) => {
  const navRedirect = useNavigate();
  const [loadSubmit, setLoadSubmit] = useState(false);

  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    error_list: [],
  });
  const [emailValidator, setEmailValidator] = useState("");
  const validateEmail = (e) => {
    const email = e.target.value;
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
    if (validator.isEmail(email)) {
      e.persist();
      setEmailValidator("Email is valid!");
    } else {
      e.persist();
      setEmailValidator("Enter valid email!");
    }
  };
  const handleInput = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setLoadSubmit(true);
    e.preventDefault();
    const data = {
      email: formInput.email,
      password: formInput.password,
    };

    await axios
      .get("sanctum/csrf-cookie")
      .then((res) => {
        axios
          .post(`api/login`, data)
          .then((res) => {
            if (res.data.status === 200) {
              toast.success("you are logged in!");
              setAuthCheck(true);
              localStorage.setItem("auth_token", res.data.token);
              localStorage.setItem("auth_id", res.data.id);
              localStorage.setItem("auth_name", res.data.username);
              localStorage.setItem("auth_email", res.data.email);
              localStorage.setItem("auth_role", res.data.role);
              localStorage.setItem("auth_reedem", JSON.stringify(res.data.reedem));
              navRedirect("/");
            } else if (res.data.status === 101) { 
              toast.warning("Your password is wrong!");
            } else if (res.data.status === 102) {
              toast.error("Email is not registered!");
            } else if (res.data.status === 202) {
              toast.warning("Password minimum 4 characters!");
            }
            setLoadSubmit(false);
            console.log(res.data);
          })
          .catch((err) => {
            toast.warning("Server Error!");
          });
      })
      .catch((err) => {
        toast.warning("Server Error!");
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mt-4 space-y-2">
          <label className="text-gray-500 font-normal">Alamat Email</label>
          <input
            type="email"
            name="email"
            onChange={validateEmail}
            value={handleInput.email}
            className={`${
              emailValidator === "" && emailValidator !== "Enter valid email!"
                ? "bg-gray-100 "
                : "" || emailValidator === "Enter valid email!"
                ? "bg-red-50 border border-red-400 "
                : "bg-gray-100 border-none "
            } appearance-none  rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder="Masukkan alamat email"
            required
          />
          <span
            className={`${
              emailValidator === "" && emailValidator !== "Enter valid email!"
                ? ""
                : "" || emailValidator === "Enter valid email!"
                ? "text-red-500"
                : "text-zinc-500"
            } text-sm ml-1`}
          >
            {emailValidator === "" && emailValidator !== "Enter valid email!"
              ? ""
              : "" || emailValidator === "Enter valid email!"
              ? "Email tidak valid!"
              : ""}
          </span>
        </div>
        <div className="mt-4 space-y-2">
          <label className="text-gray-500 font-normal">Password</label>
          <input
            name="password"
            type="password"
            onChange={handleInput}
            value={handleInput.password}
            className="appearance-none bg-gray-100 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Masukkan password"
          />
        </div>
        <button
          type="submit"
          // disabled={veriCapcha ? false : true}
          className={`${"bg-gray-500"} w-full mt-4 px-2 py-2  rounded-lg text-white font-semibold`}
        >
          <div className="gap-1 flex justify-center items-baseline">
            {loadSubmit && (
              <svg
                role="status"
                className="inline w-3 h-3 ml-2 text-white animate-spin mb-0.5"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            Masuk
          </div>
        </button>
      </form>
    </>
  );
};
