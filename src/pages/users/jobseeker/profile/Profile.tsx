import { DataOutUser } from "@/dataType/fetch";
import DashboardLayout from "@components/DashboardLayout";
import AddAbout from "@components/profile/AddAbout";
import AddCV from "@components/profile/AddCV";
import AddPosition from "@components/profile/AddPosition";
import AddResume from "@components/profile/AddResume";
import EditProfile from "@components/profile/EditProfile";
import { useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaArrowLeft, FaRegEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Profile = () => {
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
    const [isFileModalOpen, setIsFileModalOpen] = useState(false);
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
    // const [resumeUrl, setResumeUrl] = useState(null);
    const [profile, setProfile] = useState<DataOutUser | null>(null);
    const [loading, setLoading] = useState(true);

    const openAboutModal = () => setIsAboutModalOpen(true);
    const closeAboutModal = () => setIsAboutModalOpen(false);

    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    // const openWorkModal = () => setIsWorkModalOpen(true);
    const closeWorkModal = () => setIsWorkModalOpen(false);

    const openFileModal = () => setIsFileModalOpen(true);
    const closeFileModal = () => setIsFileModalOpen(false);

    const openResumeModal = () => setIsResumeModalOpen(true);
    const closeResumeModal = () => setIsResumeModalOpen(false);



    // Fetch profile data from the API
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("access_token"); // Assuming token is stored in localStorage
                const response = await fetch("http://localhost:8000/users/profile", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Profile data:", data); // Log the response data
                    setProfile(data);
                } else {
                    console.error("Failed to fetch profile");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched or if there is an error
            }
        };

        fetchProfile();
    }, []);

    const updateSkills = async (newSkills: string) => {
        const token = localStorage.getItem("access_token");

        const updatedProfile = {
            ...profile,
            jobseeker: {
                ...profile?.jobseeker,
                skills: newSkills,
            },
        };

        try {
            const response = await fetch("https://ruang-nganggur-fast-api.vercel.app/users/profile", {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProfile),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Updated profile:", data); // Log updated profile data
                setProfile(data); // Update profile with new data
            } else {
                console.error("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleDeleteResume = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const updatedProfile = {
                ...profile,
                jobseeker: {
                    ...profile?.jobseeker,
                    resume: "",
                },
            };

            const response = await fetch("https://ruang-nganggur-fast-api.vercel.app/users/profile", {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProfile),
            });

            if (response.ok) {
                const data = await response.json();
                setProfile(data);
            } else {
                console.error("Failed to delete resume");
            }
        } catch (error) {
            console.error("Error deleting resume:", error);
        }
    };

    const handleDeleteCV = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const updatedProfile = {
                ...profile,
                jobseeker: {
                    ...profile?.jobseeker,
                    cv: "",
                },
            };

            const response = await fetch("https://ruang-nganggur-fast-api.vercel.app/users/profile", {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProfile),
            });

            if (response.ok) {
                const data = await response.json();
                setProfile(data);
            } else {
                console.error("Failed to delete resume");
            }
        } catch (error) {
            console.error("Error deleting resume:", error);
        }
    };

    return (
        <>
            <DashboardLayout>
                <div className="flex items-center gap-x-4 mb-5">
                    <NavLink to="/" className="hover:bg-gray-300 rounded-full p-3 md:p-4">
                        <FaArrowLeft size={20} className="cursor-pointer md:size-25" />
                    </NavLink>
                    <h1 className="text-lg md:text-2xl font-semibold">Your Profile</h1>
                </div>

                {/* Profile  */}
                <div className="rounded-md bg-primary mt-5 py-5 px-6 md:px-14 text-white">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-x-6 items-center md:items-start">
                        <div>
                            <img
                                src={profile?.image || "/assets/no-profile.png"} // Display user image if available
                                alt="Profile"
                                className="w-20 h-20 md:w-auto md:h-auto"
                            />
                        </div>
                        <div>
                            <div className="mb-4">
                                <h1 className="font-semibold text-3xl md:text-5xl">
                                    Hi, {profile ? profile.username : "User"}!
                                </h1>
                            </div>
                            <div className="opacity-80 flex flex-col gap-y-2">
                                {/* <div className="flex flex-col md:flex-row items-start md:items-center gap-y-2 md:gap-x-2">
                                    <p className="text-xs flex items-center gap-x-2">
                                        <CiLocationOn />
                                        {profile?.location || "Location not available"}
                                    </p>
                                </div> */}
                                <p className="text-xs flex items-center gap-x-2">
                                    <CiMail />
                                    {profile?.email || "Email not available"}
                                </p>
                                <button
                                    onClick={openEditModal}
                                    className="text-sm px-4 border border-white rounded-lg"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center mt-5">Loading profile...</div>
                ) : (
                    <div className="mt-5 w-full">
                        <div className="flex flex-col items-start gap-4 lg:gap-x-2">
                            <div className="bg-white shadow-lg rounded-md w-full  p-5 md:p-10 flex flex-col gap-y-10">
                                <div className="flex flex-col items-start  gap-y-2">
                                    <h1 className="font-semibold text-xl md:text-2xl">
                                        About Me
                                    </h1>
                                    <div className="text-sm">
                                        {profile?.jobseeker?.skills?.trim() !== "" ? (
                                            <div className="border opacity-65 flex items-center justify-between gap-x-2 border-primary rounded-lg p-4 text-sm">
                                                <p>{profile?.jobseeker?.skills}</p>
                                                <button onClick={openAboutModal}>
                                                    <FaRegEdit />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <p>Add your about</p>
                                                <button
                                                    className="text-sm border border-primary px-4 py-1 rounded-lg"
                                                    onClick={openAboutModal}
                                                >
                                                    Add
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className=" w-full gap-4  flex justify-between">
                                <div className="bg-white shadow-lg rounded-md w-1/2 p-5 flex items-start flex-col gap-y-2">
                                    <h1 className="font-semibold text-xl md:text-2xl">
                                        CV & Certifications
                                    </h1>
                                    {profile?.jobseeker?.cv ? (
                                        <div className="border w-3/4 bg-primary text-white gap-y-2 px-8 py-4 flex flex-col rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <a href={profile ? profile.jobseeker.cv : ""} className="text-lg">CV {profile?.username}.pdf</a>
                                            </div>
                                            <p className="text-sm opacity-70">Added 10 minutes ago</p>

                                            <button onClick={handleDeleteCV} className="w-1/2 text-red-500 border-2 rounded-md border-red-700">Delete</button>
                                        </div>
                                    ) : (
                                        <button onClick={openFileModal} className="text-sm border border-primary px-4 py-1 rounded-lg">
                                            Add
                                        </button>
                                    )}
                                </div>
                                <div className="bg-white rounded-md shadow-lg w-1/2 p-5 flex items-start flex-col gap-y-2">
                                    <h1 className="font-semibold text-xl md:text-2xl">Resume</h1>
                                    {profile?.jobseeker?.resume ? (
                                        <div className="border w-3/4 bg-primary text-white gap-y-2 px-8 py-4 flex flex-col rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <a href={profile ? profile.jobseeker.resume : ""} className="text-lg">Resume {profile?.username}.pdf</a>
                                            </div>
                                            <p className="text-sm opacity-70">Added 10 minutes ago</p>

                                            <button onClick={handleDeleteResume} className="w-1/2 text-red-500 border-2 rounded-md border-red-700">Delete</button>
                                        </div>
                                    ) : (
                                        <button onClick={openResumeModal} className="text-sm border border-primary px-4 py-1 rounded-lg">
                                            Add
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isAboutModalOpen && (
                    <AddAbout onClose={closeAboutModal} updateSkills={updateSkills} />
                )}
                {isEditModalOpen && <EditProfile onClose={closeEditModal} />}
                {isWorkModalOpen && <AddPosition onClose={closeWorkModal} />}
                {isFileModalOpen && <AddCV onClose={closeFileModal} setProfile={setProfile} profile={profile} />}
                {isResumeModalOpen && <AddResume onClose={closeResumeModal} setProfile={setProfile} profile={profile} />}
            </DashboardLayout>
        </>
    );
};

export default Profile;
