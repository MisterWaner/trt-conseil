import { FaPencil, FaTrashCan, FaEye, FaCheck } from "react-icons/fa6";

interface CustomTableProps {
    data: Record<string, any>[];
    columsToShow: string[];
    subject: string;
}

const Table: React.FC<CustomTableProps> = ({ data, columsToShow, subject }) => {
    return (
        <table className="min-w-full border border-black divide-y divide-black">
            <thead className="bg-black text-white text-center">
                <tr>
                    {columsToShow.map((column) => (
                        <th key={column} scope="col" className="py-2 px-4">
                            {column}
                        </th>
                    ))}
                    <th scope="col" className="py-2 px-4">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-400">
                {data.map((row, rowIndex) => (
                    <tr
                        key={rowIndex}
                        className="text-center hover:bg-slate-200"
                    >
                        {columsToShow.map((column, columnIndex) => (
                            <td key={columnIndex} className="py-2 px-4">
                                {row[column]}
                            </td>
                        ))}
                        <td className="py-2 px-4">
                            <div className="flex justify-around items-center">
                                <button>
                                    <FaEye className="text-lime-500 hover:text-lime-800 cursor-pointer mr-2 w-5 h-5" />
                                </button>
                                <button>
                                    {subject === "applications" ||
                                    subject === "candidates" ? (
                                        <FaCheck className="text-cyan-500 hover:text-cyan-800 cursor-pointer mr-2 w-5 h-5" />
                                    ) : (
                                        <FaPencil className="text-blue-500 hover:text-blue-800 cursor-pointer mr-2 w-5 h-5" />
                                    )}
                                </button>
                                <button>
                                    <FaTrashCan className="text-red-500 hover:text-red-800 cursor-pointer w-5 h-5" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
