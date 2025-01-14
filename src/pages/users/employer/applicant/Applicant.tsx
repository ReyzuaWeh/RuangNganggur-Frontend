import { DataOutApplicant } from "@/dataType/fetch";
import DashboardLayout from "@components/DashboardLayout";
import { StatusAplicantType } from "@dataType/khusus";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Applicant = () => {
    const [applicants, setApplicants] = useState<DataOutApplicant[]>([
        {
            id: 1,
            jobseeker_id: 11,
            job_id: 22,
            jobletter: "https://example.com/job-letter.pdf",
            status: "process" as StatusAplicantType,
            applied_at: new Date(),
        },
        {
            id: 2,
            jobseeker_id: 12,
            job_id: 23,
            jobletter: "https://example.com/job-letter.pdf",
            status: "accepted" as StatusAplicantType,
            applied_at: new Date(),
        },
        {
            id: 3,
            jobseeker_id: 13,
            job_id: 24,
            jobletter: "https://example.com/job-letter.pdf",
            status: "rejected" as StatusAplicantType,
            applied_at: new Date(),
        },
    ]);

    const getStatusColor = (status: StatusAplicantType) => {
        switch (status) {
            case "accepted":
                return "bg-green-100 text-green-700";
            case "hold":
                return "bg-red-100 text-red-700";
            case "rejected":
                return "bg-yellow-100 text-yellow-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const handleStatusChange = (id: number | null | undefined, newStatus: StatusAplicantType) => {
        const updatedApplicants = applicants.map((applicant) =>
            applicant.id === id ? { ...applicant, status: newStatus } : applicant
        );
        setApplicants(updatedApplicants);
        console.log(`Status for applicant ID ${id} updated to ${newStatus}`);
    };

    return (
        <DashboardLayout>
            <div className="flex items-center gap-x-4 mb-5 md:mb-10">
                <NavLink to="/" className="hover:bg-gray-300 rounded-full p-3 md:p-4">
                    <FaArrowLeft size={20} className="cursor-pointer md:size-25" />
                </NavLink>
                <h1 className="text-lg md:text-2xl font-semibold">Job Applicants</h1>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-md shadow-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm md:text-base">
                            <th className="p-4 border-b">Job Id</th>
                            <th className="p-4 border-b">Name/Jobseeker Id</th>
                            <th className="p-4 border-b">Role</th>
                            <th className="p-4 border-b">Job Letter</th>
                            <th className="p-4 border-b">Status</th>
                            <th className="p-4 border-b">Application Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicants.map((applicant) => (
                            <tr key={applicant.id} className="hover:bg-gray-50">
                                <td className="p-4 border-b text-sm md:text-base">
                                    {applicant.id}
                                </td>
                                <td className="p-4 border-b text-sm md:text-base">
                                    {applicant.jobseeker_id}
                                </td>
                                <td className="p-4 border-b text-sm md:text-base">
                                    {applicant.job_id}
                                </td>
                                <td className="p-4 border-b text-sm md:text-base">
                                    <a
                                        href={applicant.jobletter || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        View Letter
                                    </a>
                                </td>
                                <td className="p-4 border-b text-sm md:text-base">
                                    <select
                                        value={applicant.status as string}
                                        onChange={(e) =>
                                            handleStatusChange(applicant.id, e.target.value as StatusAplicantType)
                                        }
                                        className={`p-2 rounded-md focus:outline-none ${getStatusColor(
                                            applicant.status
                                        )}`}
                                    >
                                        <option value="process">Pending</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </td>
                                <td className="p-4 border-b text-sm md:text-base">
                                    {applicant.applied_at.toString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
};

export default Applicant;

