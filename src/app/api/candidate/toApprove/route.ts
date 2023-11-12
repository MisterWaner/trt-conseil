import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";


export async function GET() {
    try {
        const toApproveCandidates = await prisma.user.findMany({
            where: {
                role: "candidat",
                isApproved: false,
            },
            orderBy: {
                id: "asc",
            },
        });

        return NextResponse.json(toApproveCandidates);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}