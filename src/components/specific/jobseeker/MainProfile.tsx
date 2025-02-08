import images_source from "@/assets/get/images"
import { DataOutJobseeker, DataOutUser } from "@dataType/fetch"
import { getModalProfileSets } from "@pages/users/Profile"
import { useMyProfile } from "@provider/userProvider"
import { useEffect, useState } from "react"
import { CgProfile } from "react-icons/cg"
import { CiMail } from "react-icons/ci"

const MainProfile = ({ view_only, user }: { view_only?: boolean, user?: DataOutUser }) => {
    const { profile: dataProfile } = useMyProfile()
    const [profile, setProfile] = useState<DataOutUser | null>(dataProfile)
    const openModals = !view_only ? getModalProfileSets().openEditMain : undefined;
    const DataSubJobseeker: DataOutJobseeker | null = profile?.jobseeker || null;
    useEffect(() => {
        if (dataProfile && !user) {
            setProfile(dataProfile)
        }
        if (user) {
            setProfile(user)
        }
    }, [user, dataProfile])
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
                            {!view_only && ("Hi, ")}{
                                DataSubJobseeker?.first_name +
                                (DataSubJobseeker?.last_name ? ` ${DataSubJobseeker.last_name}` : "")
                            }{!view_only && "!"}
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
                        {openModals && (<button
                            onClick={() => openModals()}
                            className="text-sm px-4 border border-white rounded-lg"
                        >
                            Edit
                        </button>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainProfile