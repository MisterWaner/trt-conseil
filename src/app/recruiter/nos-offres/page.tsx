"use client";
import { useState } from "react";

import Table from "@/app/ui/components/Table/Table";
import Modal from "@/app/ui/components/Modal/Modal";
import AddOfferForm from "@/app/ui/components/Forms/AddOfferForm";

const dataFromBackend = [
    {
        id: 1,
        title: "Jean",
        reference: "Dupont",
        place: "Paris",
        contractType: "CDI",
        publicationDate: "01/01/2021",
        isApproved: true,
    },
    {
        id: 2,
        title: "Jean",
        reference: "Dupont",
        place: "Paris",
        contractType: "CDI",
        publicationDate: "01/01/2021",
        isApproved: true,
    },
    {
        id: 3,
        title: "Jean",
        reference: "Dupont",
        place: "Paris",
        contractType: "CDI",
        publicationDate: "01/01/2021",
        isApproved: true,
    },
    {
        id: 4,
        title: "Jean",
        reference: "Dupont",
        place: "Paris",
        contractType: "CDI",
        publicationDate: "01/01/2021",
        isApproved: true,
    },
    {
        id: 5,
        title: "Jean",
        reference: "Dupont",
        place: "Paris",
        contractType: "CDI",
        publicationDate: "01/01/2021",
        isApproved: true,
    },
    {
        id: 6,
        title: "Jean",
        reference: "Dupont",
        place: "Paris",
        contractType: "CDI",
        publicationDate: "01/01/2021",
        isApproved: true,
    },
    {
        id: 7,
        title: "Jean",
        reference: "Dupont",
        place: "Paris",
        contractType: "CDI",
        publicationDate: "01/01/2021",
        isApproved: true,
    },
    {
        id: 8,
        title: "Jean",
        reference: "Dupont",
        place: "Paris",
        contractType: "CDI",
        publicationDate: "01/01/2021",
        isApproved: true,
    },
];

const columnsToShow = [
    "id",
    "title",
    "place",
    "contractType",
    "publicationDate",
];

const OurOffers: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeForm, setActiveForm] = useState<string | null>(null);

    const openModal = (formType: string) => {
        setActiveForm(formType);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const renderForm = () => {
        if (activeForm === "addOffer") {
            return <AddOfferForm />;
        }
    }

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
        <>
            <div className="flex flex-col min-h-screen">
                <main className="container-xl mx-10 h-full mt-[100px] md:mx-20">
                    <h1 className="font-medium text-center text-xl md:text-3xl">
                        Nos Offres
                    </h1>
                    <section className="mt-9 overflow-x-auto">
                        <Table
                            data={filteredData}
                            columsToShow={columnsToShow}
                            subject=""
                        />
                    </section>
                    <section className="mt-5">
                        <button onClick={() => openModal("addOffer")} className="flex justify-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer lg:mt-0 lg:h-fit lg:w-1/6">
                            Ajouter une offre
                        </button>
                    </section>
                </main>
            </div>
            <Modal role="recruiter" isOpen={isModalOpen} onClose={closeModal} content={renderForm()} />
        </>
    );
};

export default OurOffers;
