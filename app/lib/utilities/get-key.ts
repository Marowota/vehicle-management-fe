"use server";
import { cookies } from "next/headers";

export default async function GetKey() {
  const cookieStore = await cookies();
  let key = cookieStore.get("key")?.value;
  console.log("get key");
  return key;
}
