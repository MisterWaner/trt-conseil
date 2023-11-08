import bcrypt from "bcrypt";

//Function to encrypt password
export async function encryptPassword(password: string) {
    const salt: string = process.env.BCRYPT_SALT_ROUND as string;
    const hashPassword: string = await bcrypt.hash(password, parseInt(salt));

    return hashPassword;
}