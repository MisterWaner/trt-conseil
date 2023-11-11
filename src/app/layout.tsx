import type { Metadata } from "next";
import { poppins } from "@/app/ui/fonts";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NextAuthProvider from "@/app/lib/providers/NextAuthProvider";
import PublicNavBar from "@/app/ui/components/NavBars/PublicNavBar";
import "@/app/globals.css";

export const metadata: Metadata = {
    title: "TRT Conseil Recrutement",
    description: "Fictive website for a recruitment agency",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
    }) {
    
    const session = getServerSession(authOptions);
    
    return (
        <html lang="fr">
            <body className={`${poppins.className} antialiased`}>
                <NextAuthProvider session={session}>
                    <PublicNavBar />
                    {children}
                </NextAuthProvider>
            </body>
        </html>
    );
}
