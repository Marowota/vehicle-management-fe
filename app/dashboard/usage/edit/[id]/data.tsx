import {
  RegisterResult,
  RequestResult,
  Vehicle,
  VehicleRegisterInfo,
} from "@/app/lib/definitions";
import GetKey from "@/app/lib/utilities/get-key";
import axios from "axios";

interface GetVehicleFromIdProps {
  id: string;
}

async function GetUsageFromId({
  id,
}: GetVehicleFromIdProps): Promise<VehicleRegisterInfo> {
  let res: VehicleRegisterInfo = {} as VehicleRegisterInfo;
  const key = await GetKey();
  await axios
    .get(`${process.env.NEXT_PUBLIC_BE_PATH}/vehicles/a/register/${id}`, {
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
  vehicleReg: VehicleRegisterInfo
): Promise<RegisterResult> {
  console.log(vehicleReg);
  const key = await GetKey();
  if (!key) return RegisterResult.ERROR;
  let result = await axios.put(
    `${process.env.NEXT_PUBLIC_BE_PATH}/vehicles/${vehicleReg.plateNumber}/register`,
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
export { EditData, GetUsageFromId };
