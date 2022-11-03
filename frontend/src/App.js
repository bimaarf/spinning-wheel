import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { InputReedem } from "./pages/Admin/InputReedem";
import { Auth } from "./pages/Auth";
import { Navbar } from "./pages/Components/Navbar";
import { Home } from "./pages/Home";
import { Whell } from "./pages/Whell";
axios.defaults.baseURL = process.env.REACT_APP_API;
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Content-Type"] =
  "application/json/x-www-form-urlencoded; charset=UTF-8; multipart/form-data";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
function App() {
  const [authCheck, setAuthCheck] = useState(false);
  const navRedirect = useNavigate();
  useEffect(() => {
    if (authCheck === false) {
      navRedirect("/auth");
    }
    if (localStorage.getItem("auth_token")) return setAuthCheck(true);
    setAuthCheck(false);
  }, []);
  return (
    <>
      <ToastContainer />
      <Navbar authCheck={authCheck} setAuthCheck={setAuthCheck} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/whell" element={<Whell />} />
        <Route exact path="/a/input-reedem" element={<InputReedem />} />
        <Route
          exact
          path="/Auth"
          element={<Auth setAuthCheck={setAuthCheck} />}
        />
      </Routes>
    </>
  );
}

export default App;
