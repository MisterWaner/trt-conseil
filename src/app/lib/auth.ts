import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { User } from "@prisma/client";
import {PrismaAdapter} from "@auth/prisma-adapter";
import { LoginUserSchema } from "@/app/lib/validations/user.schema";
import bcrypt from "bcrypt";
import { randomBytes, randomUUID } from "crypto";
import { NextResponse } from "next/server";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
        maxAge: 60 * 60,
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex");
        },
    },
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
                const parsedCredentials =
                    LoginUserSchema.safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await prisma.user.findUnique({
                        where: {
                            email: email,
                        },
                    });
                    if (!user) return null;

                    console.log(password, user.password)

                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (passwordMatch) return user;
                } else {
                    console.log("Mot de passe ou email incorrect");
                }
                return null;
                
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            
            console.log("JWT callback", { token, user });
            if (user) {
                const authUser = user as User;
                token.id = authUser.id;
                token.email = authUser.email;
                token.roleId = authUser.roleId;
            }
            return token;
        },
        session: async ({ session, token}) => {
            console.log("Session callback", { session, token });

            return {
                ...session,
                user: {
                    ...session.user,
                    roleId: token.roleId,
                    email: token.email,
                    id: token.id,
                },
                error: session.error,
            };
        },
    },
};
