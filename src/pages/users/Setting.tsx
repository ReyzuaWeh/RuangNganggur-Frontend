import images_source from "@/assets/get/images";
import DashboardLayout from "@components/DashboardLayout";
import ChangePassword from "@components/profile/ChangePassword";
import EditMainUser from "@components/profile/EditMainUser";
import { useMyProfile } from "@provider/userProvider";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

const Settings = () => {
    const { profile } = useMyProfile()
    const [emailModal, setEmailModal] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);

    const openEmailModal = () => setEmailModal(true);
    const closeEmailModal = () => setEmailModal(false);
    const openPasswordModal = () => setPasswordModal(true);
    const closePasswordModal = () => setPasswordModal(false);

    return (
        <DashboardLayout>
            <div className="flex items-center gap-x-4 mb-5">
                <h1 className="text-lg md:text-2xl px-5 font-semibold">Settings</h1>
            </div>
            <div className="bg-white shadow-lg flex flex-col rounded-lg">
                <div className="px-14 py-10">
                    <hr className="w-full border-2 mt-5 opacity-90" />
                    <div className="py-10 pt-4 flex md:flex-row flex-col items-center w-full gap-x-4">
                        <div className="flex w-full md:w-1/2 items-center gap-x-4">
                            <img
                                // @ts-ignore
                                src={profile?.image || images_source["../no-profile.png"].default} alt="Profile"
                                className="w-20 h-20 rounded-full"
                            />
                            <div className="overflow-x-hidden">
                                <h1 className="font-semibold text-lg truncate">
                                    {profile ? profile.username : "User"}
                                </h1>
                                <p className="truncate">{profile ? profile.email : "Email"}</p>
                            </div>
                        </div>
                        <hr className="w-full border-2 md:hidden mt-5 opacity-90" />
                        <div className="flex flex-col w-full md:w-1/2 justify-center mt-10 items-center gap-y-4">
                            <div className="border-2 px-8 py-4 w-full flex gap-x-2 justify-between">
                                <div className="overflow-x-hidden">
                                    <p className="font-semibold">User</p>
                                    <p className="truncate">{profile ? profile.email : "Email"}</p>
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
                                <p className="font-semibold md:text-left">Delete Account</p>
                                <button className="btn-danger p-1.5 font-semibold rounded">Delete</button>
                            </div>
                        </div>
                    </div>
                    <hr className="w-full border-2 hidden md:block opacity-90" />
                </div>
            </div>
            {emailModal && <EditMainUser onClose={closeEmailModal} />}
            {passwordModal && <ChangePassword onClose={closePasswordModal} />}
        </DashboardLayout>
    );
};

export default Settings;
