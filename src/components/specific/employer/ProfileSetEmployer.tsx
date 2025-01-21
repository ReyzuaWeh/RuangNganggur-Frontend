import { getModalProfileSets } from "@pages/users/Profile"
import DataAbout from "./DataAbout"
import DataMainEmployerProfile from "./DataMainEmployerProfile"
import DataMiddleEmployer from "./DataMiddleEmployer"
import EditDataAboutModals from "./EditDataAboutModals"
import EditDataEmployerModals from "./EditDataEmployerModal"
import EditEmployerMainProfile from "./EditEmployerMainProfile"

const ProfileSetEmployer = () => {
    const { isOpenMain, isOpenMiddle, isOpenDesc } = getModalProfileSets()
    return (
        <>
            <DataMainEmployerProfile />
            <DataMiddleEmployer />
            <DataAbout />
            {isOpenMain && <EditEmployerMainProfile />}
            {isOpenMiddle && <EditDataEmployerModals />}
            {isOpenDesc && <EditDataAboutModals />}
        </>
    )
}
export default ProfileSetEmployer
