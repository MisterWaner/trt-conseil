'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Table from "@/app/ui/components/Table/Table";

const dataFromBackend = [
    {
        id: 1,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 2,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 3,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 4,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 5,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 6,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 7,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 8,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
];

const columnsToShow = ["id", "firstName", "email"];

const Consultants: React.FC = () => {

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login?callbackUrl=/admin/consultants");
        },
    });


    const filteredData: Record<string, any>[] = dataFromBackend.map(
        (row: any) => {
            const filteredRow: Record<string, any> = {};
            columnsToShow.forEach((column) => {
                filteredRow[column] = row[column];
            });
            return filteredRow;
        }
    );

    return (
        <div className="flex flex-col min-h-screen">
            <main className="container-xl mx-auto h-full mt-[100px] px-5 md:mx-20">
                <h1
                    className="font-medium text-center 
                text-3xl"
                >
                    Les consultants
                </h1>
                <section className="w-full mt-9 overflow-x-auto">
                    <Table
                        data={filteredData}
                        columsToShow={columnsToShow}
                        subject=""
                    />
                </section>
            </main>
        </div>
    );
};

export default Consultants;
