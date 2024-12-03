import { RequestResult, Vehicle } from "@/app/lib/definitions";
import axios from "axios";

export default async function SaveData(
  vehicle: Vehicle
): Promise<RequestResult> {
  try {
    let result = await axios.post("http://127.0.0.1:8080/vehicles", vehicle, {
      headers: {
        "X-API-KEY":
          "$2a$05$NtAgEM5Pbh30mFlU8CWwTOpFkw4OGNXYR7Xm0RkbCiSc0hCqSqTVy",
      },
    });
    if (result.data == "SUCCESS") return RequestResult.SUCCESS;
    return RequestResult.ERROR;
  } catch (e) {
    console.log(e);
    return RequestResult.ERROR;
  }
}
