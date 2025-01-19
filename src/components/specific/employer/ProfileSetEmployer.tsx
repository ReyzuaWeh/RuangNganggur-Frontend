import { ProfileSetParams } from "@/dataType/khusus"
import DataAbout from "./DataAbout"
import DataMainEmployerProfile from "./DataMainEmployerProfile"
import DataMiddleEmployer from "./DataMiddleEmployer"
import EditDataAboutModals from "./EditDataAboutModals"
import EditDataEmployerModals from "./EditDataEmployerModal"
import EditEmployerMainProfile from "./EditEmployerMainProfile"

const ProfileSetEmployer = ({
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
            <DataMainEmployerProfile
                profile={dataProfile}
                openModals={openEditMain}
            />
            <DataMiddleEmployer
                profile={dataProfile}
                openModals={openEditMiddle}
            />
            <DataAbout
                profile={dataProfile}
                openModals={openEditDesc}
            />
            {
                isOpenMain &&
                <EditEmployerMainProfile
                    onClose={onCloseMain}
                    dataProfile={dataProfile}
                    updateSub={updateSub}
                    saveChange={saveChange}
                    setNewProfile={setNewProfile}
                />
            }
            {
                isOpenMiddle &&
                <EditDataEmployerModals
                    onClose={onCloseMiddle}
                    dataProfile={dataProfile}
                    updateSub={updateSub}
                    saveChange={saveChange}
                    setNewProfile={setNewProfile}
                />
            }
            {
                isOpenDesc &&
                <EditDataAboutModals
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
export default ProfileSetEmployer
