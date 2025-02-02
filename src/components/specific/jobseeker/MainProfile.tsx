import images_source from "@/assets/get/images"
import { DataOutJobseeker } from "@dataType/fetch"
import { getModalProfileSets } from "@pages/users/Profile"
import { useMyProfile } from "@provider/userProvider"
import { CgProfile } from "react-icons/cg"
import { CiMail } from "react-icons/ci"

const MainProfile = () => {
    const { profile } = useMyProfile()
    const { openEditMain: openModals } = getModalProfileSets()
    const DataSubJobseeker: DataOutJobseeker | null = profile?.jobseeker || null;
    return (
        <div className="rounded-md bg-primary mt-5 py-5 px-6 md:px-14 text-white">
            <div className="flex flex-col justify-center md:flex-row gap-4 md:gap-x-6 items-center md:items-start">
                <div className="w-28 bg-white aspect-square rounded-full self-center overflow-hidden border relative border-white ">
                    <img
                        // @ts-ignore
                        src={profile?.image || images_source["../no-profile.png"].default} // Display user image if available
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="md:w-full">
                    <div className="mb-2">
                        <h1 className="font-semibold text-3xl md:text-5xl">
                            Hi, {
                                DataSubJobseeker?.first_name +
                                (DataSubJobseeker?.last_name ? ` ${DataSubJobseeker.last_name}` : "")
                            }!
                        </h1>
                    </div>
                    <div className="opacity-80 flex flex-col gap-y-2">
                        <p className="text-xs flex items-center gap-x-2">
                            <CgProfile />
                            {profile?.username}
                        </p>
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

export default MainProfile