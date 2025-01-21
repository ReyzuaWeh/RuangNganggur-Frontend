import ModalsLayout from "@components/layouts/ModalsLayout";
import { DataOutUser } from "@dataType/fetch";
import { RoleType } from "@dataType/khusus";
import { getModalProfileSets } from "@pages/users/Profile";
import { useMyProfile } from "@provider/userProvider";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const EditDataEmployerModals = () => {
    const { profile: dataProfile } = useMyProfile()
    const {
        setIsLoading,
        isLoading,
        onCloseMiddle: onClose,
        saveChange,
        setNewProfile,
        updateSub
    } = getModalProfileSets()
    const [isVisible, setIsVisible] = useState(false);
    const [profile, setProfile] = useState<DataOutUser | null>(dataProfile || null)
    return (
        <ModalsLayout
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            setLoading={setIsLoading}
            saveChange={saveChange}
            setNewProfile={setNewProfile}
            profile={profile as DataOutUser}
            isLoading={isLoading}
            children={(
                <>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold">Edit Your Company Profile</h2>
                        <button className="text-xl" onClick={onClose} type="button">
                            <IoMdClose size={30} />
                        </button>
                    </div>
                    <div className="py-2 flex flex-col gap-x-2">
                        <div className="flex flex-col">
                            <label htmlFor="company_phone_number" className="font-medium">
                                Company Phone Number
                            </label>
                            <input
                                id="company_phone_number"
                                name="company_phone_number"
                                value={profile?.employer?.company_phone_number || ""}
                                onChange={(e) => {
                                    updateSub({
                                        value: e.target.value || null,
                                        role: RoleType.employer,
                                        key: e.target.id,
                                        setProfile: setProfile
                                    })
                                }}
                                placeholder="e.g. 08XX"
                                type="text"
                                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="company_vision" className="font-medium">
                                Company Vision
                            </label>
                            <textarea
                                id="company_vision"
                                value={profile?.employer?.company_vision || ""}
                                onChange={(e) => {
                                    updateSub({
                                        value: e.target.value || null,
                                        role: RoleType.employer,
                                        key: e.target.id,
                                        setProfile: setProfile
                                    })
                                }}
                                rows={1}
                                placeholder="e.g. Our vision is..."
                                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="company_mission" className="font-medium">
                                Company Mission
                            </label>
                            <textarea
                                id="company_mission"
                                value={profile?.employer?.company_mission || ""}
                                onChange={(e) => {
                                    updateSub({
                                        value: e.target.value || null,
                                        role: RoleType.employer,
                                        key: e.target.id,
                                        setProfile: setProfile
                                    })
                                }}
                                placeholder="e.g. Our mission is..."
                                rows={5}
                                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                            />
                        </div>
                    </div>
                </>
            )}
        />
    )
}
export default EditDataEmployerModals