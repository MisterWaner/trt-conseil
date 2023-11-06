import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

type Props = {
    params: {
        id: string;
    };
};

const prisma = new PrismaClient();

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

