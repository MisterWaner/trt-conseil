import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/app/lib/token";
import { getErrorResponse } from "@/app/lib/utils/getErrorResponse";

interface AuthenticatedRequest extends NextRequest {
    user: {
        id: string;
    }
    admin: {
        id: string;
    }
}

let redirectToLogin = false;

export async function middleware(req: NextRequest) {
    let token: string | undefined;

    if (req.cookies.has("token")) {
        token = req.cookies.get("token")?.value;
    } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
        token = req.headers.get("Authorization")?.substring(7);
    }

    if (req.nextUrl.pathname.startsWith("/login") && (!token || redirectToLogin)) return;

    
}

