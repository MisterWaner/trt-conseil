import { prisma } from "@/app/lib/prisma";
import { generateTemporaryPassword } from "@/app/lib/utils/generateTemporaryPassword";
import { encryptPassword } from "@/app/lib/utils/encryptPassword";
import { NextResponse, NextRequest } from "next/server";
import { Role } from "@prisma/client";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            email,
            password,
            role,
            confirmation,
        }: {
            email: string;
            password: string;
            confirmation: string;
            role: Role;
            } = body.data;
        
        console.log(body.data);

        if (role === "admin") {
            if (!email || !password)
                return NextResponse.json("Paramètre manquant", {status: 400});

            const admin = await prisma.user.findUnique({
                where: {
                    email: email,
                    role: role,
                },
            });

            if (admin)
                return new NextResponse("L'utilisateur existe déjà", {status: 400});

            const hashPassword = await encryptPassword(password);

            const newAdmin = await prisma.user.create({
                data: {
                    email: email,
                    password: hashPassword,
                    role: role,
                },
            });
            return NextResponse.json({
                message: "Admin créé",
                data: newAdmin,
                password,
            });
        } else if (role === "consultant") {
            if (!email)
                return NextResponse.json("Paramètre manquant", {status: 400});

            const consultant = await prisma.user.findUnique({
                where: {
                    email: email,
                    role: role,
                },
            });

            if (consultant)
                return NextResponse.json("L'utilisateur existe déjà", {status: 400});

            // Generate temporary password and hash it
            const temporaryPassword: string = generateTemporaryPassword(20);
            const hashPassword: string = await encryptPassword(
                temporaryPassword
            );

            const newConsultant = await prisma.user.create({
                data: {
                    email: email,
                    password: hashPassword,
                    role: role,
                },
            });

            return NextResponse.json({
                message: "Consultant créé",
                data: newConsultant,
                temporaryPassword,
            });
        } else if (role === "recruiter" || role === "candidat") {
            if (!email || !password || !confirmation)
                return NextResponse.json("Paramètre manquant", {status: 400});

            if (password !== confirmation)
                return NextResponse.json({
                    message: "Les mots de passe ne correspondent pas",
                });

            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                    role: role,
                },
            });

            if (user)
                return NextResponse.json({
                    message: "Cet utilisateur existe déjà",
                });

            const hashPassword = await encryptPassword(password);

            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    password: hashPassword,
                    role: role,
                },
            });

            return NextResponse.json({
                message: "Utilisateur créé",
                data: newUser,
                password,
            });
        } else {
            return NextResponse.json({
                message: "Le rôle spécifié n'existe pas",
            });
        }
    } catch (error: any) {
        console.error(error);
        return NextResponse.json("Erreur lors de la création de l'utilisateur", {status: 500});
    }
}
