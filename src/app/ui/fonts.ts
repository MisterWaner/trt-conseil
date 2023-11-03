import { Poppins, Pacifico } from "next/font/google";

export const poppins = Poppins({
    weight: ["400", "500", "600", "700", "900"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    fallback: ["sans-serif"],
});

export const pacifico = Pacifico({
    weight: "400",
    subsets: ["latin"],
    fallback: ["cursive"],
});
