import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export type Props = {
    params: {
        reference: string;
    };
}

const prisma = new PrismaClient();

export async function GET(request: Request, { params: { reference } }: Props) {
    try {

        if (!reference) return NextResponse.json({ message: "Paramètre manquant" });

        const offer = await prisma.offer.findUnique({
            where: {
                reference: reference,
            },
        });

        if (!offer) {
            return NextResponse.json({ message: "Offre non trouvée" });
        }

        return NextResponse.json(offer);

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}

