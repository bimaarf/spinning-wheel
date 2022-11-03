import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Sidebar } from "../Components/Sidebar";
export const InputReedem = () => {
  const [reedemList, setReedemList] = useState([
    {
      reedem: "",
      reward: "",
      jumlah: "",
    },
  ]);
  useEffect(() => {
    getReedemAPI();
  }, []);
  const getReedemAPI = () => {
    axios.get("api/reedem/get").then((res) => {
      if (res.data.length !== 0) return setReedemList(res.data);
    });
  };

  const handleAddRow = (e) => {
    e.preventDefault();
    setReedemList([
      ...reedemList,
      {
        reedem: "",
        reward: "",
        jumlah: "",
      },
    ]);
  };
  const handleDelRow = (index) => {
    const list = [...reedemList];
    list.splice(index, 1);
    setReedemList(list);
    console.log(index);
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...reedemList];
    list[index][name] = value;
    setReedemList(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(reedemList);
    const pushServer = new FormData();
    reedemList.forEach((file) => {
      pushServer.append("reedem[]", file.reedem);
      pushServer.append("reward[]", file.reward);
      pushServer.append("jumlah[]", file.jumlah);
    });
    const data = pushServer;
    // const data = {
    //   reedem: reedemList.reedem,
    //   reward: reedemList.reward,
    //   jumlah: reedemList.jumlah,
    // };

    await axios
      .get("sanctum/csrf-cookie")
      .then((res) => {
        axios
          .post(`api/reedem/store`, data)
          .then((res) => {
            toast.success("sukese");
            console.log(data);
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
      <div className=" bg-gray-100 md:pt-10 md:pb-10 px-4">
        <div className="lg:container lg:mx-auto ">
          <div className="md:flex md:columns-2 md:gap-10">
            <Sidebar />
            <div className="bg-white rounded-xl md:w-5/6">
              <div className="flex justify-between items-baseline p-4 border-b">
                <h1 className="font-semibold text-xl text-gray-700">
                  Input Reedem
                </h1>
              </div>
              {/* form satu */}
              <form onSubmit={handleSubmit}>
                {reedemList.map((x, i) => {
                  return (
                    <div key={i} className="flex columns-2 items-center">
                      <div className="w-1/6 mt-10">
                        <button
                          type="button"
                          onClick={() => handleDelRow(i)}
                          className="hover:bg-red-800 duration-100 ease-in-out rounded-sm text-white bg-red-700 px-7 py-1 float-right"
                        >
                          <i className="fa fa-trash mr-5"></i>
                          Hapus
                        </button>
                      </div>
                      <div className="w-5/6">
                        <div className="xl:flex xl:columns-3 mx-4 gap-2">
                          <div className="mt-5 w-full">
                            <label className="text-gray-700 text-md font-semibold">
                              Kode Reedem
                            </label>
                            <input
                              onChange={(e) => handleChange(e, i)}
                              value={x.reedem}
                              name="reedem"
                              type="text"
                              className="appearance-none rounded w-full py-3 px-3 text-gray-600 leading-tight border focus:border-sky-500 focus:outline-none focus:shadow-outline"
                              placeholder="e.g. KopiSusu"
                            />
                          </div>
                          <div className="mt-5 w-full">
                            <label className="text-gray-700 text-md font-semibold">
                              Reward
                            </label>
                            <input
                              type="text"
                              onChange={(e) => handleChange(e, i)}
                              value={x.reward}
                              name="reward"
                              className="appearance-none rounded w-full py-3 px-3 text-gray-600 leading-tight border focus:border-sky-500 focus:outline-none focus:shadow-outline"
                              placeholder="e.g. Iphone"
                            />
                          </div>
                          <div className="mt-5 w-full">
                            <label className="text-gray-700 text-md font-semibold">
                              Jumlah Maksimal Reedem
                            </label>
                            <input
                              min={1}
                              type="number"
                              onChange={(e) => handleChange(e, i)}
                              value={x.jumlah}
                              name="jumlah"
                              className="appearance-none rounded w-full py-3 px-3 text-gray-600 leading-tight border focus:border-sky-500 focus:outline-none focus:shadow-outline"
                              placeholder="e.g. 3"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="m-10 float-right">
                  <button
                    className="hover:bg-sky-700 duration-100 ease-in-out rounded-sm text-white bg-sky-600 px-7 py-1 mr-3"
                    onClick={handleAddRow}
                  >
                    Tambah
                  </button>
                  <button
                    type="submit"
                    className="hover:bg-sky-700 duration-100 ease-in-out rounded-sm text-white bg-sky-600 px-7 py-1"
                  >
                    Simpan
                  </button>
                </div>
                {/* end form satu */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
