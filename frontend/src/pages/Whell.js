import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WheelComponent from "react-wheel-of-prizes";
import "react-wheel-of-prizes/dist/index";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2";
import "../App.css";
import "../Assets/whell.css";
import headerImage from "../images/bg.JPG";
export const Whell = () => {
  const navRedirect = useNavigate();
  console.log("====================================");
  console.log("====================================");
  const location = useLocation();
  console.log(JSON.stringify(location.state.reward));

  const segColors = [
    "#ff00009a",
    "#ffcc00d3",
    "#5100ffd2",
    "#00a2ffc5",
    "#00ff40d0",
    "#f79c00c4",
    "#9dff009d",
    "#ff0000b6",
    "#ffcc00d2",
    "#5100ffda",
    "#00a2ffbe",
    "#ff9100d0",
  ];
  const onFinished = (winner) => {
    setTimeout(() => {
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
    }, 1000);
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
        primaryColor="#ffffff93"
        contrastColor="#000000c5"
        buttonText="Spin"
        isOnlyOnce={true}
        size={280}
        upDuration={600}
        downDuration={1500}
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
      <div
        className=" bg-white  md:w-5/6 md:pb-20 md:pt-20 px-10 header-img overflow-hidden pt-40 "
        style={{
          backgroundImage: `url(${headerImage})`,
        }}
      >
        <div className=" md:flex md:columns-2 justify-center items-center">
          <form className="md:mb-0 -mb-36">
            <label className="text-white text-md font-semibold">
              Masukkan Kode Reedem
            </label>
            <div className="md:w-1/2">
              <input
                type="text"
                name="reedem"
                value={location.state.reedem}
                className="appearance-none rounded w-full py-3 px-3 text-gray-600 leading-tight border focus:border-sky-500 focus:outline-none focus:shadow-outline"
                placeholder="e.g. KOPISUSU"
              />
              <button
                onClick={() => navRedirect("/")}
                // disabled={veriCapcha ? false : true}
                className="hover:bg-sky-600 duration-100 ease-in-out rounded-sm border border-sky-500 bg-sky-700 text-white  px-10 py-1 mt-4"
              >
                <div className="gap-1 flex justify-center items-baseline text-md">
                  Reset Reedem
                </div>
              </button>
            </div>
          </form>
          <div
            className="md:block hidden overflow-hidden border-0 relative neonText shadow-2xl shadow-cyan-500 rounded-full"
            style={{
              //   backgroundColor: "rgba(104, 145, 9, 0.137)",
              top: -95,
              left: 285,
              width: "50px",
              height: "50px",
              //   transform: 'skewY(20deg)',
            }}
          >
            <h2 class="neonText md:absolute md:right-0 scale-150"> asd</h2>
            <h2 class="neonText md:absolute md:-right-32 md:top-50  scale-150">
              {" "}
              asd
            </h2>
            <h2 class="neonText md:absolute md:-right-32 md:top-32  scale-150">
              {" "}
              asd
            </h2>
          </div>
          <div
            className=" md:w-2/4 -ml-20 scale-50  md:-mt-10 md:scale-75 mt-20"
            style={
              {
                //   backgroundColor: "rgba(104, 145, 9, 0.137)",
                //   height: "80vh",
                //   borderRadius: "10%",
                //   transform: 'skewY(20deg)',
              }
            }
          >
            <div
              className="block md:hidden overflow-hidden absolute border-0 neonTextM shadow-2xl shadow-cyan-500 rounded-full"
              style={{
                //   backgroundColor: "rgba(104, 145, 9, 0.137)",
                width: "600px",
                height: "600px",
                zIndex: -1,
                //   transform: 'skewY(20deg)',
              }}
            ></div>
            <div style={{ zIndex: 2 }}>{whell()}</div>
          </div>
        </div>
        {/* <div className="md:flex md:columns-2 "> */}
        {/* <div className="mt-10 md:w-2/4 hidden md:block"> */}
        {/* {yourReward.length === 0 ? (
                    <h1 className="text-md text-white bold">
                      Belum ada hadiah
                    </h1>
                  ) : (
                    <h1 className="text-white bold">Hadian Anda</h1>
                  )}
                  {yourReward.map((item, index) => (
                    <li key={index} className="list-decimal text-white">
                      {item.reward} - Reedem : {item.reedem}
                    </li>
                  ))} */}
        {/* </div> */}
        {/* ---------------------------spinner in here--------------------------- */}
        {/* </div> */}
      </div>
      {/* </div>
        </div>
      </div> */}
      {/* asdaasd */}
    </>
  );
};
