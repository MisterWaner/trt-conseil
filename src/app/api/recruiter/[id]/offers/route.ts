import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

type Props = {
    params: {
        id: string;
    };
};


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

