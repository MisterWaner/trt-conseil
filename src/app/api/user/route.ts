import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { encryptPassword } from "@/app/lib/utils/encryptPassword";
import { generateTemporaryPassword } from "@/app/lib/utils/generateTemporaryPassword";

export async function POST(request: Request) {
    const {
        email,
        password,
        roleId,
        confirmation,
    }: {
        email: string;
        password: string;
        roleId: number;
        confirmation: string;
    } = await request.json();

    try {
        if (roleId === 1) {
            if (!email || !password)
                return NextResponse.json({ message: "Paramètre manquant" });

            const admin = await prisma.user.findUnique({
                where: {
                    email: email,
                    roleId: roleId,
                },
            });

            if (admin)
                return NextResponse.json({ message: "Cet admin existe déjà" });

            const hashPassword = await encryptPassword(password);

            const newAdmin = await prisma.user.create({
                data: {
                    email: email,
                    password: hashPassword,
                    roleId: roleId,
                },
            });
            return NextResponse.json({
                message: "Admin créé",
                data: newAdmin,
                password,
            });
        } else if (roleId === 2) {
            if (!email) return NextResponse.json({ message: "Paramètre manquant" });
            
            const consultant = await prisma.user.findUnique({
                where: {
                    email: email,
                    roleId: roleId,
                },
            });

            if (consultant)
                return NextResponse.json({ message: "Ce consultant existe déjà" });

            // Generate temporary password and hash it
            const temporaryPassword: string = generateTemporaryPassword(20);
            const hashPassword: string = await encryptPassword(temporaryPassword);

            const newConsultant = await prisma.user.create({
                data: {
                    email: email,
                    password: hashPassword,
                    roleId: roleId,
                },
            });

            return NextResponse.json({
                message: "Consultant créé",
                data: newConsultant,
                temporaryPassword,
            });
        } else if (roleId === 3 || roleId === 4) {
            if (!email || !password || !confirmation)
                return NextResponse.json({ message: "Paramètre manquant" });

            if (password !== confirmation) return NextResponse.json({ message: "Les mots de passe ne correspondent pas" });

            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                    roleId: roleId,
                },
            });

            if (user) return NextResponse.json({ message: "Cet utilisateur existe déjà" });

            const hashPassword = await encryptPassword(password);

            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    password: hashPassword,
                    roleId: roleId,
                },
            });

            return NextResponse.json({
                message: "Utilisateur créé",
                data: newUser,
                password,
            });
        } else {
            return NextResponse.json({ message: "Erreur lors de la création" });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la création" });
    }
}

export async function GET() { 
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                id: "asc",
            },
        });
        return NextResponse.json(users);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" });
    }
}
