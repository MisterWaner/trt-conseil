import { generateToken } from "@/app/lib/utils/generateToken";
import { authenticate } from "@/app/lib/utils/authenticate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
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

        response = NextResponse.json(
            { sucess: true, message: "Connexion réussie" },
            {
                status: 200,
                headers: {
                    "content-type": "application/json",
                },
            }
        );

        response.cookies.set({
            name: "token",
            value: token,
            path: "/",
        });

        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Erreur lors de la connexion",
            success: false,
        });
    }
}
