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

        const consultant = await prisma.user.findUnique({
            where: {
                id: id,
                role: "consultant",
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

export async function DELETE(request: Request, { params: { id } }: Props) {
    try {
        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const consultant = await prisma.user.findUnique({
            where: {
                id: id,
                role: "consultant",
            },
        });

        if (!consultant) return NextResponse.json({ message: "Consultant non trouvé" });

        await prisma.user.delete({
            where: {
                id: id,
                role: "consultant",
            },
        });

        return NextResponse.json({ message: `Consultant ${id} supprimé` });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la suppression" });
    }
}

