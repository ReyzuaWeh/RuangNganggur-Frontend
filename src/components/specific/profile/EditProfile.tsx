import ModalsLayout from "@components/layouts/ModalsLayout";
import { DataOutUser } from "@dataType/fetch";
import { ModalsProfileParams, RoleType } from "@dataType/khusus";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { EditProfileExtra } from "./EditProfileExtra";
import MainDataUserModals from "./MainDataUserModals";


const EditMainProfile = (
    { onClose, dataProfile, updateSub, saveChange, setNewProfile }: ModalsProfileParams
) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [profile, setProfile] = useState<DataOutUser | null>(dataProfile)

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <ModalsLayout
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            setLoading={setLoading}
            saveChange={saveChange}
            setNewProfile={setNewProfile}
            profile={profile as DataOutUser}
            isLoading={isLoading}
            children={
                <form>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold">Edit Your Profile</h2>
                        <button className="text-xl" type="button" onClick={onClose}>
                            <IoMdClose size={30} />
                        </button>
                    </div>
                    <EditProfileExtra
                        dataEmployer={profile?.employer}
                        dataJobSeeker={profile?.jobseeker}
                        updateSub={updateSub}
                        setProfile={setProfile}
                        role={profile?.role as RoleType}
                    />
                    <MainDataUserModals
                        profile={profile}
                    />
                </form>
            } />
    )
}

export default EditMainProfile;
