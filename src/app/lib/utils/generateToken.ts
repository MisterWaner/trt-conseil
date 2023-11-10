import { getJwtSecretKey } from "@/app/lib/token";
import { User } from "@prisma/client";
import { SignJWT } from "jose";

export async function generateToken(user: User) {
    const token = await new SignJWT(
        {
            id: user.id,
            email: user.email,
            roleId: user.roleId,
        })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(getJwtSecretKey());
    
    console.log(token);
    return token;
}

