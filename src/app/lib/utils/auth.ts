import NextAuth from "next-auth";
import { authOptions } from "./authOptions";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { LoginUserSchema } from "../validations/user.schema";
import { prisma } from "../prisma";

async function getUser(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    } catch (error) {
        console.error(error, "Erreur lors de la récupération de l'utilisateur");
        throw new Error("Erreur lors de la récupération de l'utilisateur");
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authOptions,
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
                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (passwordMatch) return user;
                }

                console.log("Mot de passe ou email incorrect");
                return null;
            },
        }),
    ],
});
