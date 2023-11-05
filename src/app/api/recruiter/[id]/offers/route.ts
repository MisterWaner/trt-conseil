import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateOfferReference } from "@/app/lib/utils/generateOfferReference";

type Props = {
    params: {
        id: string;
    };
};

const prisma = new PrismaClient();

export async function POST(request: Request, { params: { id } }: Props) {
    try {
        const {
            title,
            salary,
            place,
            schedules,
            contractType,
        }: {
            title: string;
            salary: number;
            place: string;
            schedules: string;
            contractType: string;
        } = await request.json();

        if (!title || !salary || !place || !schedules || !contractType)
            return NextResponse.json({ message: "Paramètre manquant" });

        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        const societyName = user?.societyName || '';
        
        const reference: string = generateOfferReference(societyName);
        const newOffer = await prisma.offer.create({
            data: {
                title,
                salary,
                place,
                schedules,
                contractType,
                reference,
                publicationDate: new Date(),
                userId: id,
            },
        });

        return NextResponse.json(newOffer);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la création" });
    }
}

export async function GET(request: Request, { params: { id } }: Props) {
    try {
        const offers = await prisma.offer.findMany({
            where: {
                userId: id,
            },
        });
        return NextResponse.json(offers);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}