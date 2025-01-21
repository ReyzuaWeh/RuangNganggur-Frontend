import { getModalProfileSets } from "@pages/users/Profile"
import { useMyProfile } from "@provider/userProvider"
import { FaRegEdit } from "react-icons/fa"

const DataSkills = () => {
    const { openEditDesc: openModals } = getModalProfileSets()
    const { profile } = useMyProfile()
    return (
        <div className="border w-full p-4 pb-3 mt-5 flex flex-col-reverse md:flex-col rounded-lg bg-white">
            <div className="w-full gap-x-2 border py-5 px-3 my-1 border-primary border-opacity-65 rounded-lg">
                <div className="w-full flex justify-between pb-2">
                    <h1 className="font-semibold text-xl md:text-2xl">Your Skills</h1>
                    <button className="bg-primary text-white px-3 py-2 rounded-lg text-sm" onClick={() => openModals()}>
                        <FaRegEdit size={20} className="cursor-pointer" />
                    </button>
                </div>
                <div className="opacity-65 w-full">
                    <textarea
                        rows={5}
                        className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md w-full"
                        value={profile?.jobseeker?.skills || "You haven't shared about your skills"}
                        disabled={true}
                    />
                </div>
            </div>
        </div>
    )
}
export default DataSkills