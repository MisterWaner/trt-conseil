import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
    try {
        const approvedCandidates = await prisma.user.findMany({
            where: {
                roleId: 4,
                isApproved: true,
            },
            orderBy: {
                id: "asc",
            },
        });

        return NextResponse.json(approvedCandidates);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}
