import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WheelComponent from "react-wheel-of-prizes";
import "react-wheel-of-prizes/dist/index";
import { Sidebar } from "./Components/Sidebar";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2";
export const Whell = () => {
  const navRedirect = useNavigate();
  const location = useLocation();
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
  }, []);
  const whell = () => {
    return (
      <WheelComponent
        segments={segments}
        segColors={segColors}
        winningSegment={location.state}
        onFinished={(winner) => onFinished(winner)}
        primaryColor="rgba(0,0,123,0.4)"
        contrastColor="#ffffff"
        buttonText="Spin"
        isOnlyOnce={true}
        size={250}
        upDuration={300}
        downDuration={250}
        fontFamily="Arial"
      />
    );
  };
  return (
    <>
      <div className="md:h-screen bg-gray-100 md:pt-10">
        <div className="lg:container lg:mx-auto">
          <div className="md:flex md:columns-2 md:gap-10">
            <Sidebar />
            <div className="bg-white rounded-xl md:w-5/6 md:ml-0 -ml-20 md:pb-20 md:pt-20 md:px-10">
              <div className=" md:flex md:justify-end md:items-end md:ml-0  md:overflow-auto overflow-hidden">
                <div className="scale-75  md:-mt-10 md:scale-100">
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
