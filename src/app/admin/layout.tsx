import type { Metadata } from "next";
import { poppins } from "@/app/ui/fonts";
import AdminNavBar from "@/app/ui/components/NavBars/AdminNavBar";

export const metadata: Metadata = {
    title: "Admin | TRT Conseil Recrutement",
    description: "Fictive website for a recruitment agency",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body className={`${poppins.className} antialiased bg-orange-100`}>
                <AdminNavBar />
                {children}
            </body>
        </html>
    );
}
