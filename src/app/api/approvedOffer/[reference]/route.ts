import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export type Props = {
    params: {
        reference: string;
    };
}

export async function GET(request: Request, { params: { reference } }: Props) {
    try {

        if (!reference) return NextResponse.json({ message: "Paramètre manquant" });

        const offer = await prisma.offer.findUnique({
            where: {
                reference: reference,
                isApproved: true,
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

