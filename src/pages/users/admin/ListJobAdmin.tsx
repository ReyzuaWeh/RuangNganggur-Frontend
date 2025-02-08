import DashboardLayout from '@components/DashboardLayout';
import FilterOption from '@components/FilterOption';
import ListTableLayout from '@components/ListTableLayout';
import Loading from '@components/Loading';
import NotFound from '@components/NotFound';
import Pagination from '@components/Paginations';
import FilterJobPopup from '@components/popup/FilterJobPopUp';
import { DataOutJob } from '@dataType/fetch';
import { GenderType, JobType, RoleType } from '@dataType/khusus';
import { useMyProfile } from '@provider/userProvider';
import fetchJob from '@utils/fetch/jobs';
import fetchUser from '@utils/fetch/users';
import functionSets from '@utils/function';
import OurRoute from '@utils/route';
import swalError from '@utils/swal/error';
import { useEffect, useState } from 'react';

const ListJobbAdmin = () => {
    const { profile } = useMyProfile();
    if (profile?.role !== RoleType.admin) return <NotFound is403={true} />
    const [listCompany, setListCompany] = useState<Record<number, string> | undefined>()
    const [filterSets, setFilterSets] = useState<{
        roleOrLocation?: string,
        gender?: GenderType | null,
        type_job?: JobType | undefined,
        employer_id?: number | undefined
    }>({})
    const [openFilter, setOpenFilter] = useState(false)
    const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        let parsedValue
        if (type === 'date') {
            if (value) {
                parsedValue = functionSets.formatStringtoDate(value)
            }
            setFilterSets({ ...filterSets, [name]: parsedValue || null });
            return
        }
        parsedValue = type === 'number' ? parseInt(value) : value;
        setFilterSets({ ...filterSets, [name]: parsedValue || undefined });
    }
    const setClearFilter = () => {
        setFilterSets({})
    }
    const setOpenPopUp = () => {
        setOpenFilter(true)
    }
    const submitFilter = () => {
        setSaving(true)
        fetchJob.getJobs({ ...filterSets }).then(res => {
            setJobs(res.reverse())
            setCurrentPage(1)
        }).catch(err => {
            if (err.status === 404) {
                setJobs([])
            }
            console.log(err)
        }).finally(() => setSaving(false))
    }
    const [jobs, setJobs] = useState<DataOutJob[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const {
        totalDataPerPages: totalPages,
        currentData,
        handlePageChange
    } = functionSets.setDataPagination({ itemsPerPage, currentPage, setCurrentPage, dataSlice: jobs })
    const currentJobs = currentData as DataOutJob[];
    useEffect(() => {
        fetchUser.getUsers({ role: RoleType.employer }).then(data => {
            const newData = data.reduce((acc, curr) => {
                if (curr.employer?.id && curr.employer?.company_name) {
                    acc[curr.employer.id] = curr.employer.company_name;
                }
                return acc;
            }, {} as Record<number, string>);
            setListCompany(newData);
        }).catch(error => {
            console.error("Error fetching users:", error);
        })
        fetchJob.getJobs({}).then(v => {
            setJobs(v.reverse())
        }).catch(e => {
            swalError(e.status, "Cannot get data job")
        }).finally(() => setLoading(false))
    }, [])
    if (loading) return <Loading />
    return (
        <DashboardLayout>
            <FilterJobPopup
                isOpen={openFilter}
                onClose={() => setOpenFilter(false)}
                dataFilter={filterSets}
                setDataFilter={handleChangeFilter}
                setDataFilterNull={setClearFilter}
                submitFilter={submitFilter}
                titleName={"Filter Job"}
                companyRecord={listCompany}
            />
            <div className="flex items-center gap-x-4 mb-5 md:mb-10">
                <h1 className="text-lg md:text-2xl font-semibold">List Data Job</h1>
            </div>
            <div className="w-full rounded bg-white">
                <FilterOption
                    filterSets={filterSets}
                    submitFilter={submitFilter}
                    setOpenPopUp={setOpenPopUp}
                    setClearFilter={setClearFilter}
                    handleChangeFilter={handleChangeFilter}
                    placeholder={"Search by job name or location"}
                    seacrhId={"roleOrLocation"}
                />
                <hr />
                <div className="flex w-full justify-between py-2 px-5 mx-auto">
                    <h2 className="text-lg font-semibold">Total Jobs: {jobs.length}</h2>
                    <a href={OurRoute.DataRoute["Admin Create Job"]} className="bg-orange-400 hover:bg-orange-600 transition-colors text-white rounded py-1 px-2">Add Job</a>
                </div>
                <ListTableLayout>
                    {/* Table */}
                    <div className="w-full overflow-x-hidden">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2 w-fit">No</th>
                                    <th className="border p-2">Job Name</th>
                                    <th className="border p-2 w-fit">Location</th>
                                    <th className="border p-2">Salary</th>
                                    <th className="border p-2">Type Job</th>
                                    <th className="border p-2">Gender</th>
                                    <th className="border p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!jobs ? (
                                    <tr>
                                        <td colSpan={7} className="text-center">No data job</td>
                                    </tr>
                                ) : saving ?
                                    <tr>
                                        <td colSpan={7} className="text-center">Finding....</td>
                                    </tr>
                                    : (currentJobs.map((job) => (
                                        <tr key={job.id} className={`text-left`}>
                                            <td className="border p-2 w-fit">
                                                {(currentPage - 1) * itemsPerPage + currentJobs.indexOf(job) + 1}.
                                            </td>
                                            <td className="border p-2">{job.role}</td>
                                            <td className="border p-2 w-fit">{job.location}</td>
                                            <td className="border p-2">{functionSets.formatNumbertoIDR(job.salary)}</td>
                                            <td className="border p-2">{job.type_job ? functionSets.capitalizeFirstLetter(job.type_job.replace(/_/g, " ")) : ""}</td>
                                            <td className="border p-2">{job.gender ? functionSets.capitalizeFirstLetter(job.gender) : "All Gender"}</td>
                                            <td className="border p-2">
                                                {/* Action Buttons */}
                                                <div className="flex justify-center text-center space-x-2">
                                                    <a
                                                        className="btn-primary text-white px-5 py-1 rounded flex items-center"
                                                        href={`${OurRoute.DataRoute["Admin Detail Job"]}${job.id}`}
                                                    >
                                                        Detail
                                                    </a>
                                                    <button className="btn-danger text-white px-5 py-1 rounded flex items-center">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )))}
                            </tbody>
                        </table>
                    </div>
                </ListTableLayout>
            </div>
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </DashboardLayout>

    );
};

export default ListJobbAdmin;
