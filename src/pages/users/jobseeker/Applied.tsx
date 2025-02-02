import DashboardLayout from "@components/DashboardLayout";
import Loading from "@components/Loading";
import { DataOutApplicant } from "@dataType/fetch";
import { RoleType } from "@dataType/khusus";
import { getStatusColor } from "@pages/ApplyStatusColor";
import { useMyProfile } from "@provider/userProvider";
import fetchJob from "@utils/fetch/jobs";
import functionSets from "@utils/function";
import swalError from "@utils/swal/error";
import { useEffect, useState } from "react";

const Applied = () => {
    const { profile } = useMyProfile()
    const [applicants, setApplicants] = useState<DataOutApplicant[] | null>([]);
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
                const getApplicants = await fetchJob.getApplicant({ jobseeker_id: profile.jobseeker?.id || null })
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

    return loading ? (
        <Loading />
    ) : (
        <DashboardLayout>
            <div className="flex items-center gap-x-4 mb-5 md:mb-10">
                <h1 className="text-lg md:text-2xl font-semibold">Your Job Applied</h1>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-md shadow-md overflow-x-auto">
                <table className="w-full border-fixxed">
                    <thead>
                        <tr className="bg-gray-100 text-nowrap text-center text-sm md:text-base">
                            <th className="p-4 w-fit border-b">No</th>
                            <th className="p-4 w-1/2 border-b">Job Name</th>
                            <th className="p-4 w-fit border-b">Job Letter</th>
                            <th className="p-4 w-fit border-b">Applied At</th>
                            <th className="p-4 border-b">Status</th>
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
                                    {applicant.job_id}
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
                                    className={`p-4 text-nowrap border-b text-sm md:text-base ${getStatusColor(
                                        applicant.status
                                    )}`}
                                >
                                    {functionSets.capitalizeFirstLetter(applicant.status)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
};

export default Applied;
