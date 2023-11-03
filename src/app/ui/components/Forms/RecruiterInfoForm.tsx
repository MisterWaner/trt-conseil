const RecruiterInfoForm: React.FC = () => {
    return (
        <form className="flex flex-col w-full items-center">
            <div className="flex flex-col mb-4 w-4/6">
                <label htmlFor="firstname">Prénom</label>
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    className="bg-amber-300/50 p-2 rounded-md focus:outline-none focus:ring focus:ring-amber-300"
                />
            </div>
            <div className="flex flex-col mb-4 w-4/6">
                <label htmlFor="lastname">Nom</label>
                <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    className="bg-amber-300/50 p-2 rounded-md focus:outline-none focus:ring focus:ring-amber-300"
                />
            </div>
            <div className="flex flex-col mb-4 w-4/6">
                <label htmlFor="lastname">Entreprise</label>
                <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    className="bg-amber-300/50 p-2 rounded-md focus:outline-none focus:ring focus:ring-amber-300"
                />
            </div>
            <div className="flex flex-col mb-4 w-4/6">
                <button
                    type="submit"
                    className="flex justify-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer"
                >
                    Valider
                </button>
            </div>
        </form>
    );
};

export default RecruiterInfoForm;
