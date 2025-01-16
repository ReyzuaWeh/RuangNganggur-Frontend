import images_source from "@/assets/get/images";
import DashboardLayout from "@components/DashboardLayout";
import AddAbout from "@components/employer/AddAbout";
import AddCV from "@components/profile/AddCV";
import AddPosition from "@components/profile/AddPosition";
import AddResume from "@components/profile/AddResume";
import EditMainProfile from "@components/profile/EditProfile";
import MainProfile from "@components/specific/jobseeker/MainProfile";
import { DataOutUser } from "@dataType/fetch";
import { RoleType } from "@dataType/khusus";
import fetchUser from "@utils/fetch/users";
import functionSets from "@utils/function";
import swalError from "@utils/swal/error";
import swalSuccess from "@utils/swal/success";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaRegEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Profile = () => {
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
    const [isFileModalOpen, setIsFileModalOpen] = useState(false);
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
    const [profile, setProfile] = useState<DataOutUser | null>(null);
    const [loading, setLoading] = useState(true);

    const openAboutModal = () => setIsAboutModalOpen(true);
    const closeDescriptionModal = () => setIsAboutModalOpen(false);

    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    // const openWorkModal = () => setIsWorkModalOpen(true);
    const closeWorkModal = () => setIsWorkModalOpen(false);

    // const openFileModal = () => setIsFileModalOpen(true);
    const closeFileModal = () => setIsFileModalOpen(false);

    // const openResumeModal = () => setIsResumeModalOpen(true);
    const closeResumeModal = () => setIsResumeModalOpen(false);

    const updateSubProfile = fetchUser.updateSubProfile
    // Fetch profile data from the API
    useEffect(() => {
        fetchUser.getProfile().then(value => {
            setProfile(value);
            setLoading(false);
        }).catch(async error => {
            swalError(error.status, "Cannot get data user");
            const errorData = await error.json();
            console.error(errorData)
        })
    }, []);
    const saveChange = (updatedProfile: DataOutUser, setProfile: React.Dispatch<React.SetStateAction<DataOutUser | null>>) => {
        return fetchUser.updateProfile(updatedProfile).then(value => {
            swalSuccess({ title: "Update Success!", message: "Your profile has been updated." })
            setProfile(value);
        }).catch(async error => {
            console.error("Error updating profile:", error);
            const errorData = await error.json();
            console.error(errorData)
            swalError(error.status, "Cannot update data user");
        });
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
                {/* Profile  */}
                <div className="rounded-md bg-primary mt-5 py-5 px-6 md:px-14 text-white">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-x-6 items-center md:items-start">
                        <div>
                            <img
                                //@ts-ignore
                                src={profile?.image || images_source["../no-profile.png"].default} // Display user image if available
                                alt="Profile"
                                className="w-20 h-20 md:w-auto md:h-auto"
                            />
                        </div>
                        <MainProfile profile={profile} openEditMainProfile={openEditModal} />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center mt-5">Loading profile...</div>
                ) : (
                    <div className="mt-5 w-full md:flex md:flex-row md:items-start gap-4 md:gap-x-2">
                        <div className="bg-white h-[300px] w-full p-5 md:p-10 flex justify-start flex-col gap-y-10 ">
                            <div className="flex items-start flex-col gap-y-2">
                                <h1 className="font-semibold text-xl md:text-2xl">
                                    About Company
                                </h1>
                                <div className="text-sm w-full">
                                    {profile?.employer?.company_description?.trim() !== "" ? (
                                        <div className="border w-full opacity-65 flex items-center justify-between gap-x-2 border-primary rounded-lg p-4">
                                            <p>{profile?.employer?.company_description}</p>
                                            <button onClick={openAboutModal}>
                                                <FaRegEdit />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <p>Add your about</p>
                                            <button
                                                className="text-sm w-full border border-primary px-4 py-1 rounded-lg"
                                                onClick={openAboutModal}
                                            >
                                                Add
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isAboutModalOpen && (
                    <AddAbout
                        onClose={closeDescriptionModal}
                        dataProfile={profile}
                        updateSub={updateSubProfile}
                        saveChange={saveChange}
                        setNewProfile={setProfile}
                    />
                )}
                {isEditModalOpen &&
                    <EditMainProfile
                        onClose={closeEditModal}
                        dataProfile={profile}
                        updateSub={updateSubProfile}
                        saveChange={saveChange}
                        setNewProfile={setProfile}
                    />
                }
                {isWorkModalOpen && <AddPosition onClose={closeWorkModal} />}
                {isFileModalOpen && <AddCV onClose={closeFileModal} setProfile={setProfile} profile={profile} />}
                {isResumeModalOpen && <AddResume onClose={closeResumeModal} setProfile={setProfile} profile={profile} />}
            </DashboardLayout>
        </>
    );
};

export default Profile;
