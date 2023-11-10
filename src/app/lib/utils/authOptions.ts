import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/lib/prisma";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // 1 hour
    },
    adapter: PrismaAdapter(prisma),
    providers: [],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    email: token.email,
                    roleId: token.roleId,
                },
            };
        },
        jwt: async ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    email: u.email,
                    roleId: u.roleId,
                }
            }
            return token;
        }
    },
};
