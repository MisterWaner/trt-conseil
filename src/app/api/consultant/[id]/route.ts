import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

type Props = {
    params: {
        id: string;
    };
};

const prisma = new PrismaClient();

export async function GET(request: Request, { params: { id } }: Props) {
    try {
        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const consultant = await prisma.user.findUnique({
            where: {
                id: id,
                roleId: 3,
            },
        });

        if (!consultant) {
            return NextResponse.json({ message: "Consultant non trouvé" });
        }

        return NextResponse.json(consultant);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}


