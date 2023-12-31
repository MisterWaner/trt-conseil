"use client";

import { useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { FaBars, FaXmark } from "react-icons/fa6";
import Link from "next/link";
import { pacifico } from "@/app/ui/fonts";

const links: Array<{ label: string; href: string }> = [
    { label: "Accueil", href: "/recruiter" },
    { label: "Nos offres", href: "/recruiter/nos-offres" },
    { label: "Les candidatures", href: "/recruiter/les-candidatures" },
    { label: "Déconnexion", href: "/login" },
];

const RecruiterNavBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 z-40 w-full bg-white">
            <nav className="flex items-center justify-between text-black p-4">
                <span className={`${pacifico.className} text-3xl white-shadow`}>
                    TRT Conseil
                </span>

                <div className="w-50">
                    <ul
                        className={`h-fit absolute left-0 top-0 transition-all duration-300 ease-in flex flex-col items-center py-5 space-y-5 z-[-1] list-none lg:z-auto lg:flex-row lg:space-y-0 lg:py-0 lg:static lg:justify-around ${
                            isMenuOpen
                                ? "w-full top-[50px] z-40 bg-white"
                                : "w-full top-[-490px]"
                        }`}
                    >
                        {links.map((link, index) => (
                            <li
                                key={index}
                                className={clsx("lg:mr-2 font-bold text-black hover:text-blue-500", {
                                    "text-indigo-500": pathname === link.href,
                                })}
                            >
                                <Link href={link.href} onClick={toggleMenu}>
                                    <p className="p-2 capitalize">
                                        {link.label}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="absolute select-none top-6 right-6 border-0 icone-toggle bg-transparent p-1"
                >
                    {isMenuOpen ? (
                        <FaXmark className="lg:hidden w-8" />
                    ) : (
                        <FaBars className="lg:hidden w-8" />
                    )}
                </button>
            </nav>
        </header>
    );
};

export default RecruiterNavBar;