import { RequestResult, Vehicle } from "@/app/lib/definitions";
import GetKey from "@/app/lib/utilities/get-key";
import axios, { AxiosResponse } from "axios";

export default async function GetData(
  from?: Date,
  to?: Date
): Promise<AxiosResponse> {
  let key = await GetKey();
  let stringFrom = from?.toISOString();
  let stringTo = to?.toISOString();

  console.log(stringFrom?.substring(0, stringFrom.length - 5));
  console.log(stringTo?.substring(0, stringTo.length - 5));
  let [result] = await axios.all([
    axios.get(process.env.NEXT_PUBLIC_BE_PATH + "/register-info", {
      headers: {
        "X-API-KEY": key,
      },
      params: {
        from: stringFrom?.substring(0, stringFrom.length - 5),
        to: stringTo?.substring(0, stringTo.length - 5),
      },
    }),
  ]);

  console.log(result.data);

  return result;
}
