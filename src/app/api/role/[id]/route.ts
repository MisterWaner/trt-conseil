import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export type Props = {
    params: {
        id: number;
    };
};

const prisma = new PrismaClient();

export async function GET(request: Request, { params: { id } }: Props) {
    try {
        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const role = await prisma.role.findUnique({
            where: {
                id: id,
            },
        });

        if (!role) return NextResponse.json({ message: "Ce role n'existe pas" });

        return NextResponse.json(role);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}

export async function PUT(request: Request, { params: { id } }: Props) {
    try {
        const { name }: { name: string } = await request.json();

        if (!name) return NextResponse.json({ message: "Paramètre manquant" });

        const role = await prisma.role.findUnique({
            where: {
                id: id,
            },
        });

        if (!role) return NextResponse.json({ message: "Ce role n'existe pas" });

        const updatedRole = await prisma.role.update({
            where: {
                id: id,
            },
            data: {
                name: name,
            },
        });

        return NextResponse.json(updatedRole);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la modification" });
    }
}

export async function DELETE(request: Request, { params: { id } }: Props) {
    try {
        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const role = await prisma.role.findUnique({
            where: {
                id: id,
            },
        });

        if (!role) return NextResponse.json({ message: "Ce role n'existe pas" });

        const deletedRole = await prisma.role.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({ message: "Role supprimé", deletedRole });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la suppression" });
    }
}