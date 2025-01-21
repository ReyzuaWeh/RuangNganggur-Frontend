import images_source from "@/assets/get/images";
import DashboardLayout from "@components/DashboardLayout";
import ChangePassword from "@components/profile/ChangePassword";
import EditEmail from "@components/profile/EditEmail";
import { useMyProfile } from "@components/provider/userProvider";
import { DataOutUser } from "@dataType/fetch";
import { useState } from "react";
import { FaArrowLeft, FaRegEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Settings = () => {
    const { profile: dataProfile } = useMyProfile()
    const [profile, setProfile] = useState<DataOutUser | null>(dataProfile);
    const [loading, setLoading] = useState(true);
    const [emailModal, setEmailModal] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);

    const openEmailModal = () => setEmailModal(true);
    const closeEmailModal = () => setEmailModal(false);
    const openPasswordModal = () => setPasswordModal(true);
    const closePasswordModal = () => setPasswordModal(false);

    const updateEmail = async (newEmail: string) => {
        const token = localStorage.getItem("access_token");

        const updatedEmail = {
            ...profile,
            email: newEmail,
        };
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
                        <h1 className="font-semibold text-2xl w-fit">Account Settings</h1>
                        <div className="py-10 flex md:flex-row flex-col items-center w-full gap-x-4">
                            <div className="flex w-full md:w-1/2 items-center gap-x-4">
                                <img
                                    // @ts-ignore
                                    src={profile?.image || images_source["../no-profile.png"].default} alt="Profile"
                                    className="w-20 h-20"
                                />
                                <div className="">
                                    <h1 className="font-semibold text-lg">
                                        {profile ? profile.username : "User"}
                                    </h1>
                                    <p>{profile ? profile.email : "Email"}</p>
                                </div>
                            </div>
                            <hr className="w-full border-2 md:hidden mt-5 opacity-90" />
                            <div className="flex flex-col w-full md:w-1/2 justify-center mt-10 items-center gap-y-4">
                                <div className="border-2 px-8 py-4 w-full flex gap-x-2 justify-between">
                                    <div>
                                        <p className="font-semibold">Email</p>
                                        <p>{profile ? profile.email : "Email"}</p>
                                    </div>
                                    <button className="w-fit" onClick={openEmailModal}>
                                        <FaRegEdit />
                                    </button>
                                </div>
                                <div className="border-2 px-8 py-4 w-full flex gap-x-2 justify-between">
                                    <p className="font-semibold">Password</p>
                                    <button>
                                        <FaRegEdit className="w-fit" onClick={openPasswordModal} />
                                    </button>
                                </div>
                                <div className="border-2 px-8 py-4 w-full md:flex-row md:items-center flex-col flex justify-between">
                                    <p className="font-semibold text-center">Delete Account</p>
                                    <button className="btn-danger p-1.5 font-semibold rounded">Delete</button>
                                </div>
                            </div>
                        </div>
                        <hr className="w-full border-2 hidden md:block opacity-90" />
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
