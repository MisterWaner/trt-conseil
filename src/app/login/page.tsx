"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUserSchema } from "@/app/lib/validations/user.schema";
import signInAndRedirect from "../lib/utils/signInAndRedirect";
import Axios from "@/app/lib/axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:3000/api";

const Page: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginUserSchema>({
        resolver: zodResolver(LoginUserSchema),
        mode: "onTouched",
    });

    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const handleLogin = async (data: LoginUserSchema) => {
        console.log(data);

        try {
            const response = await Axios.post(`${BASE_URL}`, data);
            console.log(response.data)

            if (response.status === 200) {
                const {
                    token,
                    email,
                    roleId,
                    id,
                }: {
                    token: string;
                    email: string;
                    roleId: number;
                    id: string;
                } = await response.data;

                // Cookies.set("token", token, {
                //     secure: true,
                //     sameSite: "None",
                //     expires: 1,
                // });
                // Cookies.set("email", email, {
                //     secure: true,
                //     sameSite: "None",
                //     expires: 1,
                // });
                // Cookies.set("roleId", roleId, {
                //     secure: true,
                //     sameSite: "None",
                //     expires: 1,
                // });
                // Cookies.set("userId", id, {
                //     secure: true,
                //     sameSite: "None",
                //     expires: 1,
                // });

                signInAndRedirect(roleId);
            }
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
                        onSubmit={handleSubmit(handleLogin)}
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
                                {...register("email")}
                                onChange={(event) =>
                                    setUser({
                                        ...user,
                                        email: event.target.value,
                                    })
                                }
                            />
                            {errors.email ? (
                                <p className="text-center error-msg">
                                    {errors.email?.message}
                                </p>
                            ) : null}
                        </div>
                        <div className="flex flex-col mb-4 w-full">
                            <label className="font-bold" htmlFor="password">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="rounded-md p-3"
                                {...register("password")}
                                onChange={(event) =>
                                    setUser({
                                        ...user,
                                        password: event.target.value,
                                    })
                                }
                            />
                            {errors.password ? (
                                <p className="text-center error-msg">
                                    {errors.password?.message}
                                </p>
                            ) : null}
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
