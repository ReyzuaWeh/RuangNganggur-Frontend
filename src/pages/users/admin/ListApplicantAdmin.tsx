import FilterApplicantPopup from '@/components/popup/FilterApplicantPopUp';
import DashboardLayout from '@components/DashboardLayout';
import FilterOption from '@components/FilterOption';
import ListTableLayout from '@components/ListTableLayout';
import Loading from '@components/Loading';
import NotFound from '@components/NotFound';
import Pagination from '@components/Paginations';
import { DataOutApplicant, DataOutJob } from '@dataType/fetch';
import { RoleType } from '@dataType/khusus';
import { useMyProfile } from '@provider/userProvider';
import fetchJob from '@utils/fetch/jobs';
import fetchUser from '@utils/fetch/users';
import functionSets from '@utils/function';
import OurRoute from '@utils/route';
import swalError from '@utils/swal/error';
import swalSuccess from '@utils/swal/success';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ListAplicantAdmin = () => {
    const { profile } = useMyProfile();
    if (profile?.role !== RoleType.admin) return <NotFound is403={true} />
    const [listApplier, setListApplier] = useState<Record<number, string> | undefined>()
    const [listEmployerName, setListEmployerName] = useState<Record<number, string> | undefined>()
    const [filterSets, setFilterSets] = useState<{
        jobseeker_id?: number | undefined,
        employer_id?: number | undefined,
        search_applier_or_job?: string | undefined,
        with_detail?: boolean
    }>({
        with_detail: true
    })
    const [openFilter, setOpenFilter] = useState(false)
    const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (!/^\d*$/.test(value) && name === "salary") return
        let parsedValue
        if (type === 'date' && value) parsedValue = functionSets.formatStringtoDate(value)
        parsedValue = type === 'number' ? parseInt(value) : value;
        setFilterSets({ ...filterSets, [name as keyof DataOutJob]: parsedValue || null });
    };
    const setClearFilter = () => {
        setFilterSets({ with_detail: true })
    }
    const setOpenPopUp = () => {
        setOpenFilter(true)
    }
    const submitFilter = () => {
        setSaving(true)
        fetchJob.getApplicant({ ...filterSets }).then(res => {
            setApplicants(res.reverse())
            setCurrentPage(1)
        }).catch(err => {
            if (err.status === 404) {
                setApplicants([])
            }
            console.log(err)
        }).finally(() => setSaving(false))
    }
    const [applicants, setApplicants] = useState<DataOutApplicant[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const {
        totalDataPerPages: totalPages,
        currentData,
        handlePageChange
    } = functionSets.setDataPagination({ itemsPerPage, currentPage, setCurrentPage, dataSlice: applicants })
    const currentJobs = currentData as DataOutApplicant[];
    const handleDelete = async (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetchJob.deleteApplicant(id).then(() => {
                    swalSuccess({ title: "Deleted", message: "Applicant has been deleted" }).finally(() => window.location.reload())
                }).catch(err => {
                    swalError(err.status, "Cannot delete applicant")
                })
            }
        })

    }
    useEffect(() => {
        fetchUser.getUsers({}).then(data => {
            const newDataJobseeker = data.reduce((acc, curr) => {
                if (curr.jobseeker?.id && curr.jobseeker?.first_name) {
                    acc[curr.jobseeker.id] = curr.jobseeker.first_name + (curr.jobseeker?.last_name && ` ${curr.jobseeker?.last_name}` || "");
                }
                return acc;
            }, {} as Record<number, string>);
            const newDataEmployer = data.reduce((acc, curr) => {
                if (curr.employer?.id && curr.employer?.company_name) {
                    acc[curr.employer.id] = curr.employer.company_name;
                }
                return acc;
            }, {} as Record<number, string>);
            console.log(newDataEmployer)
            setListEmployerName(newDataEmployer);
            setListApplier(newDataJobseeker);
        }).catch(error => {
            console.error("Error fetching users:", error);
        })
        fetchJob.getApplicant({ with_detail: true }).then(v => {
            setApplicants(v.reverse())
        }).catch(e => {
            swalError(e.status, "Cannot get data applicant")
        }).finally(() => setLoading(false))
    }, [])
    if (loading) return <Loading />
    return (
        <DashboardLayout>
            <FilterApplicantPopup
                isOpen={openFilter}
                onClose={() => setOpenFilter(false)}
                dataFilter={filterSets}
                setDataFilter={handleChangeFilter}
                setDataFilterNull={setClearFilter}
                submitFilter={submitFilter}
                titleName={"Filter Applicant"}
                applierRecord={listApplier}
                employerRecord={listEmployerName}
            />
            <div className="flex items-center gap-x-4 mb-5 md:mb-10">
                <h1 className="text-lg md:text-2xl font-semibold">List Data Applicant</h1>
            </div>
            <div className="w-full rounded bg-white">
                <FilterOption
                    filterSets={filterSets}
                    submitFilter={submitFilter}
                    setOpenPopUp={setOpenPopUp}
                    setClearFilter={setClearFilter}
                    handleChangeFilter={handleChangeFilter}
                    placeholder={"Search by job name or applier name"}
                    seacrhId={"search_applier_or_job"}
                />
                <hr />
                <div className="flex w-full md:flex-row flex-col md:items-baseline items-end justify-between py-2 px-5 mx-auto">
                    <h2 className="text-lg font-semibold">Total: {applicants.length}</h2>
                    <a href={OurRoute.DataRoute["Admin Create Applicant"]}
                        className="bg-orange-400 hover:bg-orange-600 w-fit transition-colors text-white rounded py-1 px-2"
                    >Add</a>
                </div>
                <ListTableLayout>
                    {/* Table */}
                    <div className="w-full overflow-x-hidden">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead className='text-nowrap'>
                                <tr className="bg-gray-200">
                                    <th className="border p-2 w-fit">No</th>
                                    <th className="border p-2">Job Name</th>
                                    <th className="border p-2 w-fit">Applier Name</th>
                                    <th className="border p-2">Job Letter</th>
                                    <th className="border p-2 w-fit">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!applicants ? (
                                    <tr>
                                        <td colSpan={5} className="text-center">No data job</td>
                                    </tr>
                                ) : saving ?
                                    <tr className='text-nowrap'>
                                        <td colSpan={5} className="text-center">Finding....</td>
                                    </tr>
                                    : (currentJobs.map((applicant) => (
                                        <tr key={applicant.id} className={`text-left text-nowrap`}>
                                            <td className="border p-2 w-fit">
                                                {(currentPage - 1) * itemsPerPage + currentJobs.indexOf(applicant) + 1}.
                                            </td>
                                            <td className="border p-2">{applicant.job?.role}</td>
                                            <td className="border p-2 w-fit">
                                                {applicant.jobseeker?.first_name + " " + (applicant.jobseeker?.last_name || "")}
                                            </td>
                                            <td className="border p-2">
                                                {applicant.jobletter ? (
                                                    <a className="text-primary font-semibold" href={applicant.jobletter} target="_blank">
                                                        View letter
                                                    </a>
                                                ) : "Didn't send any letter"}
                                            </td>
                                            <td className="border p-2 w-fit">
                                                {/* Action Buttons */}
                                                <div className="flex justify-center text-center space-x-2">
                                                    <a
                                                        className="btn-primary text-white px-5 py-1 rounded flex items-center"
                                                        href={`${OurRoute.DataRoute["Admin Detail Applicant"]}${applicant.id}`}
                                                    >
                                                        Detail
                                                    </a>
                                                    <button
                                                        onClick={() => handleDelete(applicant.id as number)}
                                                        className="btn-danger text-white px-5 py-1 rounded flex items-center"
                                                    >
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

export default ListAplicantAdmin;
