import ModalsLayout from "@components/layouts/ModalsLayout";
import CircularImageInput from "@components/profile/ImageModals";
import MainDataUserModals from "@components/profile/MainDataUserModals";
import { DataOutUser } from "@dataType/fetch";
import { getModalProfileSets } from "@pages/Profile";
import { useMyProfile } from "@provider/userProvider";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";


const EditEmployerMainProfile = () => {
    const { profile: dataProfile } = useMyProfile()
    const {
        setIsLoading,
        isLoading,
        onCloseMain: onClose,
        saveChange,
        setNewProfile
    } = getModalProfileSets()
    const [isVisible, setIsVisible] = useState(false);
    const [profile, setProfile] = useState<DataOutUser | null>(dataProfile)

    return (
        <ModalsLayout
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            setLoading={setIsLoading}
            saveChange={saveChange}
            setNewProfile={setNewProfile}
            profile={profile}
            isLoading={isLoading}
            children={
                <>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold">Edit Your Admin Profile</h2>
                        <button className="text-xl" onClick={onClose} disabled={isLoading} type="button">
                            <IoMdClose size={30} />
                        </button>
                    </div>
                    <CircularImageInput
                        currentImage={profile?.image}
                        setProfile={setProfile}
                    />
                    <MainDataUserModals
                        profile={profile}
                    />
                </>
            } />
    )
}

export default EditEmployerMainProfile;
