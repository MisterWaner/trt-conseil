import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
    try {
        const candidates = await prisma.user.findMany({
            where: {
                role: "candidat",
            },
            orderBy: {
                id: "asc",
            },
        });

        return NextResponse.json(candidates);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}
