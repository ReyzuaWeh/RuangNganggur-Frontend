import { useMyProfile } from "@components/provider/userProvider"
import { getModalProfileSets } from "@pages/users/Profile"
import { FaRegEdit } from "react-icons/fa"

const DataMiddleEmployer = () => {
    const { openEditMiddle: openModals } = getModalProfileSets()

    const { profile } = useMyProfile()
    return (
        <div className="border w-full p-4 pb-3 mt-5 flex flex-col-reverse md:flex-col rounded-lg bg-white">
            <div className="w-full py-5 px-3 border border-primary border-opacity-65 rounded-lg items-center 
                justify-between gap-x-2">
                <div className="justify-between flex w-full">
                    <h1 className="font-semibold text-xl md:text-2xl px-2">Your Company</h1>
                    <button className="bg-primary text-white px-3 py-2 rounded-lg text-sm" onClick={() => openModals()}>
                        <FaRegEdit size={20} className="cursor-pointer" />
                    </button>
                </div>
                <div className="w-full py-3 opacity-65 flex-wrap flex justify-between">
                    <div className="flex flex-col px-2 pt-1 pb-0 w-1/2">
                        <h3 className="font-medium">Company Phone Number</h3>
                        <p className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md w-full">
                            {profile?.employer?.company_phone_number || "You don't set contact number yet"}
                        </p>
                    </div>
                    <div className="flex flex-col px-2 pt-1 w-1/2">
                        <h3 className="font-medium">Company Vision</h3>
                        <textarea
                            rows={1}
                            className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md w-full"
                            value={profile?.employer?.company_vision || "You don't set company vision yet"}
                            disabled={true}
                        />
                    </div>
                    <div className="flex flex-col px-2 pt-1 w-full">
                        <h3 className="font-medium">Company Mission</h3>
                        <textarea
                            rows={5}
                            className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md w-full"
                            value={profile?.employer?.company_mission || "You don't set company mission yet"}
                            disabled={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DataMiddleEmployer
