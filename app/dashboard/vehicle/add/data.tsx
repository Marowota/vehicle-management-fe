import { RequestResult, Vehicle } from "@/app/lib/definitions";
import GetKey from "@/app/lib/utilities/get-key";
import axios from "axios";
import { cookies } from "next/headers";

export default async function SaveData(
  vehicle: Vehicle
): Promise<RequestResult> {
  const key = await GetKey();
  if (!key) return RequestResult.ERROR;
  let result = await axios.post(
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
