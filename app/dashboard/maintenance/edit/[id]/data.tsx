import {
  InspectionResult,
  RegisterResult,
  RequestResult,
  Vehicle,
  VehicleMaintenanceInfo,
} from "@/app/lib/definitions";
import GetKey from "@/app/lib/utilities/get-key";
import axios from "axios";

async function GetMaintenanceFromId({
  id,
}: {
  id: string;
}): Promise<VehicleMaintenanceInfo> {
  let res: VehicleMaintenanceInfo = {} as VehicleMaintenanceInfo;
  const key = await GetKey();
  await axios
    .get(`${process.env.NEXT_PUBLIC_BE_PATH}/maintenance-info/${id}`, {
      headers: {
        "X-API-KEY": key,
      },
    })
    .then((e) => {
      res = e.data;
    });
  return res;
}

async function EditData(
  vehicleInspect: VehicleMaintenanceInfo
): Promise<RequestResult> {
  console.log(vehicleInspect);
  const key = await GetKey();
  if (!key) return RequestResult.ERROR;
  let result = await axios.put(
    `${process.env.NEXT_PUBLIC_BE_PATH}/vehicles/${vehicleInspect.plateNumber}/maintenance`,
    vehicleInspect,
    {
      headers: {
        "X-API-KEY": key,
      },
    }
  );
  if (result.data == "SUCCESS") return RequestResult.SUCCESS;
  return RequestResult.ERROR;
}
export { EditData, GetMaintenanceFromId };
