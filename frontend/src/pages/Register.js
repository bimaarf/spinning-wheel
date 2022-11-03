import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";
export const Register = ({ setAuthCheck }) => {
  const navRedirect = useNavigate();
  const [loadSubmit, setLoadSubmit] = useState(false);

  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
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
      name: formInput.name,
      email: formInput.email,
      password: formInput.password,
      password_confirmation: formInput.password_confirmation,
    };

    await axios.get("sanctum/csrf-cookie").then((res) => {
      axios
        .post(`api/register`, data)
        .then((res) => {
          if (res.data.status === 200) {
            toast.success("you are logged in!");
            setAuthCheck(true);
            localStorage.setItem("auth_token", res.data.token);
            localStorage.setItem("auth_id", res.data.id);
            localStorage.setItem("auth_name", res.data.username);
            localStorage.setItem("auth_email", res.data.email);
            localStorage.setItem("auth_role", res.data.role);
            localStorage.setItem(
              "auth_reedem",
              JSON.stringify(res.data.reedem)
            );
            navRedirect("/");
          } else if (res.data.status === 101) {
            toast.warning("Your password is wrong!");
          } else if (res.data.status === 102) {
            toast.error("Email is not registered!");
          } else if (res.data.status === 202) {
            toast.warning("Password minimum 4 characters!");
          }
          setLoadSubmit(false);
        })
        .catch((err) => {
          toast.warning("Server Error!");
        });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-4 space-y-2">
        <label className="text-gray-500 font-normal">Nama Pengguna</label>
        <input
          type="text"
          name="name"
          onChange={handleInput}
          value={handleInput.username}
          className="appearance-none bg-gray-100 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Masukkan nama pengguna"
        />
      </div>
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
          type="password"
          name="password"
          onChange={handleInput}
          value={handleInput.password}
          className="appearance-none bg-gray-100 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Masukkan password"
        />
      </div>
      <div className="mt-4 space-y-2">
        <label className="text-gray-500 font-normal">Konfirmasi Password</label>
        <input
          type="password"
          name="password_confirmation"
          onChange={handleInput}
          value={handleInput.password_confirmation}
          className="appearance-none bg-gray-100 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Konfirmasi password"
        />
      </div>
      <button className="w-full mt-4 px-2 py-2 bg-gray-500 rounded-lg text-white font-semibold">
        Daftar
      </button>
    </form>
  );
};
