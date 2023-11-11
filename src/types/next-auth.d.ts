import NextAuth from "next-auth";

declare module "next-auth" {

    interface Session {
        user: {
            id: string,
            email: string,
            roleId: number,
            
        }
    }

    interface JWT {
        user: {
            id: string,
            email: string,
            roleId: number,
        }
    }
}