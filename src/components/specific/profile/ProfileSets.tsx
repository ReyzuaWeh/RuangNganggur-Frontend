import ProfileSetEmployer from "@components/employer/ProfileSetEmployer";
import ProfileSetJobSeeker from "@components/jobseeker/ProfileSetJobSeeker";
import { ProfileSetParams, RoleType } from "@dataType/khusus";
const ProfileSets = (
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
            {
                dataProfile?.role === RoleType.jobseeker &&
                <ProfileSetJobSeeker
                    dataProfile={dataProfile}
                    isOpenMain={isOpenMain}
                    openEditMain={openEditMain}
                    onCloseMain={onCloseMain}
                    isOpenMiddle={isOpenMiddle}
                    openEditMiddle={openEditMiddle}
                    onCloseMiddle={onCloseMiddle}
                    isOpenDesc={isOpenDesc}
                    openEditDesc={openEditDesc}
                    onCloseDesc={onCloseDesc}
                    updateSub={updateSub}
                    saveChange={saveChange}
                    setNewProfile={setNewProfile}
                />
            }
            {
                dataProfile?.role === RoleType.employer &&
                <ProfileSetEmployer
                    dataProfile={dataProfile}
                    isOpenMain={isOpenMain}
                    openEditMain={openEditMain}
                    onCloseMain={onCloseMain}
                    isOpenMiddle={isOpenMiddle}
                    openEditMiddle={openEditMiddle}
                    onCloseMiddle={onCloseMiddle}
                    isOpenDesc={isOpenDesc}
                    openEditDesc={openEditDesc}
                    onCloseDesc={onCloseDesc}
                    updateSub={updateSub}
                    saveChange={saveChange}
                    setNewProfile={setNewProfile}
                />
            }
        </>
    )
}
export default ProfileSets
