import { DataOutUser } from "@/dataType/fetch";
import DashboardLayout from "@components/DashboardLayout";
import ChangePassword from "@components/profile/ChangePassword";
import EditEmail from "@components/profile/EditEmail";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaRegEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Settings = () => {
    const [profile, setProfile] = useState<DataOutUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [emailModal, setEmailModal] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);

    const openEmailModal = () => setEmailModal(true);
    const closeEmailModal = () => setEmailModal(false);
    const openPasswordModal = () => setPasswordModal(true);
    const closePasswordModal = () => setPasswordModal(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const response = await fetch("https://ruang-nganggur-fast-api.vercel.app/users/profile", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Profile data:", data); // Log the response data
                    setProfile(data);
                } else {
                    console.error("Failed to fetch profile");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
                console.log(loading);
            }
        };

        fetchProfile();
    }, []);

    const updateEmail = async (newEmail: string) => {
        const token = localStorage.getItem("access_token");

        const updatedEmail = {
            ...profile,
            email: newEmail,
        };

        try {
            const response = await fetch("https://ruang-nganggur-fast-api.vercel.app/users/profile", {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedEmail),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Updated email:", data);
                console.log("Fetching profile...");
                console.log("Updated Email Object:", updatedEmail);

                // Log updated profile data
                setProfile(data); // Update profile with new data
            } else {
                console.error("Failed to update email");
            }
        } catch (error) {
            console.error("Error updating email:", error);
        }
    };

    return (
        <>
            <DashboardLayout>
                <div className="flex items-center gap-x-4 mb-5">
                    <NavLink to="/" className="hover:bg-gray-300 rounded-full p-3 md:p-4">
                        <FaArrowLeft size={20} className="cursor-pointer md:size-25" />
                    </NavLink>
                    <h1 className="text-lg md:text-2xl font-semibold">Settings</h1>
                </div>
                <div className="bg-white shadow-lg flex flex-col rounded-lg">
                    <div className="px-14 py-10">
                        <h1 className="font-semibold text-2xl">Account Settings</h1>
                        <div className="py-10 flex items-center gap-x-4">
                            <img
                                src={profile?.image || "/assets/no-profile.png"} // Display user image if available
                                alt="Profile"
                                className="w-20 h-20"
                            />
                            <div className="">
                                <h1 className="font-semibold text-lg">
                                    {profile ? profile.username : "User"}
                                </h1>
                                <p>{profile ? profile.email : "Email"}</p>
                            </div>
                        </div>
                        <hr className="w-full border-2 opacity-90" />
                        <div className="flex flex-col w-1/2 justify-center mx-auto mt-10 items-center gap-y-4">
                            <div className="border-2 px-8 py-4 w-full flex justify-between">
                                <div>
                                    <p className="font-semibold">Email</p>
                                    <p>{profile ? profile.email : "Email"}</p>
                                </div>
                                <button onClick={openEmailModal}>
                                    <FaRegEdit />
                                </button>
                            </div>
                            <div className="border-2 px-8 py-4 w-full flex items-center justify-between">
                                <p className="font-semibold">Password</p>
                                <button>
                                    <FaRegEdit onClick={openPasswordModal} />
                                </button>
                            </div>
                            <div className="border-2 px-8 py-4 w-full flex items-center justify-between">
                                <p className="font-semibold">Delete Account</p>
                                <button className="text-red-500 font-semibold">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                {emailModal && (
                    <EditEmail
                        onClose={closeEmailModal}
                        currentEmail={profile?.email}
                        onUpdateEmail={updateEmail}
                    />
                )}
                {passwordModal && <ChangePassword onClose={closePasswordModal} />}
            </DashboardLayout>
        </>
    );
};

export default Settings;
