import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import DashboardLayout from "@components/DashboardLayout";
import FilterOption from "@components/FilterOption";
import ListTableLayout from "@components/ListTableLayout";
import Loading from "@components/Loading";
import NotFound from "@components/NotFound";
import Pagination from "@components/Paginations";
import FilterJobPopup from "@components/popup/FilterJobPopUp";

import { DataOutJob } from "@dataType/fetch";
import { GenderType, JobType, RoleType } from "@dataType/khusus";
import { useMyProfile } from "@provider/userProvider";
import fetchJob from "@utils/fetch/jobs";
import functionSets from "@utils/function";
import OurRoute from "@utils/route";
import swalError from "@utils/swal/error";

// Types
interface FilterSets {
    roleOrLocation?: string;
    gender?: GenderType | null;
    type_job?: JobType;
}

const ITEMS_PER_PAGE = 10;

const MyJobList = () => {
    const { profile } = useMyProfile();
    // Redirect if not employer
    if (profile?.role !== RoleType.employer) {
        return <NotFound is403={true} />;
    }
    // State management
    const [jobs, setJobs] = useState<DataOutJob[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [openFilter, setOpenFilter] = useState(false);
    const [filterSets, setFilterSets] = useState<FilterSets>({});
    // Handlers
    const handleChangeFilter = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        // Validate salary input
        if (name === "salary" && !/^\d*$/.test(value)) return;
        let parsedValue = value as any;
        if (type === 'date' && value) {
            parsedValue = functionSets.formatStringtoDate(value);
        } else if (type === 'number') {
            parsedValue = parseInt(value);
        }
        setFilterSets(prev => ({
            ...prev,
            [name as keyof DataOutJob]: parsedValue || null
        }));
    };
    const handleDeleteJob = (id: number, jobname: string) => {
        Swal.fire({
            title: `Delete ${jobname} post?`,
            icon: "warning",
            showDenyButton: true,
            confirmButtonText: 'Yes, delete it',
            denyButtonText: 'No, don\'t delete',
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                fetchJob.deleteJob(id)
                    .then(() => {
                        Swal.fire(`Role: ${jobname} has been deleted!`, '', 'success')
                            .finally(() => functionSets.refreshPage());
                    })
                    .catch(() => {
                        Swal.fire('Failed to delete job', '', 'error');
                    })
                    .finally(() => setLoading(false));
            }
        });
    };
    const handleSubmitFilter = () => {
        setSaving(true);
        fetchJob.getJobs({ ...filterSets })
            .then(res => {
                setJobs(res.reverse());
                setCurrentPage(1);
            })
            .catch(err => {
                if (err.status === 404) {
                    setJobs([]);
                }
                console.error('Filter error:', err);
            })
            .finally(() => setSaving(false));
    };

    // Pagination
    const dataPagination = functionSets.setDataPagination({
        itemsPerPage: ITEMS_PER_PAGE,
        currentPage,
        setCurrentPage,
        dataSlice: jobs
    });

    // Initial data fetch
    useEffect(() => {
        fetchJob.getJobs({ employer_id: profile?.employer?.id || null })
            .then(jobs => {
                setJobs(jobs.reverse());
            })
            .catch((error) => {
                if (error.status === 404) {
                    swalError(error.status, "You don't have any job post");
                } else {
                    swalError(error.status, "Cannot get data job");
                }
            })
            .finally(() => setLoading(false));
    }, [profile?.employer?.id]);
    if (loading) return <Loading />;
    return (
        <DashboardLayout>
            <FilterJobPopup
                isOpen={openFilter}
                onClose={() => setOpenFilter(false)}
                dataFilter={filterSets}
                setDataFilter={handleChangeFilter}
                setDataFilterNull={() => setFilterSets({})}
                submitFilter={handleSubmitFilter}
                titleName="Filter Job"
            />
            {/* Header */}
            <div className="flex items-center gap-x-4 mb-5 md:mb-10">
                <h1 className="text-lg md:text-2xl font-semibold">List Data Job</h1>
            </div>

            {/* Main Content */}
            <div className="w-full rounded bg-white">
                <FilterOption
                    filterSets={filterSets}
                    submitFilter={handleSubmitFilter}
                    setOpenPopUp={() => setOpenFilter(true)}
                    setClearFilter={() => setFilterSets({})}
                    handleChangeFilter={handleChangeFilter}
                    placeholder="Search by job name or location"
                    seacrhId="roleOrLocation"
                />

                <hr />

                <div className="flex w-full justify-between py-2 px-5 mx-auto">
                    <h2 className="text-lg font-semibold">Total Jobs: {jobs.length}</h2>
                </div>

                {/* Job Table */}
                <ListTableLayout>
                    <div className="w-full overflow-x-hidden">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2 w-fit">No</th>
                                    <th className="border p-2">Job Name</th>
                                    <th className="border p-2 w-fit">Location</th>
                                    <th className="border p-2">Type Job</th>
                                    <th className="border p-2">Status</th>
                                    <th className="border p-2">Phase</th>
                                    <th className="border p-2">Result</th>
                                    <th className="border p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!jobs ? (
                                    <tr>
                                        <td colSpan={7} className="text-center">No data job</td>
                                    </tr>
                                ) : saving ? (
                                    <tr>
                                        <td colSpan={7} className="text-center">Finding....</td>
                                    </tr>
                                ) : (
                                    dataPagination.currentData.map((job, index) => (
                                        <tr key={job.id} className="text-left">
                                            <td className="border p-2 w-fit">
                                                {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}.
                                            </td>
                                            <td className="border p-2 text-nowrap">
                                                <div className="relative inline-block group">
                                                    <a href={`${OurRoute.DataRoute["Job and Applicants"]}${job.id}`} className="hover:underline">
                                                        {job.role}
                                                    </a>
                                                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-black text-white text-sm px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
                                                        edit daftar pelamar
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border p-2 w-fit">{job.location}</td>
                                            <td className="border p-2">
                                                {job.type_job ?
                                                    functionSets.capitalizeFirstLetter(job.type_job.replace(/_/g, " "))
                                                    : ""}
                                            </td>
                                            <td
                                                className={`text-center text-white ${new Date() >= new Date(job.open_date) &&
                                                    (job.close_date === null || job.close_date === undefined || new Date(job.close_date) > new Date())
                                                    ? "bg-green-500" : "bg-red-500"}`}
                                            >
                                                {new Date() >= new Date(job.open_date) &&
                                                    (job.close_date === null || job.close_date === undefined || new Date(job.close_date) > new Date()) ?
                                                    "Open" : "Closed"
                                                }
                                            </td>
                                            <td className="border p-2">
                                                {functionSets.capitalizeFirstLetter(String(job.job_phase).replace("_", " "))}
                                            </td>
                                            <td className="border p-2 text-nowrap">
                                                {job.result ? (
                                                    <a
                                                        href={job.result}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 underline"
                                                    >
                                                        View Result
                                                    </a>
                                                ) : (
                                                    "No result yet"
                                                )}
                                            </td>
                                            <td className="border p-2">
                                                <div className="flex justify-center text-center space-x-2">
                                                    <a
                                                        className="btn-primary text-white px-5 py-1 rounded flex items-center"
                                                        href={`${OurRoute.DataRoute["Job Detail Form"]}/${job.id}`}
                                                    >
                                                        Detail
                                                    </a>
                                                    <button
                                                        onClick={() => handleDeleteJob(job.id as number, job.role)}
                                                        className="btn-danger text-white px-5 py-1 rounded flex items-center"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </ListTableLayout>
            </div>

            {/* Pagination */}
            {dataPagination.totalDataPerPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={dataPagination.totalDataPerPages}
                    onPageChange={dataPagination.handlePageChange}
                />
            )}
        </DashboardLayout>
    );
};

export default MyJobList;