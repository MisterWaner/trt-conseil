import bcrypt from 'bcrypt';
import { prisma } from "@/app/lib/prisma";

export async function authenticate(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });
    if (!user) return null

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return null;

    return user;
}
