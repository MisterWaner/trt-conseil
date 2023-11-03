import type { Metadata } from "next";
import { poppins } from "@/app/ui/fonts";
import ConsultantNavBar from "@/app/ui/components/NavBars/ConsultantNavBar";

export const metadata: Metadata = {
    title: "Consultant | TRT Conseil Recrutement",
    description: "Fictive website for a recruitment agency",
};

export default function ConsultantLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body className={`${poppins.className} antialiased bg-lime-100`}>
                <ConsultantNavBar />
                {children}
            </body>
        </html>
    );
}
