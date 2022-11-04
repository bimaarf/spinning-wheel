import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WheelComponent from "react-wheel-of-prizes";
import "react-wheel-of-prizes/dist/index";
import { Sidebar } from "./Components/Sidebar";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2";
import axios from "axios";
import "../App.css";
import headerImage from "../images/bg.JPG";
export const Whell = () => {
  const navRedirect = useNavigate();
  console.log("====================================");
  console.log("====================================");
  const location = useLocation();
  console.log(JSON.stringify(location.state.reward));

  const segColors = [
    "#ff0000",
    "#ffcc00",
    "#5100ff",
    "#00a2ff",
    "#00ff40",
    "#f79c00",
    "#9dff00",
    "#ff0000",
    "#ffcc00",
    "#5100ff",
    "#00a2ff",
    "#ff9100",
  ];
  const onFinished = (winner) => {
    Swal.fire({
      title: `<strong style='color:#659b00ff'>Hadiah : </strong><strong style='color:#ff0101ff'>${winner}</strong>`,
      text: `Selamat anda mendapatkan ${winner}`,
      width: 600,
      padding: "3em",
      color: "#716add",
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
    });
  };

  const segments = JSON.parse(localStorage.getItem("auth_reedem"));
  useEffect(() => {
    if (location.state === null) {
      navRedirect("/");
    }
    getReward();
  }, []);
  const whell = () => {
    return (
      <WheelComponent
        segments={segments}
        segColors={segColors}
        winningSegment={location.state.reward}
        onFinished={(winner) => onFinished(location.state.reward)}
        primaryColor="#ffffffdc"
        contrastColor="#680404"
        buttonText="Spin"
        isOnlyOnce={true}
        size={200}
        fontFamily="Arial"
      />
    );
  };
  // get reward - list
  const [yourReward, setYourReward] = useState([]);
  const getReward = async () => {
    await axios.get("sanctum/csrf-cookie").then((res) => {
      axios.get(`api/reward/get`).then((res) => {
        setYourReward(res.data);
      });
    });
  };
  return (
    <>
      <div className="h-screen bg-gray-100 md:pt-10">
        <div className="lg:container lg:mx-auto">
          <div className="md:flex md:columns-2 md:gap-10">
            <Sidebar />
            <div
              className="bg-white rounded-xl md:w-5/6 md:pb-20 md:pt-20 px-10 header-img"
              style={{
                backgroundImage: `url(${headerImage})`,
              }}
            >
              <div className=" flex justify-end items-end">
                <div className="flex gap-2"></div>
              </div>
              <form className="md:mb-0 -mb-36">
                <label className="text-white text-md font-semibold">
                  Masukkan Kode Reedem
                </label>
                <div className="md:w-1/2">
                  <input
                    type="text"
                    value={location.state.reedem}
                    className="appearance-none rounded w-full py-3 px-3 text-gray-600 leading-tight border focus:border-sky-500 focus:outline-none focus:shadow-outline"
                    placeholder="e.g. KOPISUSU"
                  />
                </div>
              </form>

              <div className="md:flex md:columns-2">
                <div className="mt-10 md:w-2/4">
                  {yourReward.length === 0 ? (
                    <h1 className="text-md text-white">Belum ada hadiah</h1>
                  ) : (
                    <h1 className="text-white">Hadian Anda</h1>
                  )}
                  {yourReward.map((item, index) => (
                    <li key={index} className="list-decimal text-white">
                      {item.reward} - Reedem : {item.reedem}
                    </li>
                  ))}
                </div>
                <div className=" md:w-2/4 -ml-40 scale-75  md:-mt-10 md:scale-100">
                  {whell()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
