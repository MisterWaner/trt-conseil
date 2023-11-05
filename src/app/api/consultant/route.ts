import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const consultants = await prisma.user.findMany({
            where: { roleId: 3 },
        });
        return NextResponse.json(consultants);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}
