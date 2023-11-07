import Link from "next/link";
import { pacifico } from "@/app/ui/fonts";

const Home: React.FC = () => {
    return (
        <div className="flex flex-col h-full wrapper">
            <main className="container-xl mx-auto h-full mt-[100px]">
                <section id="title" className="flex justify-center items-end">
                    <div className="grid grid-cols-1 grid-rows-2">
                        <div className="text-center">
                            <h1
                                className={`w-full text-4xl white-shadow ${pacifico.className}`}
                            >
                                TRT Conseil
                            </h1>
                        </div>
                        <div className="text-center">
                            <p className="white-shadow font-bold text-2xl">
                                Votre avenir entre de bonnes mains.
                            </p>
                        </div>
                    </div>
                </section>
                <section id="cta" className="flex justify-center items-start">
                    <div className="grid grid-rows-1 grid-cols-2 gap-2 w-full">
                        <div className="flex justify-center items-center w-full border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn">
                            <Link
                                href="#"
                                className="w-full text-center"
                            >
                                Nous découvrir
                            </Link>
                        </div>
                        <div className="flex justify-center items-center w-full border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn">
                            <Link
                                href="/register"
                                className="w-full text-center"
                            >
                                Créer mon compte
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
