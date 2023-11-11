"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";

const Page: React.FC = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        if (data.email.length > 0 && data.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [data]);

    const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            await signIn("credentials", {
                ...data,
                redirect: false,
            })

            



        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col h-full wrapper">
            <main className="container-xl mx-auto h-full mt-[100px]">
                <section className="flex flex-col justify-center items-center h-full">
                    <h3 className="font-medium white-shadow text-3xl">
                        Connexion
                    </h3>
                    <form
                        onSubmit={loginUser}
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
                                required
                                value={data.password}
                                className="rounded-md p-3"
                                name="password"
                                onChange={(event) =>
                                    setData({
                                        ...data,
                                        password: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="flex justify-center w-full mt-4 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer">
                            <button type="submit" disabled={buttonDisabled}>
                                Se connecter
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Page;
