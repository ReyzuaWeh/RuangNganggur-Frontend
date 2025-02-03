import DashboardLayout from "@components/DashboardLayout";
import ProfileSets from "@components/profile/ProfileSets";
import { RoleType } from "@dataType/khusus";
import { useMyProfile } from "@provider/userProvider";
import fetchUser from "@utils/fetch/users";
import functionSets from "@utils/function";
import React, { createContext, useContext, useState } from "react";

interface ProfileModalsContext {
    isOpenMain: boolean;
    openEditMain: () => void;
    onCloseMain: () => void;
    isOpenMiddle: boolean;
    openEditMiddle: () => void;
    onCloseMiddle: () => void;
    isOpenDesc: boolean;
    openEditDesc: () => void;
    onCloseDesc: () => void;
    updateSub: any;
    saveChange: any;
    setNewProfile: any;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileModalsSet = createContext<ProfileModalsContext | null>(null);

const Profile = () => {
    const { profile, setProfile } = useMyProfile();
    const [saveLoading, setSaveLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isEditSubData, setEditSubData] = useState(false);
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

    const openDescriptionModal = () => setIsAboutModalOpen(true);
    const closeDescriptionModal = () => setIsAboutModalOpen(false);

    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    const openSubDataModal = () => setEditSubData(true);
    const closeSubDataModal = () => setEditSubData(false);

    const updateSubProfile = fetchUser.updateSubProfile
    return (
        <ProfileModalsSet.Provider value={{
            isOpenMain: isEditModalOpen,
            openEditMain: openEditModal,
            onCloseMain: closeEditModal,
            isOpenMiddle: isEditSubData,
            openEditMiddle: openSubDataModal,
            onCloseMiddle: closeSubDataModal,
            isOpenDesc: isAboutModalOpen,
            openEditDesc: openDescriptionModal,
            onCloseDesc: closeDescriptionModal,
            updateSub: updateSubProfile,
            saveChange: fetchUser.saveChange,
            setNewProfile: setProfile,
            isLoading: saveLoading,
            setIsLoading: setSaveLoading
        }}
        >
            <DashboardLayout>
                <div className="flex items-center gap-x-4 mb-5 md:mb-10">
                    <h1 className="text-lg md:text-2xl font-semibold">
                        Your {functionSets.isEmployer(profile?.role as RoleType) ? "Company" : "Profile"}
                    </h1>
                </div>
                <ProfileSets />
            </DashboardLayout>
        </ProfileModalsSet.Provider>
    );
};
export const getModalProfileSets = (): ProfileModalsContext => {
    const modalsSets = useContext(ProfileModalsSet);
    if (modalsSets === null) {
        throw new Error("Can't get data");
    }
    return modalsSets;
}
export default Profile;
