import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { encryptPassword } from "@/app/lib/utils/encryptPassword";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const {
        email,
        password,
        confirmation,
        roleId = 1,
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

        const recruiter = await prisma.user.findUnique({
            where: {
                email: email,
                roleId: roleId,
            },
        });

        if (recruiter) return NextResponse.json({ message: "Ce recruteur existe déjà" });

        // Hash password
        const hashPassword: string = await encryptPassword(password);

        const newRecruiter = await prisma.user.create({
            data: {
                email: email,
                password: hashPassword,
                roleId: roleId,
            },
        });

        return NextResponse.json({ message: "Recruteur créé", data: newRecruiter, password});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la création" });
    }
}

export async function GET() {
    try {
        const recruiters = await prisma.user.findMany({
            where: {
                roleId: 1,
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