import { getModalProfileSets } from "@pages/Profile"
import JobCompanyPagination from "./DataJobsComponent"
import DataLogRegister from "./DataLogRegister"
import DataMainAdminProfile from "./DataMainAdminProfile"
import DataUsersComponent from "./DataUsersComponent"
import EditDataMainAdminProfile from "./EditDataMainAdminProfile"

const ProfileSetAdmin = () => {
    const { isOpenMain } = getModalProfileSets()
    return (
        <>
            <DataMainAdminProfile />
            <DataLogRegister />
            <DataUsersComponent />
            <JobCompanyPagination />
            {isOpenMain && <EditDataMainAdminProfile />}
        </>
    )
}
export default ProfileSetAdmin
