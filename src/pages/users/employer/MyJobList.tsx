import DashboardLayout from "@components/DashboardLayout";
import Loading from "@components/Loading";
import { DataOutJob } from "@dataType/fetch";
import { useMyProfile } from "@provider/userProvider";
import fetchJob from "@utils/fetch/jobs";
import functionSets from "@utils/function";
import swalError from "@utils/swal/error";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const MyJobList = () => {
    const { profile } = useMyProfile()
    const [jobs, setJobs] = useState<DataOutJob[]>([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchJob.getJob({ idEmployer: profile?.employer?.id || null }).then(v => {
            setJobs(v)
        }).catch((e) => {
            if (e.status === 404) return swalError(e.status, "You don't have any job post")
            return swalError(e.status, "Cannot get data job")
        }).finally(() => setLoading(false))
    }, [])

    const deleteJob = (id: number, jobname: string) => {
        Swal.fire({
            title: `Do you want to delete ${jobname} post?`,
            showDenyButton: true,
            confirmButtonText: 'Yes, delete it',
            denyButtonText: 'No, don\'t delete',
            customClass: {
                title: "text-center font-bold text-2xl",
                actions: "w-full flex no-wrap",
                confirmButton: "w-fit my-0 mx-2 rounded-lg p-1.5 py-3",
                denyButton: "w-fit my-0 mx-2 rounded-lg p-1.5 py-3"
            }
        }).then((result) => {
            if (result.isConfirmed) {
                fetchJob.deleteJob(id).then(() => {
                    Swal.fire(`Role : ${jobname} has been deleted!`, '', 'success').finally(() => functionSets.refreshPage())
                }).catch(async (err) => {
                    console.log(err)
                    Swal.fire('Failed to delete job', '', 'error')
                }).finally(() => {
                    setLoading(false)
                })
            }
        })
    }

    if (loading) return <Loading />
    return (
        <DashboardLayout>
            <div className="flex items-center gap-x-4 mb-5 md:mb-10">
                <h1 className="text-lg md:text-2xl font-semibold">{profile?.employer?.company_name}'s Job Posts</h1>
            </div>
            <div className="overflow-x-auto w-full bg-white ">
                <div className="p-6 md:p-10 rounded-md shadow-md w-fit min-w-full">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-center text-sm md:text-base">
                                <th className="p-4 border-b">No</th>
                                <th className="p-4 border-b">Role Name</th>
                                <th className="p-4 border-b">Location</th>
                                <th className="p-4 border-b">Salary</th>
                                <th className="p-4 border-b">Job Type</th>
                                <th className="p-4 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job, index) => (
                                <tr key={job.id} className="hover:bg-gray-50">
                                    <td className="p-4 border-b text-sm md:text-base">
                                        {index + 1}
                                    </td>
                                    <td className="p-4 border-b text-sm md:text-base">
                                        {job.role}
                                    </td>
                                    <td className="p-4 border-b text-sm md:text-base">
                                        {job.location}
                                    </td>
                                    <td className="p-4 border-b text-sm md:text-base">
                                        {job.salary}
                                    </td>
                                    <td className="p-4 border-b text-sm md:text-base">
                                        {job.type_job && functionSets.capitalizeFirstLetter(job.type_job.replace("_", " "))}
                                    </td>
                                    <td className="p-4 border-b text-sm md:text-base">
                                        <div className="flex w-full justify-between gap-x-0.5">
                                            <button className="btn-primary p-1.5 rounded">Detail</button>
                                            <button onClick={() => deleteJob(job.id as number, job.role)}
                                                className="btn-danger p-1.5 rounded">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MyJobList;

