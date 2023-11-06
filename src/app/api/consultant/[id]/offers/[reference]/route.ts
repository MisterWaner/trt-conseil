import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export type Props = {
    params: {
        reference: string;
    };
};

const prisma = new PrismaClient();

export async function GET(request: Request, { params: { reference } }: Props) {
    try {
        if (!reference)
            return NextResponse.json({ message: "Paramètre manquant" });

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

export async function PUT(request: Request, { params: { reference } }: Props) {
    try {
        if (!reference)
            return NextResponse.json({ message: "Paramètre manquant" });

        const offer = await prisma.offer.findUnique({
            where: {
                reference: reference,
            },
        });

        if (!offer) {
            return NextResponse.json({ message: "Offre non trouvée" });
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
        return NextResponse.json({ message: "Erreur lors de la modification" });
    }
}

export async function DELETE(request: Request, { params: { reference } }: Props) {
    try {
        if (!reference)
            return NextResponse.json({ message: "Paramètre manquant" });

        const offer = await prisma.offer.findUnique({
            where: {
                reference: reference,
            },
        });

        if (!offer) {
            return NextResponse.json({ message: "Offre non trouvée" });
        }

        const deletedOffer = await prisma.offer.delete({
            where: {
                reference: reference,
            },
        });

        return NextResponse.json({
            message: "Offre supprimée",
            deletedOffer,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la suppression" });
    }
}
