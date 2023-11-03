import OfferCard from "@/app/ui/components/Cards/OfferCard";

const Offers: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-zinc-100">
            <main className="container-xl mx-10 h-full mt-[100px] md:mx-20">
                <h1 className="font-medium text-center white-shadow text-xl md:text-3xl">
                    Les Offres
                </h1>
                <section className="mt-10 w-full mx-auto mb-5">
                    <article className="mt-10">
                        <div className="mt-4 w-full sm:w-2/3 md:w-1/3">
                            <div className="flex flex-col mb-4 w-full">
                                <label
                                    className="w-full text-sm md:text-base"
                                    htmlFor="search"
                                >
                                    Rechercher
                                </label>
                                <input
                                    className="w-full p-2 outline-none focus:ring focus:ring-stone-300 rounded-md"
                                    type="text"
                                    name="search"
                                    id="search"
                                />
                            </div>
                        </div>
                    </article>
                    <article className="mt-10 flex flex-wrap gap-5 justify-center sm:justify-between md:justify-start">
                        <OfferCard />
                        <OfferCard />
                        <OfferCard />
                        <OfferCard />
                        <OfferCard />
                    </article>
                </section>
            </main>
        </div>
    );
};

export default Offers;
