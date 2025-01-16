import { DataOutEmployer, DataOutJobseeker, DataOutUser } from "@dataType/fetch"
import { modalFunctionType, RoleType } from "@dataType/khusus"
import { CiLocationOn, CiMail } from "react-icons/ci"

const MainProfile = (
    { profile, openEditMainProfile }: {
        profile: DataOutUser | null,
        openEditMainProfile: modalFunctionType
    }
) => {
    const DataSubEmployer: DataOutEmployer | null = profile?.employer || null;
    const DataSubJobseeker: DataOutJobseeker | null = profile?.jobseeker || null;
    return (
        <div className="w-100">
            <div className="mb-4">
                <h1 className="font-semibold text-3xl md:text-5xl">
                    Hi, {profile?.role == RoleType.jobseeker ?
                        DataSubJobseeker?.first_name + " " + DataSubJobseeker?.last_name
                        : DataSubEmployer?.company_name}!
                </h1>
            </div>
            <div className="opacity-80 flex flex-col gap-y-2">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-y-2 md:gap-x-2">
                    <p className="text-xs flex items-center gap-x-2">
                        <CiLocationOn />
                        {DataSubEmployer?.company_address || "Location not available"}
                    </p>
                </div>
                <p className="text-xs flex items-center gap-x-2">
                    <CiMail />
                    {profile?.email || "Email not available"}
                </p>
                <button
                    onClick={() => openEditMainProfile(true)}
                    className="text-sm px-4 border border-white rounded-lg"
                >
                    Edit
                </button>
            </div>
        </div>
    )
}

export default MainProfile