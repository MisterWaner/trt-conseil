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

        const admin = await prisma.admin.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!admin) {
            return NextResponse.json({ message: "Admin non trouvé" });
        }

        return NextResponse.json(admin);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}

export async function PUT(request: Request, { params: { id } }: Props) {
    const { email, password }: { email: string; password: string } =
        await request.json();

    try {
        if (!email || !password)
            return NextResponse.json({ message: "Paramètre manquant" });

        const admin = await prisma.admin.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!admin) return NextResponse.json({ message: "Admin non trouvé" });

        const hashPassword = await encryptPassword(password);

        const updatedAdmin = await prisma.admin.update({
            where: {
                id: Number(id),
            },
            data: {
                email: email,
                password: hashPassword,
            },
        });

        return NextResponse.json(updatedAdmin);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la modification" });
    }
}

export async function DELETE(request: Request, { params: { id } }: Props) {
    try {
        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const admin = await prisma.admin.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!admin) return NextResponse.json({ message: "Admin non trouvé" });

        const deletedAdmin = await prisma.admin.delete({
            where: {
                id: Number(id),
            },
        });

        return NextResponse.json(deletedAdmin);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la suppression" });
    }
}
