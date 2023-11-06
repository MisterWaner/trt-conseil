import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function GET() { 
    try {
        const candidates = await prisma.user.findMany({
            where: {
                roleId: 2,
            }
        });

        return NextResponse.json(candidates);

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}