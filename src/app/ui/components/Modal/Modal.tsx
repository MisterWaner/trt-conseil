import React from "react";
import { FaCircleXmark } from "react-icons/fa6";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: React.ReactNode;
    role: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content, role }) => {
    return (
        isOpen && (
            <div
                className={`fixed inset-0 overflow-y-scroll flex items-center justify-center z-50 ${
                    role === "recruiter" ? "bg-indigo-300" : "bg-sky-300"
                } bg-opacity-50`}
            >
                <div className="bg-white min-h-fit p-4 rounded-lg text-black w-5/6 md:w-4/6 lg:w-2/6">
                    <div className="w-full flex justify-end">
                        <button onClick={onClose}>
                            <FaCircleXmark className="w-7 h-7 text-danger transition duration-200 active:scale-[0.95]" />
                        </button>
                    </div>
                    {content}
                </div>
            </div>
        )
    );
};

export default Modal;
