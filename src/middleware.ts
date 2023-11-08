import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "./app/lib/token";

const AUTH_PAGES = ["/login", "/register", "/logout"];

const isAuthPages = (url: string) =>
    AUTH_PAGES.some((page) => page.startsWith(url));

export async function middleware(request: NextRequest) {
    const { url, nextUrl, cookies } = request;
    const { value: token } = cookies.get("token") ?? { value: null };

    const hasVerifiedToken = token && (await verifyToken(token));
    const isAuthPageResquested = isAuthPages(nextUrl.pathname);

    if (isAuthPageResquested) {
        if (!hasVerifiedToken) {
            const response = NextResponse.next();
            response.cookies.delete("token");
            return response;
        }
        const response = NextResponse.redirect(new URL(`/`, url));
        return response;
    }

    if (!hasVerifiedToken) {
        const searchParams = new URLSearchParams(nextUrl.searchParams);
        searchParams.set("next", nextUrl.pathname);

        const response = NextResponse.redirect(
            new URL(`/login?${searchParams}`, url)
        );
        response.cookies.delete("token");

        return response;
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/logout",
        "/api/:path*",
        "/admin/:path*",
        "/recruiter/:path*",
        "/consultant/:path*",
        "/candidate/:path*",
    ],
};
