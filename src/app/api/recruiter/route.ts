import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
    try {
        const recruiters = await prisma.user.findMany({
            where: {
                roleId: 3,
            },
            orderBy: {
                id: "asc",
            },
        });

        return NextResponse.json(recruiters);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}