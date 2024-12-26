"use client";

import {
  Account,
  AccountRequestResult,
  RequestResult,
} from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { GetData, SaveData } from "./data";
import ToastError from "@/app/ui/noti/error";
import LoginData from "@/app/data";
import ToastSuccess from "@/app/ui/noti/success";

export default function Setting() {
  let [account, setAccount] = useState({} as Account);
  let [newUsername, setNewUsername] = useState("");
  let [curPass, setCurPass] = useState("");
  let [pass, setPass] = useState("");
  let [rePass, setRePass] = useState("");
  let [changed, setChanged] = useState(false);

  useEffect(() => {
    GetData().then((e) => setAccount(e.data));
  }, [, changed]);

  let SaveUsername = () => {
    if (!newUsername) {
      ToastError("Vui lòng nhập tên tài khoản mới");
      return;
    }
    account.username = newUsername;
    SaveData(account).then((result) => {
      if (result === AccountRequestResult.UPDATED) {
        ToastSuccess("Cập nhật thành công");
        setChanged(!changed);
      } else {
        ToastError("Có lỗi xảy ra, vui lòng thử lại");
      }
    });
  };
  let SavePassword = () => {
    if (!pass) {
      ToastError("Vui lòng nhập mật khẩu mới");
      return;
    }
    if (pass != rePass) {
      ToastError("Mật khẩu nhập lại không khớp");
      return;
    }
    LoginData(account.username, curPass)
      .then((value) => {
        console.log(value);
        if (value.result == RequestResult.SUCCESS) {
          account.password = rePass;
          console.log(rePass);
          SaveData(account).then((result) => {
            if (result === AccountRequestResult.UPDATED) {
              ToastSuccess("Cập nhật thành công");
            } else {
              ToastError("Có lỗi xảy ra, vui lòng thử lại");
            }
          });
        } else {
          ToastError("Mật khẩu cũ không chính xác");
        }
      })
      .catch((e) => {
        ToastError("Có lỗi xảy ra, vui lòng thử lại");
      });
  };
  return (
    <>
      <div className="px-10 py-10 h-full w-full flex flex-col ">
        <div className="font-bold text-xl text-blue-900">Cài đặt</div>
        <div className="border border-sky-100 my-3"></div>
        <div className="flex items-start w-full h-3/4 my-3  flex-col gap-6 overflow-auto">
          <div className="text-blue-700 font-bold"> Đổi tên tài khoản</div>
          <div className="grid gap-6  lg:w-1/4">
            <div>
              <label
                htmlFor="vehicle_id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tên tài khoản mới (tên hiện tại: {account.username})
              </label>
              <input
                list="vehicle"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={newUsername}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    SaveUsername();
                  }
                }}
                onChange={(e) => {
                  setNewUsername(e.target.value);
                }}
              />
            </div>
            <div className=" mt-auto border px-2 py-3 cursor-pointer bg-sky-400 hover:bg-sky-500 active:bg-sky-600 rounded-md text-center items-center content-center shadow-md">
              <div
                className="text-white drop-shadow-lg select-none font-bold"
                onClick={() => {
                  SaveUsername();
                }}
              >
                Lưu
              </div>
            </div>
          </div>

          <div className="text-blue-700 font-bold mt-5"> Đổi mật khẩu</div>
          <div className="grid gap-6  lg:w-1/4">
            <div>
              <label
                htmlFor="vehicle_id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mật khẩu cũ
              </label>
              <input
                list="vehicle"
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={curPass}
                onChange={(e) => {
                  setCurPass(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="vehicle_id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mật khẩu mới
              </label>
              <input
                list="vehicle"
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="vehicle_id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nhập lại mật khẩu mới
              </label>
              <input
                list="vehicle"
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={rePass}
                onChange={(e) => {
                  setRePass(e.target.value);
                }}
              />
            </div>
            <div className=" mt-auto border px-2 py-3 cursor-pointer bg-sky-400 hover:bg-sky-500 active:bg-sky-600 rounded-md text-center items-center content-center shadow-md">
              <div
                className="text-white drop-shadow-lg select-none font-bold"
                onClick={() => {
                  SavePassword();
                }}
              >
                Lưu
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
