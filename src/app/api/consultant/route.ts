import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";


export async function GET() {
    try {
        const consultants = await prisma.user.findMany({
            where: { role: "consultant" },
            orderBy: {
                id: "asc",
            },
        });
        return NextResponse.json(consultants);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}
