import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const EditEmail = (
    { onClose, currentEmail, onUpdateEmail }: {
        onClose: () => void,
        currentEmail?: string | null,
        onUpdateEmail: (newEmail: string) => void,
    }
) => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState(currentEmail || "");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSave = () => {
        if (email !== confirmEmail) {
            setError("Emails do not match");
            return;
        }

        if (!email) {
            setError("Email cannot be empty");
            return;
        }


        onUpdateEmail(email);
        onClose()
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
            <div
                className={`bg-white p-6 py-8 rounded-lg max-w-md transform transition-transform duration-300 shadow-lg ${isVisible ? "translate-x-0" : "-translate-y-full"
                    }`}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Change Email</h2>
                    <button className="text-xl" onClick={onClose}>
                        <IoMdClose size={30} />
                    </button>
                </div>

                <p className="text-sm text-gray-500 mb-6">
                    Email is used to log in to Jobstreet and to be contacted by companies.
                </p>

                <div className="flex flex-col mt-4 w-full">
                    <label htmlFor="email" className="font-medium mb-1">
                        New Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="py-2 px-4 text-sm border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col mt-4 w-full">
                    <label htmlFor="confirm-email" className="font-medium mb-1">
                        Confirm Email
                    </label>
                    <input
                        id="confirm-email"
                        type="email"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        className="py-2 px-4 text-sm border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <div className="flex justify-end mt-6">
                    <button
                        className="bg-primary text-white px-6 py-2 rounded-lg text-sm hover:bg-primary-dark"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditEmail;
