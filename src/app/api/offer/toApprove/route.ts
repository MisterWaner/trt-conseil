import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
    try {
        const toApproveOffers = await prisma.offer.findMany({
            where: {
                isApproved: false,
            },
            orderBy: {
                reference: "asc",
            },
        });

        return NextResponse.json(toApproveOffers);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}