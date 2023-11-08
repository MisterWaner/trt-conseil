import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export type Props = {
    params: {
        id: string;
    };
}

export async function GET(request: Request, { params: { id } }: Props) {
    try {

        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const approvedCandidate = await prisma.user.findUnique({
            where: {
                id: id,
                isApproved: true,
            },
        });

        if (!approvedCandidate) {
            return NextResponse.json({ message: "Candidat non trouvé" });
        }

        return NextResponse.json(approvedCandidate);

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}

