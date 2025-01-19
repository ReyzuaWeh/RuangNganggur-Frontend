import DashboardLayout from "@components/DashboardLayout";
import ProfileSets from "@components/specific/profile/ProfileSets";
import { DataOutUser } from "@dataType/fetch";
import { RoleType } from "@dataType/khusus";
import fetchUser from "@utils/fetch/users";
import functionSets from "@utils/function";
import swalError from "@utils/swal/error";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Profile = () => {
    const [profile, setProfile] = useState<DataOutUser | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isEditSubData, setEditSubData] = useState(false);
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const openDescriptionModal = () => setIsAboutModalOpen(true);
    const closeDescriptionModal = () => setIsAboutModalOpen(false);

    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    const openSubDataModal = () => setEditSubData(true);
    const closeSubDataModal = () => setEditSubData(false);

    const updateSubProfile = fetchUser.updateSubProfile
    // Fetch profile data from the API
    useEffect(() => {
        fetchUser.getProfile().then(value => {
            setProfile(value);
            setLoading(false);
        }).catch(async error => {
            const errorData = error instanceof Response && error.json ? await error.json() : error;
            if (error.status && error.status === 401) {
                return swalError(error.status, 'Have to Login First!', '<a href="/auth/login">Click here!</a>');
            }
            swalError(error.status, "Cannot get data user");
            console.error(errorData)
        })
    }, []);
    if (loading) {
        return (
            <>
                Loading...
            </>
        )
    }
    return (
        <>
            <DashboardLayout role={profile?.role as RoleType}>
                <div className="flex items-center gap-x-4 mb-5 md:mb-10">
                    <NavLink to="/" className="hover:bg-gray-300 rounded-full p-3 md:p-4">
                        <FaArrowLeft size={20} className="cursor-pointer md:size-25" />
                    </NavLink>
                    <h1 className="text-lg md:text-2xl font-semibold">
                        Your {
                            functionSets.isEmployer(profile?.role as RoleType) ? "Company" : "Profile"
                        }
                    </h1>
                </div>
                <ProfileSets
                    dataProfile={profile}
                    isOpenMain={isEditModalOpen}
                    openEditMain={openEditModal}
                    onCloseMain={closeEditModal}
                    isOpenMiddle={isEditSubData}
                    openEditMiddle={openSubDataModal}
                    onCloseMiddle={closeSubDataModal}
                    isOpenDesc={isAboutModalOpen}
                    openEditDesc={openDescriptionModal}
                    onCloseDesc={closeDescriptionModal}
                    updateSub={updateSubProfile}
                    saveChange={fetchUser.saveChange}
                    setNewProfile={setProfile}
                />
            </DashboardLayout>
        </>
    );
};

export default Profile;
