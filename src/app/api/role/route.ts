import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { string } from "zod";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { name }: { name: string } = await request.json();

        if (!name) return NextResponse.json({ message: "Paramètre manquant" });

        const role = await prisma.role.findUnique({
            where: {
                name: name,
            },
        });

        if (role) return NextResponse.json({ message: "Ce role existe déjà" });

        const newRole = await prisma.role.create({
            data: {
                name: name,
            },
        });

        return NextResponse.json(newRole);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la création" });
    }
}

export async function GET() {
    try {
        const roles = await prisma.role.findMany({
            orderBy: {
                id: "asc",
            },
        });
        return NextResponse.json(roles);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}
