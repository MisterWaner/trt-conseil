import NextAuth, { DefaultSession } from "next-auth";
import { User } from "@prisma/client";

declare module "next-auth" {

    interface Session extends DefaultSession {
        user: User;
        expires: string;
        error: string;
    } 
}