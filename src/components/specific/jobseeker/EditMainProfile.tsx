import ModalsLayout from "@components/layouts/ModalsLayout";
import CircularImageInput from "@components/profile/ImageModals";
import MainDataUserModals from "@components/profile/MainDataUserModals";
import { DataOutUser } from "@dataType/fetch";
import { RoleType } from "@dataType/khusus";
import { getModalProfileSets } from "@pages/users/Profile";
import { useMyProfile } from "@provider/userProvider";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const EditMainProfile = () => {
    const { profile: dataProfile } = useMyProfile()
    const {
        setIsLoading,
        isLoading,
        onCloseMain: onClose,
        saveChange,
        setNewProfile,
        updateSub
    } = getModalProfileSets()
    const [isVisible, setIsVisible] = useState(false);
    const [profile, setProfile] = useState<DataOutUser | null>(dataProfile)
    useEffect(() => {
        setIsVisible(true);
    }, []);

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
                        <h2 className="text-2xl font-semibold">Edit Your Profile</h2>
                        <button className="text-xl" onClick={onClose} disabled={isLoading} type="button">
                            <IoMdClose size={30} />
                        </button>
                    </div>
                    <CircularImageInput
                        currentImage={profile?.image}
                        setProfile={setProfile}
                    />
                    <div className="py-2 flex flex-col items-center gap-x-2">
                        <div className="flex w-full md:flex-row flex-col justify-between md:items-center">
                            <label htmlFor="first_name" className="font-medium pr-1 py-2 md:w-1/3">
                                First Name
                            </label>
                            <input
                                id="first_name"
                                name="first_name"
                                value={profile?.jobseeker?.first_name}
                                onChange={e => updateSub(
                                    {
                                        value: e.target.value,
                                        role: RoleType.jobseeker,
                                        key: e.target.id,
                                        setProfile: setProfile
                                    }
                                )}
                                type="text"
                                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md md:w-2/3"
                            />
                        </div>
                        <div className="flex w-full md:flex-row flex-col justify-between md:items-center">
                            <label htmlFor="last_name" className="font-medium pr-1 py-2 md:w-1/3">
                                Last Name
                            </label>
                            <input
                                id="last_name"
                                name="last_name"
                                value={profile?.jobseeker?.last_name || ""}
                                onChange={e => {
                                    updateSub(
                                        {
                                            value: e.target.value,
                                            role: RoleType.jobseeker,
                                            key: e.target.id,
                                            setProfile: setProfile
                                        }
                                    )
                                }}
                                type="text"
                                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md md:w-2/3"
                            />
                        </div>
                    </div>
                    <MainDataUserModals
                        profile={profile}
                    />
                </>
            } />
    )
}

export default EditMainProfile;
