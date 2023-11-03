import type { Metadata } from "next";
import { poppins } from "@/app/ui/fonts";
import RecruiterNavBar from "@/app/ui/components/NavBars/RecruiterNavBar";

export const metadata: Metadata = {
    title: "Recrutement | TRT Conseil Recrutement",
    description: "Fictive website for a recruitment agency",
};

export default function CandidateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body className={`${poppins.className} antialiased bg-indigo-100`}>
                <RecruiterNavBar />
                {children}
            </body>
        </html>
    );
}
