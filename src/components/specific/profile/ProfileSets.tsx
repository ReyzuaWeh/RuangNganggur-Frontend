import ProfileSetAdmin from "@components/admin/ProfileSetAdmin";
import ProfileSetEmployer from "@components/employer/ProfileSetEmployer";
import ProfileSetJobSeeker from "@components/jobseeker/ProfileSetJobSeeker";
import { RoleType } from "@dataType/khusus";
import { useMyProfile } from "@provider/userProvider";
const ProfileSets = () => {
    const { profile: dataProfile } = useMyProfile();
    return (
        <>
            {
                dataProfile?.role === RoleType.jobseeker &&
                <ProfileSetJobSeeker />
            }
            {
                dataProfile?.role === RoleType.employer &&
                <ProfileSetEmployer />
            }
            {
                dataProfile?.role === RoleType.admin &&
                <ProfileSetAdmin />
            }
        </>
    )
}
export default ProfileSets
