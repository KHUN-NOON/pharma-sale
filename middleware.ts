import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [];

const authRoutes = ["auth/login", "auth/register"];

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl;

    // Skip middleware for auth routes if no token exists
    // if (authRoutes.some(route => pathname.startsWith(route)) && !token) {
    //     return NextResponse.next(); // Allow access to /login or /register
    // }

    // Redirect logged-in users away from auth routes
    // if (authRoutes.some(route => pathname.startsWith(route))) {
    //     if (token) {
    //         return NextResponse.redirect(new URL("/", req.url));
    //     }
    // }

    // Protect main routes (only if not on auth route)
    // if (protectedRoutes.some(route => pathname.startsWith(route))) {
    //     if (!token) {
    //         return NextResponse.redirect(new URL("/login", req.url));
    //     }
    // }

    return NextResponse.next();
}

export const config = {

}