import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() { 
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                id: "asc",
            },
        });
        return NextResponse.json(users);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}
