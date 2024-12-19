import {
  InspectionResult,
  RegisterResult,
  RequestResult,
  VehicleInspectionInfo,
} from "@/app/lib/definitions";
import GetKey from "@/app/lib/utilities/get-key";
import axios from "axios";
import { cookies } from "next/headers";

export default async function SaveData(
  vehicleInspect: VehicleInspectionInfo
): Promise<InspectionResult> {
  console.log(vehicleInspect);

  const key = await GetKey();
  if (!key) return InspectionResult.ERROR;
  let result = await axios.post(
    `${process.env.NEXT_PUBLIC_BE_PATH}/vehicles/${vehicleInspect.plateNumber}/set-inspection`,
    vehicleInspect,
    {
      headers: {
        "X-API-KEY": key,
      },
    }
  );
  if (result.data == "SUCCESS") return InspectionResult.SUCCESS;
  if (result.data == "EXISTED") return InspectionResult.EXISTED;
  else return InspectionResult.ERROR;
}
