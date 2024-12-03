import {
  Vehicle,
  VehicleInspectionInfo,
  VehicleSpec,
} from "@/app/lib/definitions";
import SvgDelete from "@/app/ui/svg-delete";
import SvgEdit from "@/app/ui/svg-edit";
import TableSortSvg from "@/app/ui/table-sort-svg";
import axios from "axios";
import Link from "next/link";

export default async function Page() {
  let [responseV, responseI, responseS] = await axios.all([
    axios.get("http://127.0.0.1:8080/vehicles", {
      headers: {
        "X-API-KEY":
          "$2a$05$NtAgEM5Pbh30mFlU8CWwTOpFkw4OGNXYR7Xm0RkbCiSc0hCqSqTVy",
      },
    }),
    await axios.get("http://127.0.0.1:8080/inspection-info", {
      headers: {
        "X-API-KEY":
          "$2a$05$NtAgEM5Pbh30mFlU8CWwTOpFkw4OGNXYR7Xm0RkbCiSc0hCqSqTVy",
      },
    }),
  ]);

  let vehicles: Vehicle[] = responseV.data;
  let inspection: VehicleInspectionInfo[] = responseI.data;

  return (
    <>
      <div className="px-10 py-10 h-full w-full flex flex-col ">
        <div className="font-bold text-xl text-blue-900">Phương tiện</div>
        <div className="border border-sky-100 my-3"></div>

        <div className="flex items-start h-1/12 w-full my-3 ">
          <div className="flex">
            <input
              placeholder="Tìm kiếm"
              type="text"
              className="w-96 h-10 shadow-sm p-2.5 text-sm bg-sky-50 border border-sky-300 placeholder:text-blue-300 text-blue-900 rounded-l-lg focus:border focus:ring-sky-500 focus:border-sky-900 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="border h-10 px-2 py-1 cursor-pointer bg-sky-400 border-sky-500 hover:bg-sky-500 active:bg-sky-600 rounded-r-lg text-center items-center content-center shadow-sm">
              <div className="text-white text-sm drop-shadow-lg select-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="stroke-white h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
            </div>
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
                <thead className="text-xs text-blue-700 uppercase bg-blue-50 dark:bg-gray-700 dark:text-gray-400 sticky z-10 top-0">
                  <tr>
                    <th scope="col" className="px-6 py-3  z-10">
                      Biển số xe
                    </th>
                    <th scope="col" className="px-6 py-3  z-10">
                      <div className="flex items-center">
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
                  {vehicles.map((e, i): React.ReactNode => {
                    return (
                      <>
                        <tr
                          className="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-sky-50"
                          key={i}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {e.plateNumber}
                          </th>

                          <td className="px-6 py-4">{e.vehicleSpec.brand}</td>
                          <td className="px-6 py-4">{e.cost}</td>
                          <td className="px-6 py-4">{e.health}</td>
                          <td className="px-6 py-4">{e.currentInspectId}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex h-8 w-fit ml-auto">
                              <div className="ml-auto flex gap-2">
                                <Link
                                  href={`./vehicle/edit/${
                                    e.plateNumber != "" ? e.plateNumber : "-0"
                                  }`}
                                  className="h-8 w-8 hover:bg-sky-200 rounded-full p-1 cursor-pointer active:bg-sky-300"
                                >
                                  <SvgEdit />
                                </Link>
                                <div className="h-8 w-8 hover:bg-sky-200 rounded-full p-1 cursor-pointer active:bg-sky-300">
                                  <SvgDelete />
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
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
