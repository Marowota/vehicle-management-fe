"use client";

import {
  InspectionResult,
  RegisterResult,
  RequestResult,
  Vehicle,
  VehicleMaintenanceInfo,
} from "@/app/lib/definitions";
import { redirect, usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { EditData, GetMaintenanceFromId } from "./data";
import axios from "axios";
import ToastError from "@/app/ui/noti/error";
import GetVehicleData from "@/app/dashboard/vehicle/data";
import ToastSuccess from "@/app/ui/noti/success";

export default function EditInspection({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string | null>(null);
  const [vehicleMaintenance, setVehicleMaintenance]: [
    VehicleMaintenanceInfo,
    Dispatch<SetStateAction<VehicleMaintenanceInfo>>
  ] = useState<VehicleMaintenanceInfo>({
    plateNumber: "",
    start: new Date(),
    end: new Date(),
    info: "",
    cost: 0,
  } as VehicleMaintenanceInfo);

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
      GetMaintenanceFromId({ id: id }).then((result) => {
        setVehicleMaintenance((prevState) => {
          console.log("a", result);
          return {
            ...prevState,
            ...result,
            start: new Date(result.start + "Z"),
            end: new Date(result.end + "Z"),
          };
        });
      });
    }
  }, [id]);

  useEffect(() => {
    console.log("vehicle", vehicleMaintenance);
  }, [vehicleMaintenance]);

  let OnCancelClick = () => {
    redirect("../");
  };

  let OnSaveClick = async () => {
    if (!vehicleMaintenance.plateNumber) {
      ToastError("Vui lòng nhập biển số xe");
      return;
    }
    if (
      vehicleList.findIndex(
        (x) => x.plateNumber == vehicleMaintenance.plateNumber
      ) == -1
    ) {
      ToastError("Biển số không tồn tại");
      return;
    }
    let result: RequestResult = await EditData(vehicleMaintenance);
    if (result == RequestResult.SUCCESS) {
      ToastSuccess("Sửa thành công");
      redirect("../");
    } else {
      ToastError("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <>
      <div className="px-10 py-10 h-full w-full flex flex-col ">
        <div className="font-bold text-xl text-blue-900">
          Sửa thông tin bảo trì
        </div>
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
                placeholder="KH-123456"
                value={vehicleMaintenance.plateNumber}
                onChange={(e) => {
                  setVehicleMaintenance({
                    ...vehicleMaintenance,
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
                Thông tin bảo trì
              </label>
              <input
                type="text"
                id="vehicle_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="KC1708901"
                required
                value={vehicleMaintenance.info}
                readOnly
                onChange={(e) =>
                  setVehicleMaintenance({
                    ...vehicleMaintenance,
                    info: e.target.value,
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
                Chi phí (triệu đồng)
              </label>
              <input
                type="number"
                id="vehicle_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="50"
                required
                value={vehicleMaintenance.cost}
                onChange={(e) =>
                  setVehicleMaintenance({
                    ...vehicleMaintenance,
                    cost: +e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor="vehicle_price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ngày bắt đầu
              </label>
              <input
                type="date"
                id="vehicle_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={vehicleMaintenance.start.toISOString().slice(0, 10)}
                onChange={(e) =>
                  setVehicleMaintenance({
                    ...vehicleMaintenance,
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
                Ngày hoàn thành
              </label>
              <input
                type="date"
                id="vehicle_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={vehicleMaintenance.end.toISOString().slice(0, 10)}
                onChange={(e) =>
                  setVehicleMaintenance({
                    ...vehicleMaintenance,
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
