import { getModalProfileSets } from "@/pages/users/Profile";
import ModalsLayout from "@components/layouts/ModalsLayout";
import CircularImageInput from "@components/profile/ImageModals";
import MainDataUserModals from "@components/profile/MainDataUserModals";
import { DataOutUser } from "@dataType/fetch";
import { RoleType } from "@dataType/khusus";
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
        setNewProfile,
        updateSub
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
                        <h2 className="text-2xl font-semibold">Edit Your Company Profile</h2>
                        <button className="text-xl" onClick={onClose} disabled={isLoading} type="button">
                            <IoMdClose size={30} />
                        </button>
                    </div>
                    <CircularImageInput
                        currentImage={profile?.image}
                        setProfile={setProfile}
                    />
                    <div className="py-2 flex flex-col items-center gap-x-2">
                        <div className="flex w-full md:flex-row flex-col justify-between">
                            <label htmlFor="company_name" className="font-medium pr-1">
                                Company Name
                            </label>
                            <input
                                id="company_name"
                                name="company_name"
                                value={profile?.employer?.company_name}
                                onChange={e => updateSub(
                                    {
                                        value: e.target.value,
                                        role: RoleType.employer,
                                        key: e.target.id,
                                        setProfile: setProfile
                                    }
                                )}
                                type="text"
                                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                            />
                        </div>
                        <div className="flex w-full md:flex-row flex-col justify-between">
                            <label htmlFor="company_address" className="font-medium pr-1">
                                Company Location
                            </label>
                            <input
                                id="company_address"
                                name="company_address"
                                value={profile?.employer?.company_address || ""}
                                onChange={e => {
                                    updateSub(
                                        {
                                            value: e.target.value,
                                            role: RoleType.employer,
                                            key: e.target.id,
                                            setProfile: setProfile
                                        }
                                    )
                                }}
                                type="text"
                                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
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

export default EditEmployerMainProfile;
