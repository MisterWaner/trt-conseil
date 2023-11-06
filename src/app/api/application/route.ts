import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { offerId, userId }: {offerId: string, userId: string} = await request.json();

        if (!offerId || !userId) return NextResponse.json({ message: "Paramètre manquant" });

        // Check if offer exists
        const offer = await prisma.offer.findUnique({
            where: {
                reference: offerId,
            },
        });

        if (!offer) {
            return NextResponse.json({ message: "Offre non trouvée" });
        }

        // Check if user exists
        const candidate = await prisma.user.findUnique({
            where: {
                id: userId,
                roleId: 2,
            },
        });

        if (!candidate) {
            return NextResponse.json({ message: "Candidat non trouvé" });
        }

        // Check if application already exists
        const application = await prisma.application.findFirst({
            where: {
                offerId: offerId,
                userId: userId,
            },
        });

        if (application) {
            return NextResponse.json({ message: "Candidature déjà existante" });
        }

        // Create application
        const newApplication = await prisma.application.create({
            data: {
                offerId: offerId,
                userId: userId,
                applicationDate: new Date(),
            },
        });

        return NextResponse.json({ message: "Candidature créée", newApplication });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la création" });
    }
}

export async function GET() {
    try {
        const applications = await prisma.application.findMany();
        return NextResponse.json(applications);

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}