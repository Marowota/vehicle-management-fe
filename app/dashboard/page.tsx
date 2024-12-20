"use client";

import { useEffect, useState } from "react";
import { Dashboard, VehicleRegisterInfo } from "../lib/definitions";
import ChartMoney, { options } from "../ui/chart";
import GetDashboardData from "./data";
import { Bar } from "react-chartjs-2";

export default function Page() {
  const [data, setData] = useState({
    usingVehiclesDetail: [] as VehicleRegisterInfo[],
  } as Dashboard);

  useEffect(() => {
    GetDashboardData().then((result) => {
      setData(result);
    });
  }, []);
  return (
    <>
      <div className="px-10 py-10 h-full w-full flex flex-col ">
        <div className="font-bold text-xl text-blue-900">Bảng điều khiển</div>
        <div className="border border-sky-100 my-3"></div>
        <div className="flex w-full h-5/6 gap-4">
          <div className="flex flex-col gap-4 h-full w-4/5 min-w-fit">
            <div className="border flex border-sky-300 h-1/4 rounded-lg items-center min-h-32 ">
              <div className=" w-1/4 h-full p-3 text-center">
                <div className="mb-5">Số lượng Xe</div>
                <div className="text-blue-700 text-4xl">
                  {data.numberOfVehicles}
                </div>
              </div>
              <div className="border border-sky-300 h-4/5 "></div>
              <div className=" w-1/4 h-full p-3 text-center">
                <div className="mb-5">Đang sử dụng</div>
                <div className="text-blue-700 text-4xl">
                  {data.usingVehicles}
                </div>
              </div>
              <div className="border border-sky-300 h-4/5 "></div>
              <div className=" w-1/4 h-full p-3 text-center">
                <div className="mb-5">Đã đăng kiểm</div>
                <div className="text-blue-700 text-4xl">
                  {data.inspectedVehicles}
                </div>
              </div>
              <div className="border border-sky-300 h-4/5 "></div>
              <div className=" w-1/4 h-full p-3 text-center">
                <div className="mb-5">Chi phí năm (tr đồng)</div>
                <div className="text-blue-700 text-4xl">
                  {data.totalYearCost}
                </div>
              </div>
            </div>
            <div className="border border-sky-300 h-3/4 rounded-lg flex justify-center items-center">
              <ChartMoney dataIn={data.costPerMonth} />
            </div>
          </div>
          <div className="border border-sky-300 h-full w-1/5 rounded-lg px-2 py-5">
            <div className=" flex flex-col h-full  ">
              <div className="text-center">Đang sử dụng</div>
              <div className="border border-sky-300 w-4/5 self-center mt-2 "></div>
              <div className="overflow-auto">
                {data.usingVehiclesDetail.map((v, i) => {
                  return (
                    <div key={i} className="w-full flex flex-col ">
                      <div className="px-5 flex flex-col">
                        <div className="font-bold">{v.plateNumber}</div>
                        <div>
                          Từ: {new Date(v.start + "Z").toLocaleString()}
                        </div>
                        <div>Đến: {new Date(v.end + "Z").toLocaleString()}</div>
                      </div>

                      <div className="border border-sky-300 w-4/5 self-center mt-2"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
