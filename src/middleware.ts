import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "./app/lib/token";

const AUTH_PAGES = ["/login", "/register", "/logout"];

const isAuthPages = (url: string) =>
    AUTH_PAGES.some((page) => page.startsWith(url));

export async function middleware(request: NextRequest) {
    const { url, nextUrl, cookies } = request;
    const { value: token } = cookies.get("token") ?? { value: null }
    
    const hasVerifiedToken = token && (await verifyToken(token));
    const isAuthPageRequested = isAuthPages(nextUrl.pathname);

    if (isAuthPageRequested) {
        if (!hasVerifiedToken) {
            const response = NextResponse.next();
            response.cookies.delete("token");
            return response;
        }

        const { roleId, id } = hasVerifiedToken;
        
        if(roleId) {
            if(roleId === 1 && nextUrl.pathname.startsWith(`/admin`)) {
                return NextResponse.next();
            } else if(roleId === 2 && nextUrl.pathname.startsWith(`/consultant/${id}`)) {
                return NextResponse.next();
            } else if(roleId === 3 && nextUrl.pathname.startsWith(`/recruiter/${id}`)) {
                return NextResponse.next();
            } else if(roleId === 4 && nextUrl.pathname.startsWith(`/candidate/${id}`)) {
                return NextResponse.next();
            }
        }

        return NextResponse.redirect(new URL("/login", url));
    }    

    if (!hasVerifiedToken) {
        const searchParams = new URLSearchParams(nextUrl.searchParams);
        searchParams.set("next", nextUrl.pathname);

        const response = NextResponse.redirect(new URL(`/login?${searchParams}`, url));
        response.cookies.delete("token");
        return response;
    }

    return NextResponse.redirect(new URL("/login", request.url));
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
