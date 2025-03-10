import images_source from "@/assets/get/images"
import { useMyProfile } from "@components/provider/userProvider"
import { RoleType } from "@dataType/khusus"
import { getModalProfileSets } from "@pages/users/Profile"
import { CiMail } from "react-icons/ci"

const DataMainAdminProfile = () => {
    const { profile } = useMyProfile()
    const { openEditMain: openModals } = getModalProfileSets();
    return (
        <div className="rounded-md bg-primary mt-5 py-5 px-6 md:px-14 text-white">
            <div className="flex flex-col md:flex-row gap-4 md:gap-x-6 items-center md:items-start">
                <div className="w-28 bg-white aspect-square rounded-full self-center overflow-hidden border relative border-white ">
                    <img
                        // @ts-ignore
                        src={profile?.image || images_source["../no-profile.png"].default} // Display user image if available
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className={`md:w-full`}>
                    <div className="mb-4">
                        <h1 className="font-semibold text-3xl md:text-5xl">
                            Hi {profile?.role === RoleType.admin ? "Admin BKK" : ""}, {profile?.username}!
                        </h1>
                    </div>
                    <div className="opacity-80 flex flex-col gap-y-2">
                        <p className="text-xs flex items-center gap-x-2">
                            <CiMail />
                            {profile?.email || "Email not configured"}
                        </p>
                        <button
                            onClick={() => openModals()}
                            className="text-sm px-4 border border-white rounded-lg"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DataMainAdminProfile