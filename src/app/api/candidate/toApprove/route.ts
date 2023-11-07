import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const toApproveCandidates = await prisma.user.findMany({
            where: {
                roleId: 2,
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