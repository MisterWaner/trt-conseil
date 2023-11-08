import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

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
