import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

type Props = {
    params: {
        id: string;
    };
};

export async function GET(request: Request, { params: { id } }: Props) {
    try {
        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const user = await prisma.user.findUnique({
            where: {
                id: id,
            }
        });

        if (!user) {
            return NextResponse.json({ message: "Consultant non trouvé" });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}