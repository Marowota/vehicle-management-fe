import {
  Account,
  AccountRequestResult,
  InspectionResult,
  RegisterResult,
  RequestResult,
  VehicleInspectionInfo,
  VehicleMaintenanceInfo,
} from "@/app/lib/definitions";
import GetKey from "@/app/lib/utilities/get-key";
import axios, { Axios, AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function GetData(): Promise<AxiosResponse> {
  const key = await GetKey();
  let [result] = await axios.all([
    axios.get(process.env.NEXT_PUBLIC_BE_PATH + "/account/get", {
      headers: {
        "X-API-KEY": key,
      },
    }),
  ]);

  console.log(result.data);

  return result;
}

export async function SaveData(
  accountData: Account
): Promise<AccountRequestResult> {
  console.log(accountData);

  const key = await GetKey();
  if (!key) return AccountRequestResult.ERROR;
  let result = await axios.put(
    `${process.env.NEXT_PUBLIC_BE_PATH}/account/update`,
    accountData,
    {
      headers: {
        "X-API-KEY": key,
      },
    }
  );
  if (result.data == "UPDATED") return AccountRequestResult.UPDATED;
  else return AccountRequestResult.ERROR;
}
