import DashboardLayout from "@components/DashboardLayout";
import ListTableLayout from "@components/ListTableLayout";
import Loading from "@components/Loading";
import NotFound from "@components/NotFound";
import Pagination from "@components/Paginations";
import { DataOutJob } from "@dataType/fetch";
import { RoleType } from "@dataType/khusus";
import { useMyProfile } from "@provider/userProvider";
import fetchJob from "@utils/fetch/jobs";
import functionSets from "@utils/function";
import OurRoute from "@utils/route";
import swalError from "@utils/swal/error";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const MyJobList = () => {
    const { profile } = useMyProfile()
    if (profile?.role !== RoleType.employer) return <NotFound />
    const [jobs, setJobs] = useState<DataOutJob[]>([])
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const dataPagination = functionSets.setDataPagination({
        itemsPerPage,
        currentPage,
        setCurrentPage,
        dataSlice: jobs
    })
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
    useEffect(() => {
        fetchJob.getJobs({ idEmployer: profile?.employer?.id || null }).then(v => {
            setJobs(v.reverse())
        }).catch((e) => {
            if (e.status === 404) return swalError(e.status, "You don't have any job post")
            return swalError(e.status, "Cannot get data job")
        }).finally(() => setLoading(false))
    }, [])
    if (loading) return <Loading />
    return (
        <DashboardLayout>
            <div className="flex items-center gap-x-4 mb-5 md:mb-10">
                <h1 className="text-lg md:text-2xl font-semibold">{profile?.employer?.company_name}'s Job Posts</h1>
            </div>
            <div className="bg-white rounded">
                <ListTableLayout>
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
                            {!jobs ? (
                                <tr className="hover:bg-gray-50">
                                    <td colSpan={6} className="p-4 border-b text-center text-sm md:text-base">
                                        No data
                                    </td>
                                </tr>
                            ) : dataPagination.currentData.map((job, index) => (
                                <tr key={job.id} className="hover:bg-gray-50">
                                    <td className="p-4 border-b text-sm text-nowrap md:text-base">
                                        {(currentPage - 1) * dataPagination.totalDataPerPages + index + 1}
                                    </td>
                                    <td className="p-4 border-b text-sm text-nowrap md:text-base">
                                        {job.role}
                                    </td>
                                    <td className="p-4 border-b text-sm text-nowrap md:text-base">
                                        {job.location}
                                    </td>
                                    <td className="p-4 border-b text-sm text-nowrap md:text-base">
                                        {functionSets.formatNumbertoIDR(job.salary)}
                                    </td>
                                    <td className="p-4 border-b text-sm text-nowrap md:text-base">
                                        {job.type_job && functionSets.capitalizeFirstLetter(job.type_job.replace("_", " "))}
                                    </td>
                                    <td className="p-4 border-b text-sm text-nowrap md:text-base">
                                        <div className="flex w-full justify-between gap-x-0.5">
                                            <a href={`${OurRoute.DataRoute["Job Detail Form"]}/${job.id || ""}`} className="btn-primary p-1.5 rounded">
                                                <button>Detail</button>
                                            </a>
                                            <button onClick={() => deleteJob(job.id as number, job.role)}
                                                className="btn-danger p-1.5 rounded">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ListTableLayout>
                {dataPagination.totalDataPerPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={dataPagination.totalDataPerPages}
                        onPageChange={dataPagination.handlePageChange}
                    />
                )}
            </div>
        </DashboardLayout>
    );
};

export default MyJobList;

