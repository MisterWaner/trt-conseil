'use client';

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import ApplicationCard from "@/app/ui/components/Cards/ApplicationCard";

const MyApplications = () => {

    const { data: session } = useSession(
        {
            required: true,
            onUnauthenticated() {
                redirect("/login?callbackUrl=/candidat");
            },
        }
    )

    return (
        <div className="flex flex-col min-h-screen">
            <main className="container-xl mx-10 h-full mt-[100px] md:mx-20">
                <h1 className="font-medium text-center mt-10 white-shadow text-xl md:text-3xl">
                    Mes candidatures
                </h1>
                <section className="mt-10 w-full mx-auto mb-5">
                    <article className="mt-10 flex flex-wrap gap-5 justify-center sm:justify-between md:justify-start">
                        <ApplicationCard />
                        <ApplicationCard />
                        <ApplicationCard />
                        <ApplicationCard />
                        <ApplicationCard />
                    </article>
                </section>
            </main>
        </div>
    );
}

export default MyApplications;