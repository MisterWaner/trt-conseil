import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { encryptPassword } from "@/app/lib/utils/encryptPassword";
import { generateTemporaryPassword } from "@/app/lib/utils/generateTemporaryPassword";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { email }: { email: string } = await request.json();

    try {
        if (!email) return NextResponse.json({ message: "Paramètre manquant" });

        const consultant = await prisma.user.findUnique({
            where: {
                email: email,
                roleId: 3,
            },
        });

        if (consultant) return NextResponse.json({ message: "Ce consultant existe déjà" });

        // Generate temporary password and hash it
        const temporaryPassword: string = generateTemporaryPassword(20);
        const hashPassword: string = await encryptPassword(temporaryPassword);

        const newConsultant = await prisma.user.create({
            data: {
                email: email,
                password: hashPassword,
                roleId: 3,
            },
        });

        return NextResponse.json({ message: "Consultant créé", data: newConsultant, temporaryPassword });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la création" });
    }
}

export async function GET() {
    try {
        const consultants = await prisma.user.findMany({
            where: { roleId: 3 },
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
