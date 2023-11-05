import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { encryptPassword } from "@/app/lib/utils/encryptPassword";

type Props = {
    params: {
        id: string;
    };
};

const prisma = new PrismaClient();

export async function GET(request: Request, { params: { id } }: Props) {
    try {
        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const consultant = await prisma.user.findUnique({
            where: {
                id: id,
                roleId: 3,
            },
        });

        if (!consultant) {
            return NextResponse.json({ message: "Consultant non trouvé" });
        }

        return NextResponse.json(consultant);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}

export async function PUT(request: Request, { params: { id } }: Props) {
    const {
        email,
        password,
        confirmation,
    }: { email: string; password: string; confirmation: string } =
        await request.json();

    try {
        if (!email || !password || !confirmation)
            return NextResponse.json({ message: "Paramètre manquant" });

        const consultant = await prisma.user.findUnique({
            where: {
                id: id,
                roleId: 3,
            },
        });

        if (!consultant)
            return NextResponse.json({ message: "Consultant non trouvé" });

        if (password !== confirmation)
            return NextResponse.json({
                message:
                    "Le mot de passe et la confirmation ne correspondent pas"
            });

        const hashPassword = await encryptPassword(password);

        const updatedConsultant = await prisma.user.update({
            where: {
                id,
                roleId: 3,
            },
            data: {
                email: email,
                password: hashPassword,
            },
        });

        return NextResponse.json(updatedConsultant);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la mise à jour" });
    }
}
