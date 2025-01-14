import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const EditProfile = ({ onClose }: { onClose: () => void }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-right">
            <div
                className={`bg-white p-6 py-12 rounded-lg max-w-md transform transition-transform duration-300 ${isVisible ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Edit Your Profile</h2>
                    <button className="text-xl" onClick={onClose}>
                        <IoMdClose size={30} />
                    </button>
                </div>

                <div className="py-2 flex items-center gap-x-2">
                    <div>
                        <label htmlFor="" className="font-medium">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="" className="font-medium">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                        />
                    </div>
                </div>
                <div className="flex flex-col mt-5">
                    <label htmlFor="" className="font-medium">
                        Location
                    </label>
                    <input
                        type="text"
                        className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                    />
                </div>
                <div className="flex flex-col mt-5">
                    <label htmlFor="" className="font-medium">
                        Email
                    </label>
                    <div>
                        <input
                            type="text"
                            disabled
                            value="adam@gmail.com"
                        />
                        <a href="/users/settings" className="underline font-semibold">Change in settings</a>
                    </div>
                </div>
                <div className="flex justify-start mt-10">
                    <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
