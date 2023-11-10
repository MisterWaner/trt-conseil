import { getErrorResponse } from "@/app/lib/utils/getErrorResponse";
import { prisma } from "@/app/lib/prisma";
import {
    RegisterUserSchema,
} from "@/app/lib/validations/user.schema";
import { generateTemporaryPassword } from "@/app/lib/utils/generateTemporaryPassword";
import { encryptPassword } from "@/app/lib/utils/encryptPassword";
import { NextResponse, NextRequest } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const data = RegisterUserSchema.parse(body);

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
        } = data;

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
            if (!email)
                return NextResponse.json({ message: "Paramètre manquant" });

            const consultant = await prisma.user.findUnique({
                where: {
                    email: email,
                    roleId: roleId,
                },
            });

            if (consultant)
                return NextResponse.json({
                    message: "Ce consultant existe déjà",
                });

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
                return NextResponse.json({ message: "Paramètre manquant" });

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
        if (error instanceof ZodError)
            return getErrorResponse(400, "failed to validate body", error);

        if (error.code === "P2002")
            return getErrorResponse(409, "L'email existe déjà");

        return getErrorResponse(500, error.message);
    }
}
