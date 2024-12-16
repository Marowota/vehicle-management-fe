"use client";

import {
  Vehicle,
  VehicleInspectionInfo,
  VehicleSpec,
} from "@/app/lib/definitions";
import SvgDelete from "@/app/ui/svg/svg-delete";
import SvgEdit from "@/app/ui/svg/svg-edit";
import TableSortSvg from "@/app/ui/table-sort-svg";
import axios from "axios";
import Link from "next/link";
import DeleteData from "./delete/data";
import GetData from "./data";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import SvgSearch from "@/app/ui/svg/svg-search";
import SearchBar from "@/app/ui/search/search-bar";
import DialogDemo from "@/app/ui/dialog";
import TableDialog from "@/app/ui/table-dialog";

export default function Page() {
  //const [search, setSearch] = useState<String>("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  useEffect(() => {
    GetData("").then((e) => setVehicles(e.data));
  }, []);

  let searchHandler = (search: string) => {
    GetData(search).then((e) => setVehicles(e.data));
  };

  let deleteClickHandler = (vehicle: Vehicle, index: number) => {
    DeleteData(vehicle);
    setVehicles(vehicles.filter((data, i) => i != index));
    toast.success("Xóa thành công", {
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
  };

  return (
    <>
      <div className="px-10 py-10 h-full w-full flex flex-col ">
        <div className="font-bold text-xl text-blue-900">Phương tiện</div>
        <div className="border border-sky-100 my-3"></div>

        <div className="flex items-start h-1/12 w-full my-3 ">
          <div className="flex">
            <SearchBar onSearch={searchHandler} />
          </div>
          <div className="ml-auto ">
            <Link
              href={"./vehicle/add"}
              className="block border h-10 w-28 px-2 py-1 cursor-pointer bg-sky-400 border-sky-500 hover:bg-sky-500 active:bg-sky-600 rounded text-center items-center content-center shadow-sm"
            >
              <div className="text-white text-sm drop-shadow-lg select-none">
                Thêm xe
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full h-3/4">
          <div className="flex gap-2  ">
            <div className="border border-sky-300 bg-sky-100 text-blue-800 rounded-2xl p-1 text-xs min-w-16 text-center">
              {vehicles.length} xe
            </div>
          </div>
          <div className="w-full h-full flex ">
            <div className="relative overflow-auto shadow-md sm:rounded-lg w-full h-full  ">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-blue-700 uppercase bg-blue-50 dark:bg-gray-700 dark:text-gray-400 sticky  top-0">
                  <tr>
                    <th scope="col" className="px-6 py-3  z-10">
                      Biển số xe
                    </th>
                    <th scope="col" className="px-6 py-3  z-10">
                      <div className="flex items-center ">
                        Thông số
                        <a href="#">
                          <TableSortSvg />
                        </a>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3  z-10">
                      <div className="flex items-center">
                        Giá
                        <a href="#">
                          <TableSortSvg />
                        </a>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3  z-10">
                      <div className="flex items-center">
                        Tình Trạng
                        <a href="#">
                          <TableSortSvg />
                        </a>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3  z-10">
                      <div className="flex items-center">
                        Mã đăng kiểm
                        <a href="#">
                          <TableSortSvg />
                        </a>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3  z-10">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle, i): React.ReactNode => {
                    return (
                      <tr
                        className="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-sky-50 "
                        key={i}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                        >
                          {vehicle.plateNumber}
                        </th>

                        <td className="px-6 py-4">
                          <TableDialog
                            plateNumber={vehicle.plateNumber}
                            spec={vehicle.vehicleSpec}
                          />
                        </td>
                        <td className="px-6 py-4">{vehicle.cost}</td>
                        <td className="px-6 py-4">{vehicle.health}</td>
                        <td className="px-6 py-4">
                          {vehicle.currentInspectId}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex h-8 w-fit ml-auto">
                            <div className="ml-auto flex gap-2">
                              <Link
                                href={`./vehicle/edit/${
                                  vehicle.plateNumber != ""
                                    ? vehicle.plateNumber
                                    : "-0"
                                }`}
                                className="h-8 w-8 hover:bg-sky-200 rounded-full p-1 cursor-pointer active:bg-sky-300"
                              >
                                <SvgEdit />
                              </Link>
                              <div
                                className="h-8 w-8 hover:bg-sky-200 rounded-full p-1 cursor-pointer active:bg-sky-300"
                                onClick={(e) => {
                                  deleteClickHandler(vehicle, i);
                                }}
                              >
                                <SvgDelete />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
