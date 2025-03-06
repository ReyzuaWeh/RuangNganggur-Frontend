import DashboardLayout from "@components/DashboardLayout";
import Loading from "@components/Loading";
import NotFound from "@components/NotFound";
import Pagination from "@components/Paginations";
import ValidationComponents from "@components/ValidationError";
import { DataOutApplicant, DataOutJob, ErrorValidation } from "@dataType/fetch";
import { JobPhase, JobType, RoleType, StatusAplicantType } from "@dataType/khusus";
import { useMyProfile } from "@provider/userProvider";
import fetchJob from "@utils/fetch/jobs";
import functionSets from "@utils/function";
import OurRoute from "@utils/route";
import swalError from "@utils/swal/error";
import swalSuccess from "@utils/swal/success";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStatusColor } from "./ApplyStatusColor";

const JobAndApplicants = () => {
    const { id } = useParams();
    const { profile } = useMyProfile()
    if (profile?.role === RoleType.jobseeker) return <NotFound is403={true} />
    const [saving, setSaving] = useState(false)
    const [Job, SetJob] = useState<DataOutJob>({
        role: "",
        location: "",
        salary: 0,
        type_job: JobType.full_time,
        min_age: 0,
        max_age: 0,
        gender: null,
        open_date: new Date(),
        close_date: null,
        description: "",
    })
    const [loading, setLoading] = useState(true)
    const [is403, setIs403] = useState(false)
    const [error_validation, setError_validation] = useState<ErrorValidation | undefined>(undefined);
    const handlFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        const { name } = e.target;
        if (!file) {
            SetJob((prev) => ({ ...prev, [name + "_file"]: null, [name + "_name"]: null }));
            return;
        }
        const base64String = await functionSets.getBase64(file);
        SetJob((prev) => ({
            ...prev,
            [name + "_file"]: base64String,
            [name + "_name"]: file.name,
        }));
    };
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6
    const {
        totalDataPerPages: totalPages,
        currentData,
        handlePageChange
    } = functionSets.setDataPagination({ itemsPerPage, currentPage, setCurrentPage, dataSlice: Job.applicants || [] })
    const handleAllStatus = (status: StatusAplicantType) => {
        SetJob({
            ...Job,
            applicants: Job.applicants?.map(e => ({ ...e, status: status }))
        })
    }
    const currentApplicants = currentData as DataOutApplicant[]
    const handleApplicants = (id: number, select: React.ChangeEvent<HTMLSelectElement>) => {
        if (!id) return
        if (Job.applicants) {
            const updatedApplicants = Job.applicants.map((applicant) =>
                applicant.id === id ? { ...applicant, status: select.target.value as StatusAplicantType } : applicant
            );
            SetJob({
                ...Job,
                applicants: updatedApplicants
            });
        }
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        fetchJob.updateJob({ id: Job.id as number, dataUpdate: Job }).then(() => {
            setError_validation(undefined);
            swalSuccess({
                title: "Update Success",
                message: "Job and applicants has been successfully updated"
            })
        }).catch(async (error) => {
            if (functionSets.isBadOrConflictRequest(error.status) || error.status === 404) {
                const data = await error.json()
                swalError(error.status, "Input not valid!")
                setError_validation(data);
            }
            console.error("Error updating job and its applicant");
        }).finally(() => setSaving(false));
    }
    useEffect(() => {
        if (!id) return
        if (!isNaN(Number(id))) {
            const FetchData = async () => {
                try {
                    setLoading(true)
                    const job = await fetchJob.getJob(Number(id))
                    if (job.employer_id !== profile?.employer?.id && profile?.role !== RoleType.admin) {
                        const error = new Error("You are not authorized to access this job") as any
                        error.status = 403
                        throw error
                    }
                    SetJob({
                        ...job,
                    })
                    const applicants = await fetchJob.getApplicant({ jobId: job.id, with_detail: true })
                    SetJob({
                        ...job,
                        applicants: applicants
                    })
                    setLoading(false)
                } catch (err) {
                    setLoading(false)
                    const errorAny = err as any
                    if (errorAny.status === 403) {
                        setIs403(true)
                        return swalError(errorAny.status, "You are not authorized to access this job")
                    }
                    if (errorAny.status === 404) {
                        return
                    }
                    swalError(errorAny.status, "Cannot get data job");
                }
            }
            FetchData()
        }
    }, [id])
    if (is403) return <NotFound is403={true} />
    if (loading) return <Loading />
    if (!Job.id) return <NotFound />
    return (
        <DashboardLayout >
            {/* Header */}
            <h1 className="text-xl md:text-3xl font-bold flex justify-between mb-4">
                Job's Applier
            </h1>

            {/* Job Name Section */}
            <div className="bg-primary p-4 rounded-lg flex overflow-hidden flex-col md:flex-row justify-between items-center">
                <span className="font-semibold text-accents text-lg">{Job?.role || "Job"}</span>
                <select
                    className="bg-white w-full md:w-fit text-primary p-2 rounded-md mt-2 md:mt-0"
                    value={Job.job_phase || ""}
                    onChange={(e) => {
                        console.log(Job.result)
                        SetJob({ ...Job, job_phase: e.target.value as JobPhase })
                    }}
                >
                    <option value="">Job Phase</option>
                    {Object.entries(JobPhase).map(([key, value]) => (
                        <option key={key} value={value}>{functionSets.capitalizeFirstLetter(value.replace("_", " "))}</option>
                    ))}
                </select>
            </div>

            {/* Applicant Result */}
            <form className="border bg-white rounded-lg p-4 mt-4 shadow-md" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    {/* Bagian Applicant Result */}
                    <div className="flex flex-col md:flex-row items-center gap-2">
                        <label htmlFor="" className="font-semibold text-base">Applied Result:</label>
                        <div className="relative">
                            <input
                                onChange={handlFileChange}
                                id="result"
                                name="result"
                                type="file"
                                className="block w-full text-sm p-1 text-gray-900 bg-white border border-gray-300 rounded cursor-pointer focus:outline-none"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                {Job?.result ? (
                                    <a
                                        className="text-blue-500 underline" href={Job?.result || ""} target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Result
                                    </a>
                                ) : "No file attached"}
                            </p>
                        </div>
                    </div>

                    {/* Bagian Total Candidate */}
                    <div className="bg-gray-100 px-4 py-2 rounded-lg">
                        <span className="font-semibold text-base">Candidate: </span>
                        <span className="text-gray-700">{Job.applicants?.length || 0}</span>
                    </div>
                </div>
                {/* Status Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    <button
                        type="button"
                        className="bg-yellow-500 text-white p-2 rounded-md text-xs font-medium w-full"
                        onClick={() => handleAllStatus(StatusAplicantType.process)}
                    >
                        Process
                    </button>
                    <button
                        type="button"
                        className="bg-orange-500 text-white p-2 rounded-md text-xs font-medium w-full"
                        onClick={() => handleAllStatus(StatusAplicantType.hold)}
                    >
                        Hold
                    </button>
                    <button
                        type="button"
                        className="bg-red-500 text-white p-2 rounded-md text-xs font-medium w-full"
                        onClick={() => handleAllStatus(StatusAplicantType.rejected)}
                    >
                        Rejected
                    </button>
                    <button
                        type="button"
                        className="bg-green-500 text-white p-2 rounded-md text-xs font-medium w-full"
                        onClick={() => handleAllStatus(StatusAplicantType.accepted)}
                    >
                        Accepted
                    </button>
                </div>

                {/* Applicant List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {!Job.applicants ? <div className="w-full col-span-1 md:col-span-2 lg:col-span-3 flex justify-center">No applier yet</div> : currentApplicants.map((applicant, index) => (
                        <div
                            key={index}
                            className="border border-primary rounded-lg p-4 bg-gray-50 shadow-sm"
                        >
                            <p className="font-semibold">
                                <a href={`${OurRoute.DataRoute["Detail User"]}${applicant.jobseeker_id}?jobseeker=true`} target="_blank">
                                    {applicant.jobseeker?.first_name as string + (applicant.jobseeker?.last_name ? ` ${applicant.jobseeker?.last_name}` : "")}
                                </a>
                            </p>
                            <p className="text-gray-600">
                                Job Letter :{" "}
                                {!applicant.jobletter ? (
                                    "Didn't send any letter"
                                ) : (
                                    <a
                                        href={applicant.jobletter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        View Letter
                                    </a>
                                )}
                            </p>
                            <select
                                // className="w-full p-2 mt-2 border rounded-md"
                                className={`p-2 rounded-md focus:outline-none w-full ${getStatusColor(applicant.status)}`}
                                value={applicant.status}
                                onChange={(e) => handleApplicants(applicant.id || 0, e)}
                            >
                                <option value={""}>Applier Status</option>
                                {Object.values(StatusAplicantType).map((status) => (
                                    <option key={status} value={status}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
                {error_validation && <ValidationComponents errorValid={error_validation} />}
                {/* Pagination & Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                    <div className="flex space-x-4 w-full py-2 sm:w-auto">
                        <button
                            className="bg-orange-500 text-white p-2 rounded-md w-full sm:w-auto"
                            disabled={saving}
                            type="button"
                            onClick={() => {
                                window.history.back()
                            }}
                        >
                            Back
                        </button>
                        <button
                            className="bg-green-500 text-white p-2 rounded-md w-full sm:w-auto"
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>
            </form>
        </DashboardLayout>
    );
}
export default JobAndApplicants