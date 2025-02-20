import ModalsLayout from "@components/ModalsLayout";
import { DataOutUser } from "@dataType/fetch";
import { RoleType } from "@dataType/khusus";
import { getModalProfileSets } from "@pages/Profile";
import { useMyProfile } from "@provider/userProvider";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const EditDataMiddle2Employer = () => {
    const { profile: dataProfile } = useMyProfile()
    const {
        setIsLoading,
        isLoading,
        onCloseMiddle2: onClose,
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
                        <h2 className="text-2xl font-semibold">Edit Your Employer Detail</h2>
                        <button className="text-xl" onClick={onClose} type="button">
                            <IoMdClose size={30} />
                        </button>
                    </div>
                    <p className="text-base opacity-75">
                        Please update your employer details below. Fill out each field with your current employment information to ensure your profile stays up-to-date.
                    </p>
                    <div className="py-2 flex flex-col gap-x-2">
                        <div className="flex flex-col">
                            <label htmlFor="employer_name" className="font-medium">
                                Employer Name
                            </label>
                            <input
                                id="employer_name"
                                name="employer_name"
                                value={profile?.employer?.employer_name || ""}
                                onChange={(e) => {
                                    updateSub({
                                        value: e.target.value || null,
                                        role: RoleType.employer,
                                        key: e.target.id,
                                        setProfile: setProfile
                                    })
                                }}
                                placeholder="e.g. James Smith"
                                type="text"
                                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="employer_position" className="font-medium">
                                Employer Position
                            </label>
                            <input
                                id="employer_position"
                                name="employer_position"
                                value={profile?.employer?.employer_position || ""}
                                onChange={(e) => {
                                    updateSub({
                                        value: e.target.value || null,
                                        role: RoleType.employer,
                                        key: e.target.id,
                                        setProfile: setProfile
                                    })
                                }}
                                placeholder="e.g. Human Resource Development"
                                type="text"
                                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="employer_phone_number" className="font-medium">
                                Employer Contact Number
                            </label>
                            <input
                                id="employer_phone_number"
                                name="employer_phone_number"
                                value={profile?.employer?.employer_phone_number || ""}
                                onChange={(e) => {
                                    updateSub({
                                        value: e.target.value || null,
                                        role: RoleType.employer,
                                        key: e.target.id,
                                        setProfile: setProfile
                                    })
                                }}
                                placeholder="e.g. 0855XX"
                                type="text"
                                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="employer_email" className="font-medium">
                                Employer Email
                            </label>
                            <input
                                id="employer_email"
                                name="employer_email"
                                value={profile?.employer?.employer_email || ""}
                                onChange={(e) => {
                                    updateSub({
                                        value: e.target.value || null,
                                        role: RoleType.employer,
                                        key: e.target.id,
                                        setProfile: setProfile
                                    })
                                }}
                                placeholder="e.g. user@mail.com"
                                type="text"
                                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                            />
                        </div>
                    </div>
                </>
            )}
        />
    )
}
export default EditDataMiddle2Employer
