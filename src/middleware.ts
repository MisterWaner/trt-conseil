export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        // "/login",
        // "/register",
        "/api/:path*",
        "/admin/:path*",
        "/recruiter/:path*",
        "/consultant/:path*",
        "/candidat/:path*",
    ],
};
