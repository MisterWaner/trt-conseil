import { generateToken } from "@/app/lib/utils/generateToken";
import { authenticate } from "@/app/lib/utils/authenticate";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const { email, password }: { email: string; password: string } =
            await request.json();

        const user = await authenticate(email, password);
        if (!user) {
            return NextResponse.json({
                message: "Identifiant ou mot de passe incorrect",
            });
        }

        const token = await generateToken(user);
        

        const response = NextResponse.json(
            {
                sucess: true,
                message: "Connexion réussie",
                user: {
                    id: user.id,
                    email: user.email,
                    roleId: user.roleId,
                    token: token,
                },
            },
            {
                status: 200,
                headers: {
                    "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite="None"; Max-Age=${60 * 60 * 24}}`,
                },
            }
        );
        response.cookies.set({
            name: "token",
            value: token,
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 24,
        })

        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Erreur lors de la connexion",
                success: false,
            },
            { status: 500 }
        );
    }
}
