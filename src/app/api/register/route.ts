import { prisma } from "@/app/lib/prisma";
import { RegisterUserSchema } from "@/app/lib/validations/user.schema";
import { generateTemporaryPassword } from "@/app/lib/utils/generateTemporaryPassword";
import { encryptPassword } from "@/app/lib/utils/encryptPassword";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            email,
            password,
            roleId,
            confirmation,
        }: {
            email: string;
            password: string;
            confirmation: string;
            roleId: number;
            } = body.data;
        
        console.log(body.data);

        if (roleId === 1) {
            if (!email || !password)
                return NextResponse.json("Paramètre manquant", {status: 400});

            const admin = await prisma.user.findUnique({
                where: {
                    email: email,
                    roleId: roleId,
                },
            });

            if (admin)
                return new NextResponse("L'utilisateur existe déjà", {status: 400});

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
            if (!email)
                return NextResponse.json("Paramètre manquant", {status: 400});

            const consultant = await prisma.user.findUnique({
                where: {
                    email: email,
                    roleId: roleId,
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
                return NextResponse.json("Paramètre manquant", {status: 400});

            if (password !== confirmation)
                return NextResponse.json({
                    message: "Les mots de passe ne correspondent pas",
                });

            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                    roleId: roleId,
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
                    roleId: roleId,
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
