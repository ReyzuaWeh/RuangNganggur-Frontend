import { getModalProfileSets } from "@pages/Profile"
import JobCompanyPagination from "./DataJobsComponent"
import DataMainAdminProfile from "./DataMainAdminProfile"
import DataUsersComponent from "./DataUsersComponent"
import EditDataMainAdminProfile from "./EditDataMainAdminProfile"

const ProfileSetAdmin = () => {
    const { isOpenMain } = getModalProfileSets()
    return (
        <>
            <DataMainAdminProfile />
            {/* <div className="shadow-lg rounded-lg p-6 border border-black ml-4 sm:ml-10">
                <h3 className="text-lg font-bold">Log Register</h3>
                <ul className="text-sm text-gray-600 list-decimal pl-5 mt-4">
                    <li>Ginanjar</li>
                    <li>Siti some long text...</li>
                    <li>More logs...</li>
                </ul>
            </div> */}
            <DataUsersComponent />
            <JobCompanyPagination />
            {isOpenMain && <EditDataMainAdminProfile />}
        </>
    )
}
export default ProfileSetAdmin
