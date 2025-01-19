import images_source from "@/assets/get/images"
import { DataOutEmployer } from "@dataType/fetch"
import { ProfileSubComponentParams } from "@dataType/khusus"
import { CiLocationOn, CiMail } from "react-icons/ci"

const DataMainEmployerProfile = (
    { profile, openModals }: ProfileSubComponentParams
) => {
    const DataSubEmployer: DataOutEmployer | null = profile?.employer || null;
    return (
        <div className="rounded-md bg-primary mt-5 py-5 px-6 md:px-14 text-white">
            <div className="flex flex-col md:flex-row gap-4 md:gap-x-6 items-center md:items-start">
                <div>
                    <img
                        // @ts-ignore
                        src={profile?.image || images_source["../no-profile.png"].default} // Display user image if available
                        alt="Profile"
                        className="w-20 h-20 md:w-auto md:h-auto"
                    />
                </div>
                <div className="w-100">
                    <div className="mb-4">
                        <h1 className="font-semibold text-3xl md:text-5xl">
                            Hi, {DataSubEmployer?.company_name}!
                        </h1>
                    </div>
                    <div className="opacity-80 flex flex-col gap-y-2">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-y-2 md:gap-x-2">
                            <p className="text-xs flex items-center gap-x-2">
                                <CiLocationOn />
                                {DataSubEmployer?.company_address || "Location not provided"}
                            </p>
                        </div>
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

export default DataMainEmployerProfile