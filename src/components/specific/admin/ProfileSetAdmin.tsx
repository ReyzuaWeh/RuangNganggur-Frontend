import JobCompanyPagination from "@/components/specific/admin/DataJobsComponent"
import { getModalProfileSets } from "@pages/Profile"
import DataMainAdminProfile from "./DataMainAdminProfile"
import EditDataMainAdminProfile from "./EditDataMainAdminProfile"

const ProfileSetAdmin = () => {
    const { isOpenMain } = getModalProfileSets()
    return (
        <>
            <DataMainAdminProfile />
            <JobCompanyPagination />
            {isOpenMain && <EditDataMainAdminProfile />}
        </>
    )
}
export default ProfileSetAdmin
