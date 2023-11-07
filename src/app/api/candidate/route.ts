import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { encryptPassword } from "@/app/lib/utils/encryptPassword";

//Create prisma client
const prisma = new PrismaClient();

export async function POST(request: Request) {
    const {
        email,
        password,
        confirmation,
        roleId = 2,
    }: {
        email: string;
        password: string;
        confirmation: string;
        roleId: number;
    } = await request.json();
    
    try {
        if (!email || !password || !confirmation || !roleId)
            return NextResponse.json({ message: "Paramètre manquant" });

        if (password !== confirmation)
            return NextResponse.json({ message: "Les mots de passe ne correspondent pas" });

        const candidate = await prisma.user.findUnique({
            where: {
                email: email,
                roleId: roleId,
            },
        });

        if (candidate) return NextResponse.json({ message: "Ce candidat existe déjà" });

        // Hash password
        const hashPassword: string = await encryptPassword(password);

        const newCandidate = await prisma.user.create({
            data: {
                email: email,
                password: hashPassword,
                roleId: roleId,
            },
        });

        return NextResponse.json(newCandidate);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la création" });
    }
}

export async function GET() {
    try {
        const candidates = await prisma.user.findMany({
            where: {
                roleId: 2,
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
