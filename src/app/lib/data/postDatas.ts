import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import bcrypt from "bcrypt";
import { generateTemporaryPassword } from "@/app/lib/utils/generateTemporaryPassword";

//Import config
config();

//Create prisma client
const prisma = new PrismaClient();

//Create admin
export function createAdmin() {
    
}