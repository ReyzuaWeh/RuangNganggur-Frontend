import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import MonthDropdown from "./MonthDropdown";
import YearDropdown from "./YearDropdown";

const AddPosition = ({ onClose }: { onClose: () => void }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-right">
            <div
                className={`bg-white p-6 py-12 rounded-lg w-2/5 transform transition-transform duration-300 ${isVisible ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Add Your Position</h2>
                    <button className="text-xl" onClick={onClose}>
                        <IoMdClose size={30} />
                    </button>
                </div>

                <div className="py-2 flex items-center gap-x-2">
                    <div className="flex flex-col w-full">
                        <label htmlFor="" className="font-medium">
                            Job Position
                        </label>
                        <input
                            type="text"
                            className="w-full py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                        />
                    </div>
                </div>
                <div className="flex flex-col mt-5">
                    <label htmlFor="" className="font-medium">
                        Company Name
                    </label>
                    <input
                        type="text"
                        className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                    />
                </div>
                <div className="flex flex-col mt-5">
                    <label htmlFor="" className="font-medium">
                        Start
                    </label>
                    <div className="flex items-center gap-x-4">
                        <MonthDropdown />

                        <YearDropdown />
                    </div>
                </div>

                <div className="flex flex-col mt-5">
                    <label htmlFor="" className="font-medium">
                        End
                    </label>
                    <div className="flex items-center gap-x-4">
                        <MonthDropdown />

                        <YearDropdown />
                    </div>
                    <div className="py-2">
                        <h1 className="font-medium">Description</h1>
                        <textarea
                            className="w-full border border-gray-300 p-2 rounded-lg mb-4"
                            rows={5}
                            placeholder="Write something about yourself..."
                        ></textarea>
                    </div>
                </div>
                <div className="flex justify-start">
                    <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPosition;
