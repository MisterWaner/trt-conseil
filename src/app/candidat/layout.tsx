import type { Metadata } from "next";
import { poppins } from "@/app/ui/fonts";
import CandidatNavBar from "@/app/ui/components/NavBars/CandidatNavBar";

export const metadata: Metadata = {
    title: "Profile | TRT Conseil Recrutement",
    description: "Fictive website for a recruitment agency",
};

export default function CandidateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body className={`${poppins.className} antialiased bg-sky-100`}>
                <CandidatNavBar />
                {children}
            </body>
        </html>
    );
}
