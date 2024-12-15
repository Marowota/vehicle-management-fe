import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log(request.url);
  const acceptHeader = request.headers.get("accept");

  const cookieStore = await cookies();
  const key = cookieStore.get("key");
  let res;
  console.log("middleware called", key);
  try {
    res = await axios.get("http://127.0.0.1:8080/account/verify", {
      headers: {
        "X-API-KEY": key?.value,
      },
    });

    if (request.nextUrl.pathname == "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (acceptHeader && acceptHeader.includes("text/html") && key) {
      const response = NextResponse.next();
      response.headers.set("KEY", key.value);
      return response;
    }
  } catch (e) {
    if (request.nextUrl.pathname == "/") {
      return NextResponse.next();
    } else if (acceptHeader && acceptHeader.includes("text/html")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};
