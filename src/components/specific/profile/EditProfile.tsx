import { DataOutUser } from "@dataType/fetch";
import { ModalsProfileParams, RoleType } from "@dataType/khusus";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { EditProfileExtra } from "./EditProfileExtra";


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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-right">
            <div
                className={`bg-white p-6 py-12 rounded-lg max-w-md transform transition-transform duration-300 
                    ${isVisible ? "translate-x-0" : "translate-x-full"}`
                }
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Edit Your Profile</h2>
                    <button className="text-xl" onClick={onClose}>
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
                {/* <div className="flex flex-col mt-5">
                    <label htmlFor="" className="font-medium">
                        Location
                    </label>
                    <input
                        type="text"
                        className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
                    />
                </div> */}
                <div className="flex flex-col mt-5">
                    <div className="flex justify-between w-full">
                        <h2 className="font-bold text-lg">Your Account</h2>
                        <a href="/users/settings" className="underline font-semibold">Change in settings</a>
                    </div>
                    <table className="mt-3">
                        <colgroup>
                            <col style={{ width: "30%" }} />
                            <col style={{ width: "70%" }} />
                        </colgroup>
                        <tr className="border-b-2 border-gray-400">
                            <td className="font-medium">Username</td>
                            <td>{profile?.username}</td>
                        </tr>
                        <tr className="border-b-2 border-gray-400">
                            <td className="font-medium">Email</td>
                            <td>{profile?.email || "Haven't configured it yet"}</td>
                        </tr>
                        <tr className="border-b-2 border-gray-400">
                            <td className="font-medium">Password</td>
                            <td>
                                <input
                                    type="password"
                                    disabled
                                    value={"Nuh uh, you can't see the value!"}
                                    maxLength={1}
                                />
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="flex justify-start mt-10">
                    <button
                        onClick={() => {
                            setLoading(true)
                            saveChange(profile as DataOutUser, setNewProfile).finally(() => setLoading(false))
                        }}
                        className="bg-primary text-white px-4 py-2 rounded-lg text-sm"
                        disabled={isLoading}
                    >
                        {!isLoading ? "Save" : "Saving..."}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditMainProfile;
