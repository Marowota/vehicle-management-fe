import { Dashboard, RequestResult, Vehicle } from "@/app/lib/definitions";
import GetKey from "@/app/lib/utilities/get-key";
import axios, { AxiosResponse } from "axios";

export default async function GetDashboardData(): Promise<Dashboard> {
  let key = await GetKey();
  let [result] = await axios.all([
    axios.get(process.env.NEXT_PUBLIC_BE_PATH + "/dashboard", {
      headers: {
        "X-API-KEY": key,
      },
    }),
  ]);

  return result.data;
}
