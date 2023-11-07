import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() { 
    try {
        const approvedOffers = await prisma.offer.findMany({
            where: {
                isApproved: true,
            },
            orderBy: {
                reference: "asc",
            },
        });

        return NextResponse.json(approvedOffers);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}
