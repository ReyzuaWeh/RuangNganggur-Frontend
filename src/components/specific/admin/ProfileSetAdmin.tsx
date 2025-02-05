import { getModalProfileSets } from "@pages/Profile"
import DataMainAdminProfile from "./DataMainAdminProfile"
import EditDataMainAdminProfile from "./EditDataMainAdminProfile"

const ProfileSetAdmin = () => {
    const { isOpenMain } = getModalProfileSets()
    return (
        <>
            <DataMainAdminProfile />
            {isOpenMain && <EditDataMainAdminProfile />}
        </>
    )
}
export default ProfileSetAdmin
