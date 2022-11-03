import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import WheelComponent from "react-wheel-of-prizes";
import "react-wheel-of-prizes/dist/index";
import { Sidebar } from "./Components/Sidebar";
export const Whell = () => {
  const [isLoading, setIsLoading] = useState();
  const [getData, setData] = useState([]);
  console.log("====================================");
  const getParams = useLocation();
  console.log(getParams.state);
  console.log("====================================");
  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
  ];
  const onFinished = (winner) => {
    // console.log(winner);
    // console.log(getSegments);
  };

  const [getSegments, setSegments] = useState([]);
  const getReedemAPI = async (event) => {
    setIsLoading(true);
    let registrations = [];

    await event.registrations.forEach(registration => axios.get('/api/reedem/get', {
        params: {
            id: registration
        }
    }).then(res => {
            registrations.push(res.data.reedem)
        }
    ).catch(err => console.log(err)));
    return registrations;
  };
  const [isBegin, setIsBegin] = useState(false);
  const segments = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
  ];
  const [getArray, setGetArray] = useState(["oke", "aaaaaaaa"]);
  let anjing;
  const handleStart = () => {
    getReedemAPI();
    // setTimeout(() => {
    //   getData.map((item, index) => {
    //     setSegments([...getSegments, item.reedem]);
    //     console.log(getSegments);
    setGetArray([...getArray, " Kiwi"]);
    //   });
    // }, 2000);
    anjing = JSON.stringify(getArray);
    setIsBegin(true);
    whell();
  };
  const whell = () => {
    return (
      <WheelComponent
        segments={getSegments}
        segColors={segColors}
        // winningSegment="better luck next time"
        onFinished={(winner) => onFinished(winner)}
        primaryColor="black"
        contrastColor="white"
        buttonText="Spin"
        isOnlyOnce={false}
        size={290}
        upDuration={100}
        downDuration={500}
        fontFamily="Arial"
      />
    );
  };
  return (
    <>
      <button onClick={handleStart}>call value</button>
      <br></br>
      {isBegin === true && getArray}
      tis{anjing}
      <div className="h-screen bg-gray-100 md:pt-10">
        <div className="lg:container lg:mx-auto">
          <div className="md:flex md:columns-2 md:gap-10">
            <Sidebar />
            <div className="bg-white rounded-xl md:w-5/6 md:pb-20 md:pt-20">
              <div className=" flex justify-end items-end">{whell()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
