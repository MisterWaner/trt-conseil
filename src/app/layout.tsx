import type { Metadata } from "next";
import { poppins } from "@/app/ui/fonts";
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
    return (
        <html lang="fr">
            <body className={`${poppins.className} antialiased`}>
                <PublicNavBar />
                {children}
            </body>
        </html>
    );
}
