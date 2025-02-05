import { DataOutUser } from "@dataType/fetch"
import { getModalProfileSets } from "@pages/users/Profile"
import { useMyProfile } from "@provider/userProvider"
import { useEffect, useState } from "react"
import { FaRegEdit } from "react-icons/fa"

const DataMiddleJobSeeker = ({ view_only, user }: { view_only?: boolean, user?: DataOutUser }) => {
    const { profile: dataProfile } = useMyProfile()
    const [profile, setProfile] = useState(dataProfile)
    const openModals = !view_only ? getModalProfileSets().openEditMiddle : undefined;
    useEffect(() => {
        if (user) {
            setProfile(user)
        }
    }, [user])
    return (
        <div className="border w-full p-4 pb-3 mt-5 flex flex-col-reverse md:flex-col rounded-lg bg-white">
            <div className="md:flex items-center 
                justify-between gap-x-2">
                <div className="w-full md:w-1/2 border py-5 px-3 my-1 border-primary border-opacity-65 rounded-lg">
                    <h1 className="font-semibold text-xl md:text-2xl">{!view_only ? ("Your") : ("User")} Data</h1>
                    <div className="opacity-65 w-full">
                        <div className="flex flex-wrap pt-2">
                            <h3 className="font-medium">NIS</h3>
                            <p className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md w-full">
                                {profile?.jobseeker?.nis}
                            </p>
                        </div>
                        <div className="flex flex-wrap pt-2">
                            <h3 className="font-medium">Graduate Year</h3>
                            <p className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md w-full">
                                {profile?.jobseeker?.graduate_year || "Not Verified"}
                            </p>
                        </div>
                        <div className="flex flex-wrap pt-2">
                            <h3 className="font-medium">Phone Number</h3>
                            <p className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md w-full">
                                {profile?.jobseeker?.phone_number || "No Contact Number"}
                            </p>
                        </div>
                    </div>

                </div>
                <div
                    className="w-full md:w-1/2 border py-5 px-3 my-1 border-primary border-opacity-65 rounded-lg"
                >
                    <h1 className="font-semibold text-xl md:text-2xl">{!view_only ? ("Your") : ("User")} Attachment</h1>
                    <div className="opacity-65 w-full">
                        <div className="flex flex-wrap pt-2">
                            <h3 className="font-medium">Resume</h3>
                            <a
                                className="py-1 px-2 text-sm text-nowrap overflow-x-hidden border-2 border-gray-400 rounded-md w-full cursor-pointer"
                                href={profile?.jobseeker?.resume || ""}
                                target={profile?.jobseeker?.resume ? "_blank" : "_self"}
                            >
                                {profile?.jobseeker?.resume?.split("/").pop() || "No Resume"}
                            </a>
                        </div>
                        <div className="flex flex-wrap pt-2">
                            <h3 className="font-medium">CV</h3>
                            <a
                                className="py-1 px-2 text-sm text-nowrap overflow-x-hidden border-2 border-gray-400 rounded-md w-full cursor-pointer"
                                href={profile?.jobseeker?.cv || ""}
                                target={profile?.jobseeker?.cv ? "_blank" : "_self"}
                            >
                                {profile?.jobseeker?.cv?.split("/").pop() || "No CV"}
                            </a>
                        </div>
                        <div className="flex flex-wrap pt-2">
                            <h3 className="font-medium">Portfolio</h3>
                            <a
                                className="py-1 px-2 text-sm text-nowrap overflow-x-hidden border-2 border-gray-400 rounded-md w-full cursor-pointer"
                                href={profile?.jobseeker?.portfolio || ""}
                                target={profile?.jobseeker?.portfolio ? "_blank" : "_self"}
                            >
                                {profile?.jobseeker?.portfolio?.split("/").pop() || "No Portfolio"}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {openModals && (<div className="w-full flex mt-2 justify-end">
                <button className="bg-primary text-white px-3 py-2 rounded-lg text-sm" onClick={() => openModals()}>
                    <FaRegEdit size={20} className="cursor-pointer" />
                </button>
            </div>)}

        </div>
    )
}
export default DataMiddleJobSeeker