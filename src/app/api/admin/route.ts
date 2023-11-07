import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { encryptPassword } from "@/app/lib/utils/encryptPassword";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { email, password }: { email: string; password: string } =
        await request.json();

    try {
        if (!email || !password)
            return NextResponse.json({ message: "Paramètre manquant" });

        const admin = await prisma.admin.findUnique({
            where: {
                email: email,
            },
        });

        if (admin)
            return NextResponse.json({ message: "Cet admin existe déjà" });

        const hashPassword = await encryptPassword(password);

        const newAdmin = await prisma.admin.create({
            data: {
                email: email,
                password: hashPassword,
            },
        });
        return NextResponse.json({ message: "Admin créé", data: newAdmin, password });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la création" });
    }
}

export async function GET() {
    try {
        const admins = await prisma.admin.findMany();
        return NextResponse.json(admins);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}


