import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let res = NextResponse.next();
  //console.log(request.url);
  const acceptHeader = request.headers.get("accept");

  const cookieStore = await cookies();
  const key = cookieStore.get("key");
  console.log("middleware called", key?.value);
  if (request.nextUrl.pathname == "/" && request.method == "POST") {
    //console.log("middleware post", key);
    return res;
  }

  try {
    let result = (
      await axios.get("http://127.0.0.1:8080/account/verify", {
        headers: {
          "X-API-KEY": key?.value,
        },
      })
    ).status;
    if (request.nextUrl.pathname == "/") {
      res = NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (acceptHeader && acceptHeader.includes("text/html") && key) {
      res = NextResponse.next();
      res.headers.set("KEY", key.value);
    }
  } catch (e) {
    if (request.nextUrl.pathname == "/") {
      console.log("hello", request.nextUrl.pathname);
      res = NextResponse.next();
    } else if (acceptHeader && acceptHeader.includes("text/html")) {
      res = NextResponse.redirect(new URL("/", request.url));
    }
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};
