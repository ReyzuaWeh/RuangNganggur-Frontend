import ModalsLayout from "@components/layouts/ModalsLayout";
import { DataOutUser } from "@dataType/fetch";
import { RoleType } from "@dataType/khusus";
import { getModalProfileSets } from "@pages/users/Profile";
import { useMyProfile } from "@provider/userProvider";
import functionSets from "@utils/function";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const EditDataJobseekerModals = () => {
    const { profile: dataProfile } = useMyProfile();
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
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (!file) {
            updateSub({
                value: null,
                role: RoleType.jobseeker,
                key: e.target.id,
                setProfile: setProfile
            })
            updateSub({
                value: null,
                role: RoleType.jobseeker,
                key: e.target.id + "_file",
                setProfile: setProfile
            });
            updateSub({
                value: null,
                role: RoleType.jobseeker,
                key: e.target.id + "_name",
                setProfile: setProfile
            });
            return
        };
        try {
            const base64String = await functionSets.getBase64(file);
            updateSub({
                value: file.name,
                role: RoleType.jobseeker,
                key: e.target.id,
                setProfile: setProfile
            })
            updateSub({
                value: base64String,
                role: RoleType.jobseeker,
                key: e.target.id + "_file",
                setProfile: setProfile
            });
            updateSub({
                value: file.name,
                role: RoleType.jobseeker,
                key: e.target.id + "_name",
                setProfile: setProfile
            });
            console.log(profile)
        } catch (error) {
            console.error('Error reading file:', error);
        }
    };
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
                        <h2 className="text-2xl font-semibold">Edit Your Profile</h2>
                        <button className="text-xl" onClick={onClose} disabled={isLoading} type="button">
                            <IoMdClose size={30} />
                        </button>
                    </div>
                    <div className="py-2 flex items-center flex-col md:flex-row gap-x-2">
                        <div className="flex flex-col w-full md:w-1/2">
                            <label htmlFor="nis" className="font-medium">
                                NIS
                            </label>
                            <input
                                id="nis"
                                name="nis"
                                value={profile?.jobseeker?.nis}
                                disabled={true}
                                type="text"
                                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col w-full md:w-1/2">
                            <label htmlFor="graduate_year" className="font-medium">
                                Graduate Year
                            </label>
                            <input
                                id="graduate_year"
                                name="graduate_year"
                                value={profile?.jobseeker?.graduate_year || "Not Verified"}
                                disabled={true}
                                type="text"
                                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="py-2 flex flex-col gap-x-2">
                        <label htmlFor="phone_number" className="font-medium">
                            Phone Number
                        </label>
                        <input
                            id="phone_number"
                            name="phone_number"
                            value={profile?.jobseeker?.phone_number || ""}
                            onChange={(e) => {
                                updateSub({
                                    value: e.target.value || null,
                                    role: RoleType.jobseeker,
                                    key: e.target.id,
                                    setProfile: setProfile
                                })
                            }}
                            placeholder="e.g. 08XX"
                            type="text"
                            className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                        />
                    </div>
                    <div className="py-2 flex flex-col gap-x-2">
                        <h2 className="text-xl font-semibold">
                            Attachment
                        </h2>
                        <div className="py-2 flex flex-col gap-x-2">
                            <label htmlFor="resume" className="font-medium">
                                Your Resume
                            </label>
                            <input
                                id="resume"
                                name="resume"
                                onChange={(e) => {
                                    handleFileChange(e)
                                }}
                                accept="application/pdf"
                                type="file"
                                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                            />
                        </div>
                        <div className="py-2 flex flex-col gap-x-2">
                            <label htmlFor="cv" className="font-medium">
                                Your CV
                            </label>
                            <input
                                id="cv"
                                name="cv"
                                onChange={(e) => {
                                    handleFileChange(e)
                                }}
                                accept="application/pdf"
                                type="file"
                                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                            />
                        </div>
                        <div className="py-2 flex flex-col gap-x-2">
                            <label htmlFor="portfolio" className="font-medium">
                                Your Portfolio
                            </label>
                            <input
                                id="portfolio"
                                name="portfolio"
                                onChange={(e) => {
                                    handleFileChange(e)
                                }}
                                accept="application/pdf"
                                type="file"
                                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                            />
                        </div>
                    </div>
                </>
            )}
        />
    )
}
export default EditDataJobseekerModals
