import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma || new PrismaClient({ log: ["query"] });

//  If we're not in production, set the global prisma instance to the one we just created
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
