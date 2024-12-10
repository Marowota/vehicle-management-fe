import { RequestResult, Vehicle } from "@/app/lib/definitions";
import axios from "axios";

export default async function SaveData(
  vehicle: Vehicle
): Promise<RequestResult> {
  let result = await axios.post("http://127.0.0.1:8080/vehicles", vehicle, {
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
    },
  });
  if (result.data == "SUCCESS") return RequestResult.SUCCESS;
  return RequestResult.ERROR;
}
