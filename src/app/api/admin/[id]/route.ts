import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

type Props = {
    params: {
        id: string;
    };
};

export async function GET(request: Request, { params: { id } }: Props) {
    try {
        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const admin = await prisma.user.findUnique({
            where: {
                id: id,
                roleId: 1,
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

export async function DELETE(request: Request, { params: { id } }: Props) {
    try {
        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const admin = await prisma.user.findUnique({
            where: {
                id: id,
                roleId: 1,
            },
        });

        if (!admin) return NextResponse.json({ message: "Admin non trouvé" });

        const deletedAdmin = await prisma.user.delete({
            where: {
                id: id,
                roleId: 1
            },
        });

        return NextResponse.json(deletedAdmin);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la suppression" });
    }
}
