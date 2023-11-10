"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginUserSchema } from "../lib/validations/user.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "universal-cookie";

const Page: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginUserSchema>({
        resolver: zodResolver(LoginUserSchema),
        mode: "onTouched",
    });

    const [userId, setUserId] = useState(null);
    const [roleId, setRoleId] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedToken = new Cookies().get("token");
        if (storedToken) {
            const storedUserId = new Cookies().get("id");
            const storedRoleId = new Cookies().get("roleId");
            setUserId(storedUserId);
            setRoleId(storedRoleId);

            storedRoleId === 1
                ? router.push(`/admin/${storedUserId}`)
                : storedUserId.roleId === 2
                ? router.push(`/consultant/${storedUserId}`)
                : storedUserId.roleId === 3
                ? router.push(`/recruiter/${storedUserId}`)
                : storedUserId.roleId === 4
                ? router.push(`/candidate/${storedUserId}`)
                : null;
        }
    }, [router]);

    const handleLogin = async (data: LoginUserSchema) => {
        console.log(data);

        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            console.log(response);

            if (response.ok) {
                const {
                    token,
                    id,
                    roleId,
                }: { token: string; id: string; roleId: number } =
                    await response.json();

                const cookies = new Cookies();
                cookies.set("token", token, { path: "/", maxAge: 3600000 });
                cookies.set("id", id, { path: "/", maxAge: 3600000 });
                cookies.set("roleId", roleId, { path: "/", maxAge: 3600000 });
            } else {
                console.error(response, "Échec de l'authentification");
            }
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
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
                            />
                            {errors.email ? (
                                <p className="error-msg text-center">
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
                            />
                            {errors.password ? (
                                <p className="error-msg text-center">
                                    {errors.password?.message}
                                </p>
                            ) : null}
                        </div>
                        <div className="flex justify-center w-full mt-4 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer">
                            <button type="submit">Se connecter</button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Page;
