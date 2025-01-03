"use client";

import {
  RegisterResult,
  RequestResult,
  Vehicle,
  VehicleRegisterInfo,
} from "@/app/lib/definitions";
import { redirect, usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { EditData, GetUsageFromId } from "./data";
import axios from "axios";
import ToastError from "@/app/ui/noti/error";
import GetVehicleData from "@/app/dashboard/vehicle/data";
import ToastSuccess from "@/app/ui/noti/success";

export default function EditUsage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string | null>(null);
  const [vehicleReg, setVehicleReg]: [
    VehicleRegisterInfo,
    Dispatch<SetStateAction<VehicleRegisterInfo>>
  ] = useState<VehicleRegisterInfo>({
    id: 0,
    plateNumber: "",
    teacherName: "",
    courseName: "",
    start: new Date(),
    end: new Date(),
  });

  let [vehicleList, setVehicleList]: [
    Vehicle[],
    Dispatch<SetStateAction<Vehicle[]>>
  ] = useState<Vehicle[]>([]);

  useEffect(() => {
    GetVehicleData("").then((result) => {
      let data = result.data;
      setVehicleList(data);
    });
  }, []);

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (id) {
      GetUsageFromId({ id: id }).then((result) => {
        setVehicleReg((prevState) => {
          console.log("a", result);
          return {
            ...prevState,
            ...result,
            teacherName: result.teacherName ?? "",
            courseName: result.courseName ?? "",
            start: new Date(result.start + "Z"),
            end: new Date(result.end + "Z"),
          };
        });
      });
    }
  }, [id]);

  useEffect(() => {
    console.log("vehicle", vehicleReg);
  }, [vehicleReg]);

  let OnCancelClick = () => {
    redirect("../");
  };

  let OnSaveClick = async () => {
    if (!vehicleReg.plateNumber) {
      ToastError("Vui lòng nhập biển số xe");
      return;
    }
    if (
      vehicleList.findIndex((x) => x.plateNumber == vehicleReg.plateNumber) ==
      -1
    ) {
      ToastError("Biển số không tồn tại");
      return;
    }

    let result: RegisterResult = await EditData(vehicleReg);
    if (result == RegisterResult.ACCEPTED) {
      ToastSuccess("Sửa thành công");
      redirect("../");
    } else if ((result = RegisterResult.DATE_COLLISION)) {
      ToastError("Thời gian sử dụng bị trùng, hãy chọn một thời gian khác");
    } else {
      ToastError("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <>
      <div className="px-10 py-10 h-full w-full flex flex-col ">
        <div className="font-bold text-xl text-blue-900">Đặt lịch sử dụng</div>
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
                list="vehicle"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={vehicleReg.plateNumber}
                onChange={(e) => {
                  setVehicleReg({
                    ...vehicleReg,
                    plateNumber: e.target.value,
                  });
                }}
              />
              <datalist id="vehicle">
                {vehicleList.map(({ plateNumber }, i) => (
                  <option value={plateNumber} key={i}>
                    {plateNumber}
                  </option>
                ))}
              </datalist>
            </div>
          </div>
          <div className="w-3/4 grid gap-6 md:grid-cols-3">
            <div className="col-span-2">
              <label
                htmlFor="vehicle_price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
              >
                Giảng viên
              </label>
              <input
                type="text"
                id="vehicle_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Anh"
                required
                value={vehicleReg.teacherName}
                onChange={(e) =>
                  setVehicleReg({
                    ...vehicleReg,
                    teacherName: e.target.value,
                  })
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
                Tên lớp
              </label>
              <input
                type="text"
                id="vehicle_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Lop oto 11"
                required
                value={vehicleReg.courseName}
                onChange={(e) =>
                  setVehicleReg({
                    ...vehicleReg,
                    courseName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor="vehicle_price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Bắt đầu
              </label>
              <input
                type="datetime-local"
                id="vehicle_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={vehicleReg.start.toISOString().slice(0, 16)}
                onChange={(e) =>
                  setVehicleReg({
                    ...vehicleReg,
                    start: new Date(e.target.value + "Z"),
                  })
                }
              />
            </div>
            <div className="">
              <label
                htmlFor="vehicle_id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Kết thúc
              </label>
              <input
                type="datetime-local"
                id="vehicle_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={vehicleReg.end.toISOString().slice(0, 16)}
                onChange={(e) =>
                  setVehicleReg({
                    ...vehicleReg,
                    end: new Date(e.target.value + "Z"),
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
