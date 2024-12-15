"use server";

import { RequestResult, ResponseInfo, Vehicle } from "@/app/lib/definitions";
import axios from "axios";
import { cookies } from "next/headers";

export default async function LoginData(
  username: string,
  password: string
): Promise<ResponseInfo> {
  let result = {
    message: "Đăng nhập thành công",
    result: RequestResult.SUCCESS,
  };
  await axios
    .post("http://127.0.0.1:8080/login", {
      username: username,
      password: password,
    })
    .then(async (res) => {
      const cookieStore = await cookies();
      cookieStore.set("key", res.data.key);
      console.log("key", res.data.key);
    })
    .catch((e) => {
      //console.log(e);
      result = {
        message: e,
        result: RequestResult.ERROR,
      };
    });

  return result;
}
