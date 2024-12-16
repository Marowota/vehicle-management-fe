import { RequestResult, Vehicle } from "@/app/lib/definitions";
import GetKey from "@/app/lib/utilities/get-key";
import axios from "axios";

interface GetVehicleFromIdProps {
  id: string;
}

async function GetVehicleFromId({
  id,
}: GetVehicleFromIdProps): Promise<Vehicle> {
  let res: Vehicle = {} as Vehicle;
  const key = await GetKey();
  await axios
    .get(`${process.env.NEXT_PUBLIC_BE_PATH}/vehicles/${id}`, {
      headers: {
        "X-API-KEY": key,
      },
    })
    .then((e) => {
      res = e.data;
    });
  return res;
}

async function EditData(vehicle: Vehicle): Promise<RequestResult> {
  const key = await GetKey();
  let result = await axios.put(
    process.env.NEXT_PUBLIC_BE_PATH + "/vehicles",
    vehicle,
    {
      headers: {
        "X-API-KEY": key,
      },
    }
  );
  if (result.data == "SUCCESS") return RequestResult.SUCCESS;
  return RequestResult.ERROR;
}

export { EditData, GetVehicleFromId };
