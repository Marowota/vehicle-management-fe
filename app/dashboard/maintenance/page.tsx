"use client";

import {
  InspectionSearchParams,
  MaintenanceSearchType,
  VehicleMaintenanceInfo,
} from "@/app/lib/definitions";
import SvgDelete from "@/app/ui/svg/svg-delete";
import SvgEdit from "@/app/ui/svg/svg-edit";
import TableSortSvg from "@/app/ui/table-sort-svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import SvgSearch from "@/app/ui/svg/svg-search";
import ToastSuccess from "@/app/ui/noti/success";
import DateTimePicker from "@/app/ui/date-time-picker";
import GetData from "./data";
import DatePicker from "@/app/ui/date-picker";
import DeleteData from "./delete/data";

export default function InspectionPage() {
  const [search, setSearch] = useState<string>("");
  const [searchOption, setSearchOption] = useState(
    MaintenanceSearchType.PLATE_NUMBER
  );
  const [vehicleMaintenances, setVehicleInspects] = useState<
    VehicleMaintenanceInfo[]
  >([]);
  const [searchClicked, setSearchClicked] = useState(false);

  const [fromDate, setFromDate] = useState<Date>(new Date(Date.UTC(0, 1, 1)));
  const [toDate, setToDate] = useState<Date>(new Date(Date.UTC(3000, 1, 1)));
  const tableHeader = [
    "Biển số xe",
    "Từ ngày",
    "Đến ngày",
    "Chi phí (Tr Đ)",
    "Ghi chú",
  ];

  useEffect(() => {}, [searchOption]);

  useEffect(() => {
    GetData({
      from: fromDate,
      to: toDate,
      query: search,
      searchOption: searchOption,
    }).then((e) => setVehicleInspects(e.data));
  }, [, searchClicked]);

  let searchHandler = () => {
    setSearchClicked(!searchClicked);
  };

  let deleteClickHandler = (
    vehicleMaintenance: VehicleMaintenanceInfo,
    index: number
  ) => {
    DeleteData(vehicleMaintenance);
    setVehicleInspects(vehicleMaintenances.filter((data, i) => i != index));
    ToastSuccess("Xóa thành công");
  };

  return (
    <>
      <div className="px-10 py-10 h-full w-full flex flex-col ">
        <div className="font-bold text-xl text-blue-900">Bảo trì</div>
        <div className="border border-sky-100 my-3"></div>

        <div className="flex items-start h-1/12 w-full my-3 ">
          <div className="flex gap-4">
            {searchOption == MaintenanceSearchType.START ||
            searchOption == MaintenanceSearchType.END ? (
              <>
                <div>
                  <p>Từ ngày</p>
                  <DatePicker
                    onChange={(value) => {
                      if (!value) {
                        setFromDate(new Date("1-1-1Z"));
                        return;
                      }
                      setFromDate(new Date(value + "Z"));
                    }}
                  />
                </div>
                <div>
                  <p>Đến ngày</p>
                  <DatePicker
                    onChange={(value) => {
                      if (!value) {
                        setToDate(new Date("3000-1-1Z"));
                        return;
                      }
                      setToDate(new Date(value + "Z"));
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <div>Tìm</div>
                  <input
                    placeholder="Tìm kiếm"
                    type="text"
                    className="w-96 h-11 shadow-sm p-2.5 text-sm bg-sky-50 border border-sky-300 placeholder:text-blue-300 text-blue-900 rounded-lg focus:border focus:ring-sky-500 focus:border-sky-900 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        searchHandler();
                      }
                    }}
                  />
                </div>
              </>
            )}
            <div>
              <p>Dựa trên</p>
              <select
                className="bg-sky-50 border border-sky-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={searchOption}
                onChange={(e) => {
                  const params: MaintenanceSearchType = e.target
                    .value as MaintenanceSearchType;
                  setSearchOption(params);
                }}
              >
                <option value="START">Từ ngày</option>
                <option value="END">Đến ngày</option>
                <option value="PLATE_NUMBER">Biển số xe</option>
              </select>
            </div>
            <div>
              <p className="text-white">.</p>
              <div
                className="border h-11 px-2 py-1 cursor-pointer bg-sky-400 border-sky-500 hover:bg-sky-500 active:bg-sky-600 rounded-lg text-center items-center content-center shadow-sm"
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
              href={"./maintenance/add"}
              className="block border h-10 w-28 px-2 py-1 cursor-pointer bg-sky-400 border-sky-500 hover:bg-sky-500 active:bg-sky-600 rounded text-center items-center content-center shadow-sm"
            >
              <div className="text-white text-sm drop-shadow-lg select-none">
                Thêm
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full h-3/4">
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
                  {vehicleMaintenances.map((vehicleReg, i): React.ReactNode => {
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

                        <td className="px-6 py-4">
                          {new Date(
                            vehicleReg.start.toLocaleString()
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(
                            vehicleReg.end.toLocaleString()
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">{vehicleReg.cost}</td>
                        <td className="px-6 py-4">{vehicleReg.info}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex h-8 w-fit ml-auto">
                            <div className="ml-auto flex gap-2">
                              <Link
                                href={`./maintenance/edit/${vehicleReg.id.toString()}`}
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
