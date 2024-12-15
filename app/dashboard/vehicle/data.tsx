import { RequestResult, Vehicle } from "@/app/lib/definitions";
import GetKey from "@/app/lib/utilities/get-key";
import axios, { AxiosResponse } from "axios";

export default async function GetData(search: String): Promise<AxiosResponse> {
  let key = await GetKey();
  let [result, resultI] = await axios.all([
    axios.get(process.env.NEXT_PUBLIC_BE_PATH + "/vehicles", {
      headers: {
        "X-API-KEY": key,
      },
      params: {
        query: search,
      },
    }),
    axios.get(process.env.NEXT_PUBLIC_BE_PATH + "/inspection-info", {
      headers: {
        "X-API-KEY": key,
      },
    }),
  ]);

  return result;
}
