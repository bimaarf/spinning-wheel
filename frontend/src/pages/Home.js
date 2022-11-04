import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import WheelComponent from "react-wheel-of-prizes";
import "react-wheel-of-prizes/dist/index";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2";
import { Sidebar } from "./Components/Sidebar";
import "../App.css";
import headerImage from "../images/bg.JPG";
export const Home = ({ setAuthCheck }) => {
  const navRedirect = useNavigate();
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [formInput, setFormInput] = useState({
    reedem: "",
  });
  const handleInput = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const [whenFinish, setWhenFinish] = useState();
  const handleSubmit = async (e) => {
    setLoadSubmit(true);
    e.preventDefault();
    console.log(formInput);
    const data = {
      kode: formInput.reedem,
    };
    await axios.get("sanctum/csrf-cookie").then((res) => {
      axios.post(`api/reedem/check`, data).then((res) => {
        if (res.data.status === 200) {
          toast.success("Kode Voucher Valid");
          // console.log(res.data.reward);
          navRedirect("/whell", { state: res.data });
          setWhenFinish(res.data.reward);
        } else if (res.data.status === 101) {
          toast.warning("Kode Voucher Tidak Valid");
        } else if (res.data.status === 201) {
          toast.error("Sudah melebihi batas penukaran");
        }
      });
    });
    setLoadSubmit(false);
  };
  // useEffect(() => {
  //   if (!localStorage.getItem("auth_reedem")) {
  //     navRedirect("/auth");
  //   }

  //   getReward();
  // }, []);
  // login Tamu
  useEffect(() => {
    handleTamu();
    getReward();
  });
  const handleTamu = () => {
    axios.get("api/tamu").then((res) => {
      console.log("====================================");
      localStorage.setItem("auth_reedem", JSON.stringify(res.data.reedem));
      console.log("====================================");
    });
  };
  const [yourReward, setYourReward] = useState([]);
  const getReward = async () => {
    await axios.get("sanctum/csrf-cookie").then((res) => {
      axios.get(`api/reward/get`).then((res) => {
        setYourReward(res.data);
      });
    });
  };
  // whell
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
    console.log("====================================");
    console.log(winner);
    console.log("====================================");
    Swal.fire({
      title: `<strong style='color:#659b00ff'>Anda Belum Memasukkan </strong><strong style='color:#bd0404ff'>Kode Reedem</strong>`,
      // text: `Selamat anda mendapatkan ${winner}`,
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
  return (
    <>
      {/* <div className="h-screen bg-gray-100 md:pt-10">
        <div className="lg:container lg:mx-auto">
          <div className="md:flex md:columns-2 md:gap-10"> */}
      {/* <Sidebar /> */}
      <div
        className=" bg-white  md:w-5/6 md:pb-20 md:pt-20 px-10 header-img overflow-hidden pt-40"
        style={{
          backgroundImage: `url(${headerImage})`,
        }}
      >
        <button className="py-2 px-6 rounded bg-sky-700 hover:bg-sky-600 hover:text-white ease-linear duration-200 fixed bottom-20 text-white" onClick={() => navRedirect('/auth')}>Login</button>
        <div className=" md:flex md:columns-2 justify-center items-center">
          <form onSubmit={handleSubmit} className="md:mb-0 -mb-36">
            <label className="text-white text-md font-semibold">
              Masukkan Kode Reedem
            </label>
            <div className="md:w-1/2">
              <input
                type="text"
                name="reedem"
                onChange={handleInput}
                value={handleInput.reedem}
                className="appearance-none rounded w-full py-3 px-3 text-gray-600 leading-tight border focus:border-sky-500 focus:outline-none focus:shadow-outline"
                placeholder="e.g. KOPISUSU"
              />
              <button
                type="submit"
                // disabled={veriCapcha ? false : true}
                className="hover:bg-sky-600 duration-100 ease-in-out rounded-sm border border-sky-500 bg-sky-700 text-white  px-10 py-1 mt-4"
              >
                <div className="gap-1 flex justify-center items-baseline text-md">
                  {loadSubmit ? (
                    <>
                      <svg
                        role="status"
                        className="inline w-3 h-3 ml-2 text-white animate-spin mb-0.5"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#0055ff"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      Loadding
                    </>
                  ) : (
                    <>Check Sekarang</>
                  )}
                </div>
              </button>
            </div>
          </form>
          {/* <div className="bg-red-50"> */}
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
          <div className=" md:w-2/4 -ml-20 scale-50  md:-mt-10 md:scale-75 mt-20 ">
            <div
              className="block md:hidden overflow-hidden absolute border-0 neonTextM shadow-2xl shadow-cyan-500 rounded-full "
              style={{
                //   backgroundColor: "rgba(104, 145, 9, 0.137)",
                width: "600px",
                height: "600px",
                zIndex: -1,
                //   transform: 'skewY(20deg)',
              }}
            ></div>
            <div style={{ zIndex: 2 }}>
              <WheelComponent
                segments={segments}
                segColors={segColors}
                onFinished={(winner) => onFinished(whenFinish)}
                primaryColor="#ffffffdc"
                contrastColor="#680404"
                buttonText="Spin"
                isOnlyOnce={true}
                size={280}
                upDuration={500}
                downDuration={750}
                fontFamily="Arial"
              />
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
      {/* </div>
        </div>
      </div> */}
    </>
  );
};
