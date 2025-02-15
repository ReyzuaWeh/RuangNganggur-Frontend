import { useMyProfile } from "@components/provider/userProvider"
import { DataOutUser } from "@dataType/fetch"
import { getModalProfileSets } from "@pages/users/Profile"
import { useEffect, useState } from "react"
import { FaRegEdit } from "react-icons/fa"

const DataMiddleEmployer = ({ view_only, user }: { view_only?: boolean, user?: DataOutUser }) => {
    const { profile: dataProfile } = useMyProfile()
    const [profile, setProfile] = useState(user || dataProfile)
    const openModals = !view_only ? getModalProfileSets().openEditMiddle : undefined;
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
                    <h1 className="font-semibold text-xl md:text-2xl px-2">{view_only ? (`${profile?.employer?.company_name}'s`) : "Your"} Company Profile</h1>
                    {openModals && (<button className="bg-primary text-white px-3 py-2 rounded-lg text-sm" onClick={() => openModals()}>
                        <FaRegEdit size={20} className="cursor-pointer" />
                    </button>)}
                </div>
                <div className="w-full py-3 opacity-65 flex-wrap flex justify-between">
                    <div className="flex flex-col px-2 pt-1 pb-0 lg:w-1/2 w-full">
                        <h3 className="font-medium">Company Phone Number</h3>
                        <p
                            className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md w-full"
                        >
                            {profile?.employer?.company_phone_number || `${view_only ? "Employer" : "You"} don't set contact number yet`}
                        </p>
                    </div>
                    <div className="flex flex-col px-2 pt-1 lg:w-1/2 w-full">
                        <h3 className="font-medium">Company Vision</h3>
                        <div
                            className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md w-full overflow-auto"
                            style={{ resize: 'vertical' }}
                        >
                            {profile?.employer?.company_vision || `${view_only ? "Employer" : "You"} don't set company vision yet`}
                        </div>
                    </div>

                    <div className="flex flex-col px-2 pt-1 w-full">
                        <h3 className="font-medium">Company Mission</h3>
                        <div
                            className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md w-full overflow-auto"
                            style={{ resize: 'vertical', minHeight: '100px' }}
                        >
                            {profile?.employer?.company_mission || `${view_only ? "Employer" : "You"} don't set company mission yet`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DataMiddleEmployer
