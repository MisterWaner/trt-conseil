import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateOfferReference } from "@/app/lib/utils/generateOfferReference";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const {
            title,
            salary,
            place,
            schedules,
            contractType,
            userId,
        }: {
            title: string;
            salary: number;
            place: string;
            schedules: string;
            contractType: string;
            userId: string;
        } = await request.json();

        if (!title || !salary || !place || !schedules || !contractType)
            return NextResponse.json({ message: "Paramètre manquant" });

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        const societyName = user?.societyName || "";

        const reference: string = generateOfferReference(societyName);
        const newOffer = await prisma.offer.create({
            data: {
                title: title,
                salary: salary,
                place: place,
                schedules: schedules,
                contractType: contractType,
                reference: reference,
                publicationDate: new Date(),
                userId: userId,
            },
        });

        return NextResponse.json(newOffer);

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la création" });
    }
}

export async function GET() {
    try {
        const offers = await prisma.offer.findMany();
        return NextResponse.json(offers);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}
