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

        const candidate = await prisma.user.findUnique({
            where: {
                id: id,
                roleId: 2,
            },
        });

        if (!candidate) {
            return NextResponse.json({ message: "Candidat non trouvé" });
        }

        return NextResponse.json(candidate);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}

export async function PUT(request: Request, { params: { id } }: Props) {
    const {
        lastname,
        firstname,
        roleId = 2,
    }: {
        lastname: string;
        firstname: string;
        roleId: number;
    } = await request.json();

    try {
        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const candidate = await prisma.user.findUnique({
            where: {
                id: id,
                roleId: roleId,
            },
        });

        if (!candidate) {
            return NextResponse.json({ message: "Candidat non trouvé" });
        }

        const updatedCandidate = await prisma.user.update({
            where: {
                id: id,
                roleId: roleId,
            },
            data: {
                lastname: lastname,
                firstname: firstname,
            },
        });

        return NextResponse.json(updatedCandidate);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la mise à jour" });
    }
}

export async function DELETE(request: Request, { params: { id } }: Props) {
    try {
        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const deletedCandidate = await prisma.user.delete({
            where: {
                id: id,
                roleId: 2,
            },
        });

        if (!deletedCandidate) {
            return NextResponse.json({ message: "Candidat non trouvé" });
        }

        return NextResponse.json(deletedCandidate);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la suppression" });
    }
}
