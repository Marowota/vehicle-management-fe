import {
  RegisterResult,
  RequestResult,
  Vehicle,
  VehicleRegisterInfo,
} from "@/app/lib/definitions";
import GetKey from "@/app/lib/utilities/get-key";
import axios from "axios";
import { cookies } from "next/headers";

export default async function SaveData(
  vehicleReg: VehicleRegisterInfo
): Promise<RegisterResult> {
  const key = await GetKey();
  if (!key) return RegisterResult.ERROR;
  let result = await axios.post(
    process.env.NEXT_PUBLIC_BE_PATH + "/vehicles",
    vehicleReg,
    {
      headers: {
        "X-API-KEY": key,
      },
    }
  );
  if (result.data == "ACCEPTED") return RegisterResult.ACCEPTED;
  if (result.data == "DATE_COLLISION") return RegisterResult.DATE_COLLISION;
  return RegisterResult.ERROR;
}
