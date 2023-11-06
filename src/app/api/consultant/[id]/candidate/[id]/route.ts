import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export type Props = {
    id: string;
}

const prisma = new PrismaClient();

export async function GET (request: Request, { id }: Props) {
    try {
        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const candidate = await prisma.user.findUnique({
            where: {
                id: id,
                roleId: 2,
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

export async function PUT(request: Request, { id }: Props) { 
    try {
        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const candidate = await prisma.user.findUnique({
            where: {
                id: id,
                roleId: 2,
            },
        });

        if (!candidate) {
            return NextResponse.json({ message: "Candidat non trouvé" });
        }

        const approvedCandidate = await prisma.user.update({
            where: {
                id: id,
                roleId: 2,
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
        return NextResponse.json({ message: "Erreur lors de la modification" });
    }
}