"use client";
import Image from "next/image";
import Link from "next/link";
import RemoveCookie from "./cookie";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

            <Link
              href={"/dashboard"}
              className="hover:bg-sky-50 rounded-md font-bold px-3 py-2 select-none cursor-pointer active:bg-sky-100 flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 mr-1 stroke-blue-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                />
              </svg>{" "}
              <p className="text text-md text-blue-900 ">Bảng điều khiển</p>
            </Link>
            <Link
              href={"/dashboard/vehicle"}
              className="hover:bg-sky-50 rounded-md font-bold px-3 py-2 select-none cursor-pointer active:bg-sky-100 flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 mr-1 stroke-blue-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>

              <p className="text text-md text-blue-900 ">Phương tiện</p>
            </Link>
            <Link
              href={"/dashboard/usage"}
              className="hover:bg-sky-50 rounded-md font-bold px-3 py-2 select-none cursor-pointer active:bg-sky-100 flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 mr-1 stroke-blue-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>

              <p className="text text-md text-blue-900 ">Sử dụng</p>
            </Link>
            <Link
              href={"/dashboard/inspection"}
              className="hover:bg-sky-50 rounded-md font-bold px-3 py-2 select-none cursor-pointer active:bg-sky-100 flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 mr-1 stroke-blue-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>

              <p className="text text-md text-blue-900 ">Đăng kiểm</p>
            </Link>
            <Link
              href={"/dashboard/maintenance"}
              className="hover:bg-sky-50 rounded-md px-3 py-2 select-none cursor-pointer active:bg-sky-100 flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 mr-1 stroke-blue-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                />
              </svg>

              <p className="text text-md text-blue-900 font-bold ">Bảo trì</p>
            </Link>
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
