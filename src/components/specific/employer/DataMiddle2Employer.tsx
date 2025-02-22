import { DataOutUser } from "@dataType/fetch";
import { getModalProfileSets } from "@pages/Profile";
import { useMyProfile } from "@provider/userProvider";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

const DataMiddle2Employer = ({ view_only, user }: { view_only?: boolean, user?: DataOutUser }) => {
    const { profile: dataProfile } = useMyProfile()
    const [profile, setProfile] = useState(user || dataProfile)
    const openModals = !view_only ? getModalProfileSets().openEditMiddle2 : undefined;
    useEffect(() => {
        if (dataProfile && !user) {
            setProfile(dataProfile)
        }
        if (user) {
            setProfile(user)
        }
    }, [user, dataProfile])
    return (
        <div className="border w-full p-4 pb-3 mt-5 flex flex-col-reverse md:flex-col rounded-lg bg-white">
            <div className="w-full py-5 px-3 border border-primary border-opacity-65 rounded-lg items-center 
                    justify-between gap-x-2">
                <div className="justify-between flex w-full">
                    <h1 className="font-semibold text-xl md:text-2xl px-2">{view_only ? (`Your `) : ""}Employer Detail</h1>
                    {openModals && (<button className="bg-primary text-white px-3 py-2 rounded-lg text-sm" onClick={() => openModals()}>
                        <FaRegEdit size={20} className="cursor-pointer" />
                    </button>)}
                </div>
                <div className="w-full py-3 opacity-65 flex-wrap flex justify-between">
                    <div className="flex flex-col px-2 pt-1 w-full">
                        <h3 className="font-medium">Employer Name</h3>
                        <div
                            className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md w-full overflow-auto"
                        >
                            {profile?.employer?.employer_name || `${view_only ? "Company" : "You"} don't set employer yet`}
                        </div>
                    </div>
                    <div className="flex flex-col px-2 pt-1 w-full">
                        <h3 className="font-medium">Employer Position</h3>
                        <div
                            className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md w-full overflow-auto"
                        >
                            {profile?.employer?.employer_position || `${view_only ? "Company" : "You"} don't reveal employer position yet`}
                        </div>
                    </div>
                    <div className="flex flex-col px-2 pt-1 pb-0 lg:w-1/2 w-full">
                        <h3 className="font-medium">Employer Phone Number</h3>
                        <p
                            className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md w-full"
                        >
                            {profile?.employer?.employer_phone_number || `${view_only ? "Company" : "You"} don't set employer contact number yet`}
                        </p>
                    </div>
                    <div className="flex flex-col px-2 pt-1 lg:w-1/2 w-full">
                        <h3 className="font-medium">Employer Email</h3>
                        <div
                            className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md w-full overflow-auto"
                        >
                            {profile?.employer?.employer_email || `${view_only ? "Company" : "You"} don't reveal employer email yet`}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default DataMiddle2Employer