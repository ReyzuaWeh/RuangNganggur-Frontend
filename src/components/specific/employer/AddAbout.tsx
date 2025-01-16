import { DataOutUser } from "@/dataType/fetch";
import { ModalsProfileParams } from "@dataType/khusus";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const AddAbout = (
    {
        onClose,
        dataProfile,
        updateSub,
        saveChange,
        setNewProfile
    }: ModalsProfileParams
) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [profile, setProfile] = useState<DataOutUser | null>(dataProfile)

    useEffect(() => {
        setIsVisible(true);
    }, []);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-right">
            <div
                className={`
                    bg-white p-6 py-12 rounded-lg w-full max-w-md transform transition-transform duration-300 
                    ${isVisible ? "translate-x-0" : "-translate-x-10"}`
                }
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Add Your About</h2>
                    <button className="text-xl" onClick={onClose}>
                        <IoMdClose size={30} />
                    </button>
                </div>
                <div className="mb-4">
                    <h1 className="mb-1">About</h1>
                    <p className="text-sm">
                        Show your unique experience, ambitions and strengths.
                    </p>
                </div>
                <textarea
                    className="w-full border border-gray-300 p-2 rounded-lg mb-4"
                    rows={5}
                    name={profile?.role === "employer" ? "company_description" : "skills"}
                    placeholder="Write something about company..."
                    value={profile?.employer?.company_description || profile?.jobseeker?.skills || ""}
                    onChange={(e) => updateSub({
                        value: e.target.value,
                        role: profile?.role as any,
                        key: e.target.name,
                        setProfile: setProfile
                    })}
                ></textarea>
                <div className="text-sm">
                    <p>
                        Take care of yourself. Do not include sensitive personal information
                        such as identity documents, health, race, religion, or financial
                        data.
                    </p>
                </div>
                <div className="flex justify-start mt-2">
                    <button
                        className="bg-primary text-white px-4 py-2 rounded-lg text-sm"
                        onClick={() => {
                            setLoading(true)
                            saveChange(profile as DataOutUser, setNewProfile).finally(() => setLoading(false))
                        }}
                        disabled={isLoading} // Nonaktifkan tombol jika sedang memproses
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddAbout;
