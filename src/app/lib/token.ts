import { jwtVerify } from 'jose';

export function getJwtSecretKey() {
    const secret = process.env.JWT_SECRET_KEY;

    if (!secret) {
        throw new Error('Missing JWT_SECRET_KEY environment variable');
    }

    return new TextEncoder().encode(secret);
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, getJwtSecretKey());

        return payload;
    } catch (error) {
        console.log(error);
        return null;
    }
}