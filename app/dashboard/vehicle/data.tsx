import { RequestResult, Vehicle } from "@/app/lib/definitions";
import axios, { AxiosResponse } from "axios";

export default async function GetData(): Promise<AxiosResponse> {
  let [result, resultI] = await axios.all([
    axios.get("http://127.0.0.1:8080/vehicles", {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
      },
    }),
    await axios.get("http://127.0.0.1:8080/inspection-info", {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
      },
    }),
  ]);

  if (result.data == "SUCCESS") return result;
  return result;
}
