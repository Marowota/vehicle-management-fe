import {
  RegisterResult,
  RequestResult,
  VehicleInspectionInfo,
} from "@/app/lib/definitions";
import GetKey from "@/app/lib/utilities/get-key";
import axios from "axios";
import { cookies } from "next/headers";

export default async function SaveData(
  vehicleInspect: VehicleInspectionInfo
): Promise<RequestResult> {
  console.log(vehicleInspect);

  const key = await GetKey();
  if (!key) return RequestResult.ERROR;
  let result = await axios.post(
    `${process.env.NEXT_PUBLIC_BE_PATH}/vehicles/${vehicleInspect.plateNumber}/set-inspection`,
    vehicleInspect,
    {
      headers: {
        "X-API-KEY": key,
      },
    }
  );
  if (result.data == "SUCCESS") return RequestResult.SUCCESS;
  else return RequestResult.ERROR;
}
