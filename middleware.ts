import { NextResponse } from "next/server";
import NextAuth from "next-auth";

const { auth } = NextAuth({
  providers: [],
});

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const url = req.nextUrl.pathname;

  const protectedRoutes = ['/write', '/result', '/archive'];
  const guestRoutes = ['/login', '/register'];

  const isProtectedRoute = protectedRoutes.some(route => url.startsWith(route));
  const isGuestRoute = guestRoutes.some(route => url.startsWith(route));

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isGuestRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/write', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
