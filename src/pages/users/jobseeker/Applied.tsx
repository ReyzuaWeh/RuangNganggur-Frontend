import DashboardLayout from "@components/DashboardLayout";
import JobDetail from "@components/JobDetail";
import Loading from "@components/Loading";
import NotFound from "@components/NotFound";
import Pagination from "@components/Paginations";
import { DataOutApplicant } from "@dataType/fetch";
import { RoleType, StatusAplicantType } from "@dataType/khusus";
import { getStatusColor } from "@pages/ApplyStatusColor";
import { useMyProfile } from "@provider/userProvider";
import fetchJob from "@utils/fetch/jobs";
import functionSets from "@utils/function";
import swalError from "@utils/swal/error";
import swalSuccess from "@utils/swal/success";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Applied = () => {
    const { profile } = useMyProfile()
    if (profile?.role !== RoleType.jobseeker) return <NotFound is403={true} />
    const [applicants, setApplicants] = useState<DataOutApplicant[]>([]);
    const [currentApplicant, setCurrentApplicant] = useState<DataOutApplicant | null>(null);
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const dataPagination = functionSets.setDataPagination({
        itemsPerPage: 6,
        currentPage,
        setCurrentPage,
        dataSlice: applicants
    })
    const currentApplicants = dataPagination.currentData as DataOutApplicant[]

    // Fetch data from API
    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                if (profile?.role !== RoleType.jobseeker) {
                    const error = new Error("You don't have access");
                    (error as any).status = 403;
                    throw error
                }
                const getApplicants = await fetchJob.getApplicant({ jobseeker_id: profile.jobseeker?.id || null, with_detail: true })
                setApplicants(getApplicants.reverse());
                setLoading(false)
            } catch (e) {
                console.log(e)
                // @ts-ignore
                if (e.status === 404) {
                    setLoading(false)
                    return setApplicants([])
                }
                // @ts-ignore
                swalError(e.status, "Can't get data applicant")
            }
        }
        getData()
    }, []);
    const handleDelete = (id: number, applicant_name: string) => {
        Swal.fire({
            title: `Do you want to delete applied at ${applicant_name || "this"} post?`,
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
                fetchJob.deleteApplicant(id).then(() => {
                    swalSuccess({
                        title: "Delete Applicant Success",
                        message: "Your applicant has been successfully deleted"
                    })
                    const newApplicants = applicants?.filter(applicant => applicant.id !== id);
                    setApplicants(newApplicants as DataOutApplicant[]);
                }).catch(err => {
                    swalError(err.status, "Can't delete applicant")
                })
            }
        })
    }

    return loading ? (
        <Loading />
    ) : (
        <DashboardLayout>
            <div className="w-full">
                <div className="flex items-center gap-x-4 mb-5 md:mb-10">
                    <h1 className="text-lg md:text-2xl font-semibold">Your Job Applied</h1>
                </div>
                <div className="bg-white p-6 md:p-10 rounded-md shadow-md w-full overflow-x-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {!applicants ? (
                            <div className="text-center p-4 border rounded-lg">
                                You don't have apply data
                            </div>
                        ) : (
                            currentApplicants.map((applicant: DataOutApplicant, index) => (
                                <div
                                    key={applicant.id}
                                    className="bg-white border rounded-lg shadow p-4 hover:shadow-lg"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="text-xl font-semibold">
                                            #{(currentPage - 1) * 6 + index + 1} - {applicant.job?.role}
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    setCurrentApplicant(applicant)
                                                    setSelectedJobId(applicant.job?.id as number)
                                                }}
                                                className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark"
                                            >
                                                Detail
                                            </button>
                                            {applicant.status === StatusAplicantType.process && <button
                                                className="btn-danger text-white px-3 py-1 rounded hover:bg-primary-dark"
                                                onClick={() =>
                                                    handleDelete(applicant.id as number, applicant.job?.role as string)
                                                }
                                            >
                                                Cancel
                                            </button>}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div>
                                            <span className="font-medium">Job Letter: </span>
                                            {!applicant.jobletter ? (
                                                "You don't send any letter"
                                            ) : (
                                                <a
                                                    href={applicant.jobletter}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 underline ml-1"
                                                >
                                                    View Letter
                                                </a>
                                            )}
                                        </div>
                                        <div>
                                            <span className="font-medium">Job Phase: </span>
                                            {functionSets.capitalizeFirstLetter(
                                                applicant.job?.job_phase.replace("_", " ") as string
                                            )}
                                        </div>
                                        <div>
                                            <span className="font-medium">Apply Result: </span>
                                            {applicant.job?.result ? (
                                                <a
                                                    href={applicant.job?.result}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 underline ml-1"
                                                >
                                                    View Result
                                                </a>
                                            ) : applicant.status === StatusAplicantType.accepted ||
                                                applicant.status === StatusAplicantType.rejected ? (
                                                "No Result Document"
                                            ) : (
                                                "No result yet"
                                            )}
                                        </div>
                                        <div>
                                            <span className="font-medium">Applied At: </span>
                                            {functionSets.DateToString(applicant.applied_at)}
                                        </div>
                                        <div className={`text-center font-medium ${getStatusColor(applicant.status)}`}>
                                            {functionSets.capitalizeFirstLetter(applicant.status)}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {dataPagination.totalDataPerPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={dataPagination.totalDataPerPages}
                            onPageChange={dataPagination.handlePageChange}
                        />
                    )}
                    {selectedJobId && (<JobDetail job_id={selectedJobId} applicant_data={currentApplicant} onClose={() => setSelectedJobId(null)} />)}

                </div>
            </div>
        </DashboardLayout>
    );
};

export default Applied;
