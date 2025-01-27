import fetchJob from "@/utils/fetch/jobs";
import DashboardLayout from "@components/DashboardLayout";
import { DataOutApplicant } from "@dataType/fetch";
import { RoleType, StatusAplicantType } from "@dataType/khusus";
import fetchUser from "@utils/fetch/users";
import swalError from "@utils/swal/error";
import { useEffect, useState } from "react";

const Applied = () => {
    const [applicants, setApplicants] = useState<DataOutApplicant[] | null>([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from API
    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const getMe = await fetchUser.getProfile()
                if (getMe.role !== RoleType.jobseeker) {
                    const error = new Error("You don't have access");
                    (error as any).status = 403;
                    throw error
                }
                const getApplicants = await fetchJob.getApplicant({ userId: getMe.jobseeker?.id || null })
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

    const getStatusColor = (status: StatusAplicantType) => {
        switch (status.toLowerCase()) {
            case "approved":
            case "accepted":
                return "bg-green-100 text-green-700";
            case "rejected":
                return "bg-red-100 text-red-700";
            case "process":
            case "pending":
                return "bg-yellow-100 text-yellow-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <DashboardLayout>
            <div className="flex items-center gap-x-4 mb-5 md:mb-10">
                <h1 className="text-lg md:text-2xl font-semibold">Your Job Applied</h1>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-md shadow-md">
                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left text-sm md:text-base">
                                <th className="p-4 border-b">Job ID</th>
                                <th className="p-4 border-b">Jobseeker ID</th>
                                <th className="p-4 border-b">Job Letter</th>
                                <th className="p-4 border-b">Status</th>
                                <th className="p-4 border-b">Applied At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!applicants && (
                                <tr>
                                    <td colSpan={5} className="text-center">You don't have apply data</td>
                                </tr>
                            )}
                            {applicants && applicants.map((applicant: DataOutApplicant) => (
                                <tr key={applicant.id} className="hover:bg-gray-50">
                                    <td className="p-4 border-b text-sm md:text-base">
                                        {applicant.job_id}
                                    </td>
                                    <td className="p-4 border-b text-sm md:text-base">
                                        {applicant.jobseeker_id}
                                    </td>
                                    <td className="p-4 border-b text-sm md:text-base">
                                        <a
                                            href={
                                                applicant.jobletter || "#"
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 underline"
                                        >
                                            View Letter
                                        </a>
                                    </td>
                                    <td
                                        className={`p-4 border-b text-sm md:text-base ${getStatusColor(
                                            applicant.status
                                        )}`}
                                    >
                                        {applicant.status}
                                    </td>
                                    <td className="p-4 border-b text-sm md:text-base">
                                        {new Date(applicant.applied_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Applied;
