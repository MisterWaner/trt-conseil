"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page: React.FC = () => {
    const router = useRouter();
    const [data, setData] = useState({
        email: "",
        password: "",
        confirmation: "",
        role: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        if (
            data.email.length > 0 &&
            data.password.length > 0 &&
            data.confirmation.length > 0 &&
            data.role.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [data]);

    const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data }),
            });

            const userInfo = await response.json();
            console.log(userInfo);
            router.push("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col h-full wrapper">
            <main className="container-xl mx-auto h-full mt-[100px]">
                <section className="flex flex-col justify-center items-center h-full">
                    <h3 className="font-medium white-shadow text-3xl">
                        Inscription
                    </h3>
                    <form
                        onSubmit={registerUser}
                        className="flex flex-col items-center justify-between form rounded-md p-10 mt-4"
                    >
                        <div className="flex flex-col mb-4 w-full">
                            <label className="font-bold" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="rounded-md p-3"
                                name="email"
                                value={data.email}
                                onChange={(event) =>
                                    setData({
                                        ...data,
                                        email: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="flex flex-col mb-4 w-full">
                            <label className="font-bold" htmlFor="password">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="rounded-md p-3"
                                name="password"
                                value={data.password}
                                onChange={(event) =>
                                    setData({
                                        ...data,
                                        password: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="flex flex-col mb-4 w-full">
                            <label className="font-bold" htmlFor="confirmation">
                                Confirmation du mot de passe
                            </label>
                            <input
                                type="password"
                                id="confirmation"
                                className="rounded-md p-3"
                                name="confirmation"
                                value={data.confirmation}
                                onChange={(event) =>
                                    setData({
                                        ...data,
                                        confirmation: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="flex flex-col mb-4 w-full">
                            <label htmlFor="role" className="font-bold">
                                Qui êtes vous ?
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={data.role}
                                onChange={(event) =>
                                    setData({
                                        ...data,
                                        role: event.target.value,
                                    })
                                }
                                className="rounded-md p-3"
                            >
                                <option value="">--Choisir--</option>
                                <option value="3">Recruteur</option>
                                <option value="4">Candidat</option>
                            </select>
                        </div>
                        <div className="w-full flex justify-between gap-2">
                            <div className="flex justify-center w-full mt-4 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer">
                                <Link href="/" type="submit">
                                    Annuler
                                </Link>
                            </div>
                            <div className="flex justify-center w-full mt-4 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer">
                                <button type="submit" disabled={buttonDisabled}>
                                    Valider
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Page;
