import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const AddAbout = (
    { onClose, updateSkills }: { onClose: () => void, updateSkills: (newDesc: string) => Promise<void> }
) => {
    const [isVisible, setIsVisible] = useState(false);
    const [about, setAbout] = useState(""); // State untuk menyimpan input about
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSave = async () => {
        if (about.trim() === "") {
            alert("Please write something about yourself.");
            return;
        }

        setLoading(true);

        try {
            await updateSkills(about); // Memanggil fungsi untuk memperbarui skills di server
            onClose(); // Menutup modal setelah berhasil
        } catch (error) {
            console.error("Error saving about:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-right">
            <div
                className={`bg-white p-6 py-12 rounded-lg w-full max-w-md transform transition-transform duration-300 ${isVisible ? "translate-x-0" : "-translate-x-10"
                    }`}
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
                    placeholder="Write something about yourself..."
                    value={about}
                    onChange={(e) => setAbout(e.target.value)} // Mengupdate state saat input berubah
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
                        onClick={handleSave}
                        disabled={loading} // Nonaktifkan tombol jika sedang memproses
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddAbout;
