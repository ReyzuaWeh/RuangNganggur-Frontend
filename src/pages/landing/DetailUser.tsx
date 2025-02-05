import DashboardLayout from "@components/DashboardLayout";
import DataAbout from "@components/employer/DataAbout";
import DataMainEmployerProfile from "@components/employer/DataMainEmployerProfile";
import DataMiddleEmployer from "@components/employer/DataMiddleEmployer";
import DataMiddleJobSeeker from "@components/jobseeker/DataMiddleJobSeeker";
import DataSkills from "@components/jobseeker/DataSkills";
import MainProfile from "@components/jobseeker/MainProfile";
import NotFound from "@components/NotFound";
import { DataOutUser } from "@dataType/fetch";
import { RoleType } from "@dataType/khusus";
import fetchUser from "@utils/fetch/users";
import swalError from "@utils/swal/error";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState<DataOutUser | null>(null)
    const [notFound, setNotFound] = useState(false)
    useEffect(() => {
        if (!id) return
        if (!isNaN(Number(id))) {
            fetchUser.getUser(parseInt(id)).then(e => {
                if (e.role === RoleType.admin) {
                    setNotFound(true)
                    swalError(403, "Cannot get data user", "", true)
                }
                setUser(e)
            }).catch(err => {
                swalError(err.status, "Cannot get data user")
            })
        }
    }, [id])
    if (notFound) return <NotFound />
    return (
        user && (<DashboardLayout>
            {user.role === RoleType.jobseeker && (
                <>
                    <MainProfile
                        view_only={true}
                        user={user}
                    />
                    <DataMiddleJobSeeker
                        view_only={true}
                        user={user}
                    />
                    <DataSkills
                        view_only={true}
                        user={user}
                    />
                </>
            )}
            {user.role === RoleType.employer && (
                <>
                    <DataMainEmployerProfile
                        view_only={true}
                        user={user}
                    />
                    <DataMiddleEmployer
                        view_only={true}
                        user={user}
                    />
                    <DataAbout
                        view_only={true}
                        user={user}
                    />
                </>
            )}
        </DashboardLayout>)
    )
}
export default DetailUser