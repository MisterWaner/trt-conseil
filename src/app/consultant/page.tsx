const Consultant: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="container-xl h-full mt-24 mb-auto mx-10 md:mx-20">
                <h1 className="font-medium text-center text-xl md:text-3xl">
                    Portail consultant
                </h1>
                <section className="mt-10">
                    <h2 className="text-lg font-medium underline underline-offset-2">
                        Modifier mon mot de passe
                    </h2>
                    <form
                        action=""
                        className="flex flex-col items-center justify-between form rounded-md p-5 mt-4 md:w-1/2 xl:w-1/4"
                    >
                        <div className="w-full flex flex-col mb-4">
                            <label className="font-bold mb-2" htmlFor="email">
                                Email:
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Saisir un email"
                                className="rounded-md p-3 placeholder:text-slate-300 bg-lime-300/50 focus:outline-none focus:ring focus:ring-lime-300"
                            />
                        </div>
                        <div className="w-full flex flex-col mb-4">
                            <label
                                className="font-bold mb-2"
                                htmlFor="password"
                            >
                                Ancien mot de passe:
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Saisir votre ancien mot de passe"
                                className="rounded-md p-3 placeholder:text-slate-300 bg-lime-300/50 focus:outline-none focus:ring focus:ring-lime-300"
                            />
                        </div>
                        <div className="w-full flex flex-col mb-4">
                            <label
                                className="font-bold mb-2"
                                htmlFor="password"
                            >
                                Nouveau mot de passe:
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Saisir votre nouveau mot de passe"
                                className="rounded-md p-3 placeholder:text-slate-300 bg-lime-300/50 focus:outline-none focus:ring focus:ring-lime-300"
                            />
                        </div>
                        <div className="w-full flex flex-col mb-4">
                            <label
                                className="font-bold mb-2"
                                htmlFor="password"
                            >
                                Confirmation:
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Confirmer votre nouveau mot de passe"
                                className="rounded-md p-3 placeholder:text-slate-300 bg-lime-300/50 focus:outline-none focus:ring focus:ring-lime-300"
                            />
                        </div>
                        <div className="flex justify-center w-full mt-4 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer">
                            <button type="submit">Valider</button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Consultant;