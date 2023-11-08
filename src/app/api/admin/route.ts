import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
    try {
        const admins = await prisma.user.findMany({
            where: {
                roleId: 1,
            },
            orderBy: {
                id: "asc",
            },
        });
        return NextResponse.json(admins);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}


