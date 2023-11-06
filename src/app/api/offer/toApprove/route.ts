import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const toApproveOffers = await prisma.offer.findMany({
            where: {
                isApproved: false,
            },
        });

        return NextResponse.json(toApproveOffers);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}