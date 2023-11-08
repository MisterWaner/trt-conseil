import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export type Props = {
    params: {
        id: string;
    };
};

export async function GET(request: Request, { params: { id } }: Props) {
    try {
        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const application = await prisma.application.findUnique({
            where: {
                id: id,
            },
        });

        if (!application) {
            return NextResponse.json({ message: "Candidature non trouvée" });
        }

        return NextResponse.json(application);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}

export async function DELETE(request: Request, { params: { id } }: Props) {
    try {
        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const application = await prisma.application.findUnique({
            where: {
                id: id,
            },
        });

        if (!application) {
            return NextResponse.json({ message: "Candidature non trouvée" });
        }

        const deletedApplication = await prisma.application.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({
            message: "Candidature supprimée",
            deletedApplication,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la suppression" });
    }
}

