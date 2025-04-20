import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/items", "/sales"];

const authRoutes = ["/login", "/register"];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Skip middleware for auth routes if no token exists
    if (authRoutes.some(route => pathname.startsWith(route)) && !token) {
        return NextResponse.next(); // Allow access to /login or /register
    }

    // Redirect logged-in users away from auth routes
    if (authRoutes.some(route => pathname.startsWith(route))) {
        if (token) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    // Protect main routes (only if not on auth route)
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}