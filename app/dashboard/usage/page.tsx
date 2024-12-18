"use client";

import {
  Vehicle,
  VehicleInspectionInfo,
  VehicleRegisterInfo,
  VehicleSpec,
} from "@/app/lib/definitions";
import SvgDelete from "@/app/ui/svg/svg-delete";
import SvgEdit from "@/app/ui/svg/svg-edit";
import TableSortSvg from "@/app/ui/table-sort-svg";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import SvgSearch from "@/app/ui/svg/svg-search";
import SearchBar from "@/app/ui/search/search-bar";
import DialogDemo from "@/app/ui/dialog";
import TableDialog from "@/app/ui/table-dialog";
import ToastSuccess from "@/app/ui/noti/success";
import DateTimePicker from "@/app/ui/date-time-picker";
import classNamesConverter from "@/app/lib/utilities/class-name-converter";
import GetData from "./data";
import DeleteData from "./delete/data";

export default function UsagePage() {
  //const [search, setSearch] = useState<String>("");
  const [vehicleRegs, setVehicleRegs] = useState<VehicleRegisterInfo[]>([]);

  const [fromDate, setFromDate] = useState<Date>(new Date(Date.UTC(0, 1, 1)));
  const [toDate, setToDate] = useState<Date>(new Date(Date.UTC(3000, 1, 1)));
  const tableHeader = [
    "Biển số xe",
    "Tên giảng viên",
    "Tên lớp",
    "Bắt đầu",
    "Kết thúc",
  ];

  useEffect(() => {
    GetData(fromDate, toDate).then((e) => setVehicleRegs(e.data));
  }, []);

  let searchHandler = () => {
    GetData(fromDate, toDate).then((e) => setVehicleRegs(e.data));
  };

  let deleteClickHandler = (vehicleReg: VehicleRegisterInfo, index: number) => {
    DeleteData(vehicleReg);
    setVehicleRegs(vehicleRegs.filter((data, i) => i != index));
    ToastSuccess("Xóa thành công");
  };

  return (
    <>
      <div className="px-10 py-10 h-full w-full flex flex-col ">
        <div className="font-bold text-xl text-blue-900">Sử dụng</div>
        <div className="border border-sky-100 my-3"></div>

        <div className="flex items-start h-1/12 w-full my-3 ">
          <div className="flex gap-4">
            <div>
              <p>Từ ngày</p>
              <DateTimePicker
                onChange={(value) => {
                  if (!value) {
                    setFromDate(new Date(Date.UTC(0, 1, 1)));
                    return;
                  }
                  setFromDate(new Date(value + "Z"));
                }}
              />
            </div>
            <div>
              <p>Đến ngày</p>
              <DateTimePicker
                onChange={(value) => {
                  if (!value) {
                    setToDate(new Date(Date.UTC(3000, 1, 1)));
                    return;
                  }
                  setToDate(new Date(value + "Z"));
                }}
              />
            </div>
            <div>
              <p className="text-white">.</p>
              <div
                className="border h-10 px-2 py-1 cursor-pointer bg-sky-400 border-sky-500 hover:bg-sky-500 active:bg-sky-600 rounded-lg text-center items-center content-center shadow-sm"
                onClick={(e) => {
                  searchHandler();
                }}
              >
                <div className="text-white text-sm drop-shadow-lg select-none">
                  <SvgSearch className="stroke-white h-5 w-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="ml-auto ">
            <Link
              href={"./usage/add"}
              className="block border h-10 w-28 px-2 py-1 cursor-pointer bg-sky-400 border-sky-500 hover:bg-sky-500 active:bg-sky-600 rounded text-center items-center content-center shadow-sm"
            >
              <div className="text-white text-sm drop-shadow-lg select-none">
                Đặt lịch
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full h-3/4">
          {/* <div className="flex gap-2  ">
            <div className="border border-sky-300 bg-sky-100 text-blue-800 rounded-2xl p-1 text-xs min-w-16 text-center">
              {vehicles.length} xe
            </div>
          </div> */}
          <div className="w-full h-full flex ">
            <div className="relative overflow-auto shadow-md sm:rounded-lg w-full h-full  ">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-blue-700 uppercase bg-blue-50 dark:bg-gray-700 dark:text-gray-400 sticky  top-0">
                  <tr>
                    {tableHeader.map((header, i): React.ReactNode => {
                      return (
                        <th scope="col" className="px-6 py-3  z-10" key={i}>
                          <div className="flex items-center ">
                            {header}
                            <a href="#">
                              <TableSortSvg />
                            </a>
                          </div>
                        </th>
                      );
                    })}
                    <th scope="col" className="px-6 py-3  z-10">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleRegs.map((vehicleReg, i): React.ReactNode => {
                    return (
                      <tr
                        className="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-sky-50 "
                        key={i}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                        >
                          {vehicleReg.plateNumber}
                        </th>

                        <td className="px-6 py-4">{vehicleReg.teacherName}</td>
                        <td className="px-6 py-4">{vehicleReg.courseName}</td>
                        <td className="px-6 py-4">
                          {new Date(
                            vehicleReg.start.toLocaleString()
                          ).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(
                            vehicleReg.end.toLocaleString()
                          ).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex h-8 w-fit ml-auto">
                            <div className="ml-auto flex gap-2">
                              <Link
                                href={`./usage/edit/${vehicleReg.id.toString()}`}
                                className="h-8 w-8 hover:bg-sky-200 rounded-full p-1 cursor-pointer active:bg-sky-300"
                              >
                                <SvgEdit />
                              </Link>
                              <div
                                className="h-8 w-8 hover:bg-sky-200 rounded-full p-1 cursor-pointer active:bg-sky-300"
                                onClick={(e) => {
                                  deleteClickHandler(vehicleReg, i);
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
