import { getToken } from "next-auth/jwt";
import { NextRequest} from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export const getTokenFromNextAuth = async (req: NextRequest) => {
    const token = await getToken({ req, secret });
    console.log("Token from NextAuth", token);    
}