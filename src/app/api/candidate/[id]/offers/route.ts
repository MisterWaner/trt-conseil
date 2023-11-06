import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() { 
    try {
        const offers = await prisma.offer.findMany({
            where: {
                isApproved: true,
            }
        });

        return NextResponse.json(offers);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}