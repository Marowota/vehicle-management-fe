import { RequestResult, Vehicle } from "@/app/lib/definitions";
import GetKey from "@/app/lib/utilities/get-key";
import axios from "axios";

export default async function DeleteData(
  vehicle: Vehicle
): Promise<RequestResult> {
  const key = await GetKey();
  let result = await axios.delete(
    process.env.NEXT_PUBLIC_BE_PATH + "/vehicles/" + vehicle.plateNumber,
    {
      headers: {
        "X-API-KEY": key,
      },
    }
  );
  if (result.data == "SUCCESS") return RequestResult.SUCCESS;
  return RequestResult.ERROR;
}
