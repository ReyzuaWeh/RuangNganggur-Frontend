import DashboardLayout from "@components/DashboardLayout";
import Loading from "@components/Loading";
import { useMyProfile } from "@components/provider/userProvider";
import { DataOutJob } from "@dataType/fetch";
import fetchJob from "@utils/fetch/jobs";
import functionSets from "@utils/function";
import swalError from "@utils/swal/error";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";

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
    if (loading) return <Loading />
    return (
        <DashboardLayout>
            <div className="flex items-center gap-x-4 mb-5 md:mb-10">
                <NavLink to="/" className="hover:bg-gray-300 rounded-full p-3 md:p-4">
                    <FaArrowLeft size={20} className="cursor-pointer md:size-25" />
                </NavLink>
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
                                            <button className="btn-danger p-1.5 rounded">Delete</button>
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

