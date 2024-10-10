import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });
  console.log("Token received:", token);

  const protectedPaths = [
    "/dashboard",
    "/dashboard/users",
    "/dashboard/articles",
  ];

  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!token && isProtectedPath) {
    console.log("Redirecting to home, no token found.");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard/users/:path*",
    "/dashboard/articles/:path*",
  ],
};
