"use server";
import { cookies } from "next/headers";

export default async function RemoveCookie(key: string) {
  console.log("called");
  (await cookies()).delete(key);
}
