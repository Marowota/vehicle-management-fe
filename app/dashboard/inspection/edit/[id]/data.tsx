import {
  InspectionResult,
  RegisterResult,
  RequestResult,
  Vehicle,
  VehicleInspectionInfo,
} from "@/app/lib/definitions";
import GetKey from "@/app/lib/utilities/get-key";
import axios from "axios";

interface GetVehicleFromIdProps {
  inspectionNo: string;
}

async function GetInspectionFromInspectionNo({
  inspectionNo,
}: GetVehicleFromIdProps): Promise<VehicleInspectionInfo> {
  let res: VehicleInspectionInfo = {} as VehicleInspectionInfo;
  const key = await GetKey();
  await axios
    .get(`${process.env.NEXT_PUBLIC_BE_PATH}/inspection-info/${inspectionNo}`, {
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
  vehicleInspect: VehicleInspectionInfo
): Promise<InspectionResult> {
  console.log(vehicleInspect);
  const key = await GetKey();
  if (!key) return InspectionResult.ERROR;
  let result = await axios.put(
    `${process.env.NEXT_PUBLIC_BE_PATH}/vehicles/${vehicleInspect.plateNumber}/inspection`,
    vehicleInspect,
    {
      headers: {
        "X-API-KEY": key,
      },
    }
  );
  if (result.data == "SUCCESS") return InspectionResult.SUCCESS;
  if (result.data == "EXISTED") return InspectionResult.EXISTED;
  return InspectionResult.ERROR;
}
export { EditData, GetInspectionFromInspectionNo };
