import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export type Props = {
    params: {
        reference: string;
    };
};

export async function GET(request: Request, { params: { reference } }: Props) {
    try {
        if (!reference) return NextResponse.json({ message: "Paramètre manquant" });

        const offer = await prisma.offer.findUnique({
            where: {
                reference: reference,
                isApproved: false,
            },
        });

        if (!offer) {
            return NextResponse.json({ message: "Candidat non trouvé" });
        }

        return NextResponse.json(offer);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}

export async function PUT(request: Request, { params: { reference } }: Props) {
    try {
        if (!reference) return NextResponse.json({ message: "Paramètre manquant" });

        const offer = await prisma.offer.findUnique({
            where: {
                reference: reference,
                isApproved: false,
            },
        });

        if (!offer) {
            return NextResponse.json({ message: "Candidat non trouvé" });
        }

        const approvedOffer = await prisma.offer.update({
            where: {
                reference: reference,
            },
            data: {
                isApproved: true,
            },
        });

        return NextResponse.json({
            message: "Offre approuvée",
            approvedOffer,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la mise à jour" });
    }
}