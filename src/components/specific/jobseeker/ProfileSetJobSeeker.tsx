import { ProfileSetParams } from "@dataType/khusus"
import DataMiddleJobSeeker from "./DataMiddleJobSeeker"
import DataSkills from "./DataSkills"
import EditDataJobseekerModals from "./EditDataJobseekerModals"
import EditDataSkillsModals from "./EditDataSkillsModals"
import EditMainProfile from "./EditMainProfile"
import MainProfile from "./MainProfile"

const ProfileSetJobSeeker = (
    {
        dataProfile,
        isOpenMain,
        openEditMain,
        onCloseMain,
        isOpenMiddle,
        openEditMiddle,
        onCloseMiddle,
        isOpenDesc,
        openEditDesc,
        onCloseDesc,
        updateSub,
        saveChange,
        setNewProfile
    }: ProfileSetParams
) => {
    return (
        <>
            <MainProfile
                profile={dataProfile}
                openModals={openEditMain}
            />
            <DataMiddleJobSeeker
                profile={dataProfile}
                openModals={openEditMiddle}
            />
            <DataSkills
                profile={dataProfile}
                openModals={openEditDesc}
            />
            {
                isOpenMain &&
                <EditMainProfile
                    onClose={onCloseMain}
                    dataProfile={dataProfile}
                    updateSub={updateSub}
                    saveChange={saveChange}
                    setNewProfile={setNewProfile}
                />
            }
            {
                isOpenMiddle &&
                <EditDataJobseekerModals
                    onClose={onCloseMiddle}
                    dataProfile={dataProfile}
                    updateSub={updateSub}
                    saveChange={saveChange}
                    setNewProfile={setNewProfile}
                />
            }
            {
                isOpenDesc &&
                <EditDataSkillsModals
                    onClose={onCloseDesc}
                    dataProfile={dataProfile}
                    updateSub={updateSub}
                    saveChange={saveChange}
                    setNewProfile={setNewProfile}
                />
            }
        </>
    )
}
export default ProfileSetJobSeeker