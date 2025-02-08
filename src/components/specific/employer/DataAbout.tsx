import { DataOutUser } from "@dataType/fetch"
import { getModalProfileSets } from "@pages/users/Profile"
import { useMyProfile } from "@provider/userProvider"
import { useEffect, useState } from "react"
import { FaRegEdit } from "react-icons/fa"

const DataAbout = ({ view_only, user }: { view_only?: boolean, user?: DataOutUser }) => {
    const openModals = !view_only ? getModalProfileSets().openEditDesc : undefined;
    const { profile: dataProfile } = useMyProfile()
    const [profile, setProfile] = useState(user || dataProfile)
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
            <div className="w-full gap-x-2 border py-5 px-3 my-1 border-primary border-opacity-65 rounded-lg">
                <div className="w-full flex justify-between pb-2">
                    <h1 className="font-semibold text-xl md:text-2xl">Company Description</h1>
                    {openModals && (<button className="bg-primary text-white px-3 py-2 rounded-lg text-sm" onClick={() => openModals()}>
                        <FaRegEdit size={20} className="cursor-pointer" />
                    </button>)}
                </div>
                <div
                    className="py-1 px-2 text-sm border-2 opacity-65 border-gray-400 rounded-md w-full overflow-auto"
                    style={{ resize: 'vertical', minHeight: '100px' }}
                >
                    {profile?.employer?.company_description || `${view_only ? "Employer" : "You"} haven't shared about ${view_only ? "their" : "your"} company`}
                </div>
            </div>
        </div >
    )
}
export default DataAbout