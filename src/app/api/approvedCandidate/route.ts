import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const approvedCandidates = await prisma.user.findMany({
            where: {
                roleId: 2,
                isApproved: true,
            },
        })

        return NextResponse.json(approvedCandidates);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}
