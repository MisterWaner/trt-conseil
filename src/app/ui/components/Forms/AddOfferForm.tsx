const AddOfferForm: React.FC = () => {
    return (
        <form action="" className="flex flex-col w-full items-center">
            <div className="flex flex-col mb-4 w-4/6">
                <label htmlFor="title" >Intitulé</label>
                <input type="text" name="title" id="title" className="bg-indigo-300/50  p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300" />
            </div>
            <div className="flex flex-col mb-4 w-4/6">
                <label htmlFor="place" >Lieu</label>
                <input type="text" name="place" id="place" className="bg-indigo-300/50  p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300" />
            </div>
            <div className="flex flex-col mb-4 w-4/6">
                <label htmlFor="salary" >Salaire</label>
                <input type="text" name="salary" id="salary" className="bg-indigo-300/50  p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300" />
            </div>
            <div className="flex flex-col mb-4 w-4/6">
                <label htmlFor="contractType" >Contrat</label>
                <select name="contractType" id="contractType" className="bg-indigo-300/50  p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300">
                    <option value="">Choisir une valeur</option>
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Stage">Stage</option>
                    <option value="Alternance">Alternance</option>
                    <option value="Freelance">Freelance</option>
                </select>
            </div>
            <div className="flex flex-col mb-4 w-4/6">
                <label htmlFor="schedules" >Horaires</label>
                <input type="text" name="schedules" id="schedules" className="bg-indigo-300/50  p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300" />
            </div>
            <div className="flex flex-col mb-4 w-4/6">
                <button type="submit" className="flex justify-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer">Valider</button>
            </div>
        </form>
    );
};

export default AddOfferForm;
