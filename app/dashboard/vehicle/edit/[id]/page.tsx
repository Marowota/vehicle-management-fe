"use client";

import { RequestResult, Vehicle } from "@/app/lib/definitions";
import { redirect, usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { EditData, GetVehicleFromId } from "./data";
import axios from "axios";

export default function EditVehicle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string | null>(null);
  const [vehicle, setVehicle]: [Vehicle, Dispatch<SetStateAction<Vehicle>>] =
    useState<Vehicle>({
      plateNumber: "",
      vehicleSpec: {
        type: "",
        brand: "",
        modelCode: "",
        noOfSeat: 0,
        madeIn: "",
        fuelType: "",
        fuelConsumptionPer100Km: 0,
        tankCapacity: 0,
        topSpeed: 0,
        frontRimsDimension: "",
        backRimsDimension: "",
      },
      cost: 0,
      health: "",
      isRemoved: false,
    });

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (id) {
      GetVehicleFromId({ id: id }).then((result) => {
        setVehicle((prevState) => {
          console.log("a", result);
          return {
            ...prevState,
            ...result,
          };
        });
      });
    }
  }, [id]);

  useEffect(() => {
    console.log("vehicle", vehicle);
  }, [vehicle]);

  let OnCancelClick = () => {
    redirect("../");
  };

  let OnSaveClick = async () => {
    let result: RequestResult = await EditData(vehicle);
    if (result == RequestResult.SUCCESS) {
      toast.success("Sửa thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      redirect("../");
    } else {
      toast.error("Có lỗi xảy ra, vui lòng thử lại", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <div className="px-10 py-10 h-full w-full flex flex-col ">
        <div className="font-bold text-xl text-blue-900">Sửa thông tin xe</div>
        <div className="border border-sky-100 my-3"></div>
        <div className="flex items-start w-full h-3/4 my-3  flex-col gap-6 overflow-auto">
          <div className="grid gap-6 md:grid-cols-3 w-3/4">
            <div>
              <label
                htmlFor="vehicle_id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Biển số xe
              </label>
              <input
                type="text"
                id="vehicle_id"
                className="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="30A-99999"
                required
                value={vehicle.plateNumber}
                readOnly={true}
                onChange={(e) => {
                  console.log("test");
                  setVehicle({ ...vehicle, plateNumber: e.target.value });
                }}
              />
            </div>
            <div>
              <label
                htmlFor="vehicle_price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Giá
              </label>
              <input
                type="number"
                id="vehicle_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="562.0"
                required
                value={vehicle.cost}
                onChange={(e) =>
                  setVehicle({
                    ...vehicle,
                    cost: +e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="w-3/4 grid gap-6 md:grid-cols-3">
            <div className="col-span-2">
              <label
                htmlFor="vehicle_price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
              >
                Tình trạng
              </label>
              <input
                type="text"
                id="vehicle_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Mới"
                required
                value={vehicle.health}
                onChange={(e) =>
                  setVehicle({ ...vehicle, health: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3 w-3/4 ">
            <div>
              <label
                htmlFor="vehicle_id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Loại xe
              </label>
              <input
                type="text"
                id="vehicle_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ô tô con"
                required
                value={vehicle.vehicleSpec.type}
                onChange={(e) =>
                  setVehicle({
                    ...vehicle,
                    vehicleSpec: {
                      ...vehicle.vehicleSpec,
                      type: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor="vehicle_price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Hãng
              </label>
              <input
                type="text"
                id="vehicle_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Honda"
                required
                value={vehicle.vehicleSpec.brand}
                onChange={(e) =>
                  setVehicle({
                    ...vehicle,
                    vehicleSpec: {
                      ...vehicle.vehicleSpec,
                      brand: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="">
              <label
                htmlFor="vehicle_id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mã loại xe
              </label>
              <input
                type="text"
                id="vehicle_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="HONDA CITY XD3143"
                required
                value={vehicle.vehicleSpec.modelCode}
                onChange={(e) =>
                  setVehicle({
                    ...vehicle,
                    vehicleSpec: {
                      ...vehicle.vehicleSpec,
                      modelCode: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3 w-3/4 ">
            <div>
              <label
                htmlFor="vehicle_price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Số chỗ ngồi
              </label>
              <input
                type="number"
                id="vehicle_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="5"
                required
                value={vehicle.vehicleSpec.noOfSeat}
                onChange={(e) =>
                  setVehicle({
                    ...vehicle,
                    vehicleSpec: {
                      ...vehicle.vehicleSpec,
                      noOfSeat: +e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor="vehicle_price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sản xuất tại
              </label>
              <input
                type="text"
                id="vehicle_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Thái Lan"
                required
                value={vehicle.vehicleSpec.madeIn}
                onChange={(e) =>
                  setVehicle({
                    ...vehicle,
                    vehicleSpec: {
                      ...vehicle.vehicleSpec,
                      madeIn: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor="vehicle_price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Loại nhiên liệu
              </label>
              <input
                type="text"
                id="vehicle_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Xăng"
                required
                value={vehicle.vehicleSpec.fuelType}
                onChange={(e) =>
                  setVehicle({
                    ...vehicle,
                    vehicleSpec: {
                      ...vehicle.vehicleSpec,
                      fuelType: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3 w-3/4 ">
            <div>
              <label
                htmlFor="vehicle_price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mức tiêu thụ nhiên liệu l/100km
              </label>
              <input
                type="number"
                id="vehicle_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="8.6"
                required
                value={vehicle.vehicleSpec.fuelConsumptionPer100Km}
                onChange={(e) =>
                  setVehicle({
                    ...vehicle,
                    vehicleSpec: {
                      ...vehicle.vehicleSpec,
                      fuelConsumptionPer100Km: +e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor="vehicle_price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Dung tích bình nhiên liệu
              </label>
              <input
                type="number"
                id="vehicle_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="40"
                required
                value={vehicle.vehicleSpec.tankCapacity}
                onChange={(e) =>
                  setVehicle({
                    ...vehicle,
                    vehicleSpec: {
                      ...vehicle.vehicleSpec,
                      tankCapacity: +e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor="vehicle_price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tốc độ tối đa (km/h)
              </label>
              <input
                type="number"
                id="vehicle_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="200"
                required
                value={vehicle.vehicleSpec.topSpeed}
                onChange={(e) =>
                  setVehicle({
                    ...vehicle,
                    vehicleSpec: {
                      ...vehicle.vehicleSpec,
                      topSpeed: +e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor="vehicle_price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {" "}
                Kích thước bánh trước
              </label>
              <input
                type="text"
                id="vehicle_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="185/60/R15"
                required
                value={vehicle.vehicleSpec.frontRimsDimension}
                onChange={(e) =>
                  setVehicle({
                    ...vehicle,
                    vehicleSpec: {
                      ...vehicle.vehicleSpec,
                      frontRimsDimension: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor="vehicle_price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Kích thước bánh sau
              </label>
              <input
                type="text"
                id="vehicle_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="185/60/R15"
                required
                value={vehicle.vehicleSpec.backRimsDimension}
                onChange={(e) =>
                  setVehicle({
                    ...vehicle,
                    vehicleSpec: {
                      ...vehicle.vehicleSpec,
                      backRimsDimension: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-auto">
          <div
            className="w-1/5 mt-auto border px-2 py-3 cursor-pointer bg-sky-400 hover:bg-sky-500 active:bg-sky-600 rounded-md text-center items-center content-center shadow-md"
            onClick={() => {
              OnSaveClick();
            }}
          >
            <div className="text-white drop-shadow-lg select-none font-bold">
              Lưu
            </div>
          </div>
          <div
            className="w-1/6 mt-auto border px-2 py-3 cursor-pointer bg-red-400 hover:bg-red-500 active:bg-red-600 rounded-md text-center items-center content-center shadow-md"
            onClick={() => {
              OnCancelClick();
            }}
          >
            <div className="text-white drop-shadow-lg select-none font-bold">
              Hủy
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
