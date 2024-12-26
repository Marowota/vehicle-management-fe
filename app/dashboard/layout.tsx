"use client";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import RemoveCookie from "../lib/utilities/cookie";
import LayoutBtn from "../ui/layout-btn";
import SvgLayoutControl from "../ui/svg/svg-layout-control";
import SvgLayoutVehicle from "../ui/svg/svg-layout-vehicle";
import SvgLayoutUsage from "../ui/svg/svg-layout-usage";
import svgLayoutInspection from "../ui/svg/svg-layout-inspection";
import SvgLayoutMaintenance from "../ui/svg/svg-layout-maintenance";
import SvgSetting from "../ui/svg/svg-setting";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  let handleLogout = async () => {
    await RemoveCookie("key");
    redirect("/");
  };
  return (
    <>
      <div className="w-screen h-screen bg-gray-100 flex">
        <div className="h-full w-60 min-w-60 flex-initial px-2 py-3">
          <div className="bg-white w-full h-full rounded-lg shadow-lg flex flex-col py-5 px-3 shrink-0">
            <div className="text-center select-none text-sky-300 font-bold text-3xl mb-5">
              VMS
            </div>
            <div className="border border-sky-200 mb-5"></div>

            <LayoutBtn
              href="/dashboard"
              text="Bảng điều khiển"
              SvgComponent={SvgLayoutControl}
            />
            <LayoutBtn
              href="/dashboard/vehicle"
              text="Phương tiện"
              SvgComponent={SvgLayoutVehicle}
            />

            <LayoutBtn
              href="/dashboard/usage"
              text="Sử dụng"
              SvgComponent={SvgLayoutUsage}
            />

            <LayoutBtn
              href="/dashboard/inspection"
              text="Đăng kiểm"
              SvgComponent={svgLayoutInspection}
            />
            <LayoutBtn
              href="/dashboard/maintenance"
              text="Bảo trì"
              SvgComponent={SvgLayoutMaintenance}
            />
            <LayoutBtn
              href="/dashboard/setting"
              text="Cài đặt"
              SvgComponent={SvgSetting}
            />

            <div
              className="mt-auto border px-2 py-3 cursor-pointer bg-sky-400 hover:bg-sky-500 active:bg-sky-600 rounded-md text-center items-center content-center shadow-md"
              onClick={(e) => {
                handleLogout();
              }}
            >
              <div className="text-white drop-shadow-lg select-none font-bold">
                Đăng xuất
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-5/6 basis-5/6 px-2 py-3 shrink">
          <div className="bg-white w-full h-full rounded-lg shadow-lg">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
