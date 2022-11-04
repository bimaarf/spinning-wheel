import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
export const Loader = () => {
  const navRedirect = useNavigate();
  useEffect(() => {
    handleTamu();
    if (localStorage.getItem('auth_reedem')) {
      setTimeout(() => {
        navRedirect("/");
      }, 1000);
    }
  });
  const handleTamu = () => {
    axios.get("api/tamu").then((res) => {
      console.log("====================================");
      localStorage.setItem("auth_reedem", JSON.stringify(res.data.reedem));
      console.log("====================================");
    });
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div class="loader"></div>
      </div>
    </>
  );
};
