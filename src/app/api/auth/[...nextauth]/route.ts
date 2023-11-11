import { prisma } from "@/app/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: {
                    label: "Mot de passe",
                    type: "password",
                    placeholder: "Mot de passe",
                },
            },
            async authorize(credentials) {
                // check if credentials are valid
                if (!credentials?.email || !credentials?.password) return null;
                
                // check if user exists
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                if (!user) return null;

                // check if password matches
                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!passwordMatch) return null;

                // return user if everything is ok
                console.log(user, "Hey you're logged in!");
                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
