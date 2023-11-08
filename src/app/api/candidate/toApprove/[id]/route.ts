import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export type Props = {
    params: {
        id: string;
    };
};

export async function GET(request: Request, { params: { id } }: Props) {
    try {
        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const candidate = await prisma.user.findUnique({
            where: {
                id: id,
                roleId: 4,
                isApproved: false,
            },
        });

        if (!candidate) {
            return NextResponse.json({ message: "Candidat non trouvé" });
        }

        return NextResponse.json(candidate);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}

export async function PUT(request: Request, { params: { id } }: Props) {
    try {
        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const candidate = await prisma.user.findUnique({
            where: {
                id: id,
                roleId: 4,
                isApproved: false,
            },
        });

        if (!candidate) {
            return NextResponse.json({ message: "Candidat non trouvé" });
        }

        const approvedCandidate = await prisma.user.update({
            where: {
                id: id,
                roleId: 4,
            },
            data: {
                isApproved: true,
            },
        });

        return NextResponse.json({
            message: "Candidat approuvé",
            approvedCandidate,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la mise à jour" });
    }
}