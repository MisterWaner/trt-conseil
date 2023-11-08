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

        const recruiter = await prisma.user.findUnique({
            where: {
                id: id,
                roleId: 3,
            },
        });

        if (!recruiter) {
            return NextResponse.json({ message: "Recruteur non trouvé" });
        }

        return NextResponse.json(recruiter);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}

export async function PUT(request: Request, { params: { id } }: Props) {
    const {
        lastname,
        firstname,
        societyName,
        address,
        roleId = 3,
    }: {
        lastname: string;
        firstname: string;
        roleId: number;
        societyName: string;
        address: string;
    } = await request.json();

    try {
        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const recruiter = await prisma.user.findUnique({
            where: {
                id: id,
                roleId: roleId,
            },
        });

        if (!recruiter) {
            return NextResponse.json({ message: "Candidat non trouvé" });
        }

        const updatedRecruiter = await prisma.user.update({
            where: {
                id: id,
                roleId: roleId,
            },
            data: {
                lastname: lastname,
                firstname: firstname,
                societyName: societyName,
                address: address,
            },
        });

        return NextResponse.json(updatedRecruiter);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la mise à jour" });
    }
}

export async function DELETE(request: Request, { params: { id } }: Props) {
    try {
        if (!id) return NextResponse.json({ message: "Paramètre manquant" });

        const deletedRecruiter = await prisma.user.delete({
            where: {
                id: id,
                roleId: 3,
            },
        });

        if (!deletedRecruiter) {
            return NextResponse.json({ message: "Candidat non trouvé" });
        }

        return NextResponse.json(deletedRecruiter);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la suppression" });
    }
}
