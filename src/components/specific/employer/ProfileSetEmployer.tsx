import { getModalProfileSets } from "@pages/users/Profile"
import DataAbout from "./DataAbout"
import DataMainEmployerProfile from "./DataMainEmployerProfile"
import DataMiddle2Employer from "./DataMiddle2Employer"
import DataMiddleEmployer from "./DataMiddleEmployer"
import EditDataAboutModals from "./EditDataAboutModals"
import EditDataEmployerModals from "./EditDataEmployerModal"
import EditDataMiddle2Employer from "./EditDataMiddle2Employer"
import EditEmployerMainProfile from "./EditEmployerMainProfile"

const ProfileSetEmployer = () => {
    const { isOpenMain, isOpenMiddle, isOpenMiddle2, isOpenDesc } = getModalProfileSets()
    return (
        <>
            <DataMainEmployerProfile />
            <DataMiddle2Employer />
            <DataMiddleEmployer />
            <DataAbout />
            {isOpenMain && <EditEmployerMainProfile />}
            {isOpenMiddle2 && <EditDataMiddle2Employer />}
            {isOpenMiddle && <EditDataEmployerModals />}
            {isOpenDesc && <EditDataAboutModals />}
        </>
    )
}
export default ProfileSetEmployer
