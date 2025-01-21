import { getModalProfileSets } from "@pages/users/Profile"
import DataMiddleJobSeeker from "./DataMiddleJobSeeker"
import DataSkills from "./DataSkills"
import EditDataJobseekerModals from "./EditDataJobseekerModals"
import EditDataSkillsModals from "./EditDataSkillsModals"
import EditMainProfile from "./EditMainProfile"
import MainProfile from "./MainProfile"

const ProfileSetJobSeeker = () => {
    const { isOpenMain, isOpenMiddle, isOpenDesc } = getModalProfileSets()
    return (
        <>
            <MainProfile />
            <DataMiddleJobSeeker />
            <DataSkills />
            {isOpenMain && <EditMainProfile />}
            {isOpenMiddle && <EditDataJobseekerModals />}
            {isOpenDesc && <EditDataSkillsModals />}
        </>
    )
}
export default ProfileSetJobSeeker