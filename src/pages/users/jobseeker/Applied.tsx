import DashboardLayout from "@components/DashboardLayout";
import JobDetail from "@components/JobDetail";
import Loading from "@components/Loading";
import { DataOutApplicant } from "@dataType/fetch";
import { RoleType } from "@dataType/khusus";
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
    const [applicants, setApplicants] = useState<DataOutApplicant[] | null>([]);
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

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
                setApplicants(getApplicants);
                setLoading(false)
            } catch (e) {
                console.log(e)
                // @ts-ignore
                if (e.status === 404) {
                    setLoading(false)
                    return setApplicants(null)
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
                    <table className="w-full border-fixed">
                        <thead>
                            <tr className="bg-gray-100 text-nowrap text-center text-sm md:text-base">
                                <th className="p-4 w-fit border-b">No</th>
                                <th className="p-4 w-1/2 border-b">Job Name</th>
                                <th className="p-4 w-fit border-b">Job Letter</th>
                                <th className="p-4 w-fit border-b">Applied At</th>
                                <th className="p-4 border-b">Status</th>
                                <th className="p-4 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!applicants && (
                                <tr>
                                    <td colSpan={5} className="text-center">You don't have apply data</td>
                                </tr>
                            )}
                            {applicants && applicants.map((applicant: DataOutApplicant, index) => (
                                <tr key={applicant.id} className="hover:bg-gray-50">
                                    <td className="p-4 text-nowrap border-b text-sm md:text-base">
                                        {index + 1}
                                    </td>
                                    <td className="p-4 text-nowrap border-b text-sm md:text-base">
                                        {applicant.job?.role}
                                    </td>
                                    <td className="p-4 text-nowrap border-b text-sm md:text-base">
                                        {!applicant.jobletter ? "You don't send any letter" : (<a
                                            href={applicant.jobletter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 underline"
                                        >
                                            View Letter
                                        </a>)}
                                    </td>
                                    <td className="p-4 text-nowrap border-b text-sm md:text-base">
                                        {functionSets.DateToString(applicant.applied_at)}
                                    </td>
                                    <td
                                        className={`p-4 text-nowrap text-center border-b text-sm md:text-base ${getStatusColor(
                                            applicant.status
                                        )}`}
                                    >
                                        {functionSets.capitalizeFirstLetter(applicant.status)}
                                    </td>
                                    <td className="p-4 text-nowrap border-b text-sm md:text-base">
                                        <button
                                            onClick={() => {
                                                setSelectedJobId(applicant.job?.id as number)
                                            }}
                                            className="bg-primary mx-1 text-white p-1 rounded-lg hover:bg-primary-dark"
                                        >
                                            Detail
                                        </button>
                                        <button
                                            className="btn-danger mx-1 text-white p-1 rounded-lg hover:bg-primary-dark"
                                            onClick={() => handleDelete(applicant.id as number, applicant.job?.role as string)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {selectedJobId && (<JobDetail job_id={selectedJobId} onClose={() => setSelectedJobId(null)} />)}

                </div>
            </div>
        </DashboardLayout>
    );
};

export default Applied;
