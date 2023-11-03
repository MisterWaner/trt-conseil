interface PasswordFormProps {
    role: string;
}
const ModifyPasswordForm: React.FC<PasswordFormProps> = ({ role }) => {
    return (
        <form action="" className="flex flex-col w-full items-center">
            <div className="flex flex-col mb-4 w-4/6">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className={`${
                        role === "recruiter"
                            ? "bg-amber-300/50 focus:ring-amber-300"
                            : "bg-sky-300/50 focus:ring-sky-300"
                    }  p-2 rounded-md focus:outline-none focus:ring `}
                />
            </div>
            <div className="flex flex-col mb-4 w-4/6">
                <label htmlFor="password">Mot de passe</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className={`${
                        role === "recruiter"
                            ? "bg-amber-300/50 focus:ring-amber-300"
                            : "bg-sky-300/50 focus:ring-sky-300"
                    }  p-2 rounded-md focus:outline-none focus:ring `}
                />
            </div>
            <div className="flex flex-col mb-4 w-4/6">
                <label htmlFor="password">Confirmation</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className={`${
                        role === "recruiter"
                            ? "bg-amber-300/50 focus:ring-amber-300"
                            : "bg-sky-300/50 focus:ring-sky-300"
                    }  p-2 rounded-md focus:outline-none focus:ring `}
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

export default ModifyPasswordForm;
