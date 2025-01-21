import ModalsLayout from "@components/layouts/ModalsLayout";
import { DataOutUser } from "@dataType/fetch";
import { RoleType } from "@dataType/khusus";
import { getModalProfileSets } from "@pages/users/Profile";
import { useMyProfile } from "@provider/userProvider";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const EditDataSkillsModals = () => {
    const { profile: dataProfile } = useMyProfile()
    const {
        setIsLoading,
        isLoading,
        onCloseDesc: onClose,
        saveChange,
        setNewProfile,
        updateSub
    } = getModalProfileSets()

    const [isVisible, setIsVisible] = useState(false);
    const [profile, setProfile] = useState<DataOutUser | null>(dataProfile || null);
    return (
        <ModalsLayout
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            setLoading={setIsLoading}
            saveChange={saveChange}
            setNewProfile={setNewProfile}
            profile={profile as DataOutUser}
            isLoading={isLoading}
            children={
                <>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold">Edit Your Skills</h2>
                        <button className="text-xl" onClick={onClose} type="button">
                            <IoMdClose size={30} />
                        </button>
                    </div>
                    <div className="py-2 flex flex-col gap-x-2">
                        <label htmlFor="skills" className="font-medium">
                            Skills
                        </label>
                        <textarea
                            id="skills"
                            name="skills"
                            value={profile?.jobseeker?.skills || ""}
                            onChange={e => updateSub(
                                {
                                    value: e.target.value,
                                    role: RoleType.jobseeker,
                                    key: e.target.id,
                                    setProfile: setProfile
                                }
                            )}
                            rows={5}
                            placeholder="Tell about your skills"
                            className="py-1 px-2 text-sm border-2 w-full border-gray-400 rounded-md"
                        />
                    </div>
                </>
            }
        />

    )
}
export default EditDataSkillsModals
