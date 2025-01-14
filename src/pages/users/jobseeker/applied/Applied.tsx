import DashboardLayout from "@components/DashboardLayout";
import { DataOutApplicant } from "@dataType/fetch";
import { StatusAplicantType } from "@dataType/khusus";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Applied = () => {
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = "Bearer " + localStorage.getItem("access_token"); // Ganti dengan token Anda

    // Fetch data from API
    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await fetch("https://ruang-nganggur-fast-api.vercel.app/applicants", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch applicants");
                }

                const data = await response.json();
                setApplicants(data);
            } catch (error) {
                console.error("Error fetching applicants:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplicants();
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
                <NavLink to="/" className="hover:bg-gray-300 rounded-full p-3 md:p-4">
                    <FaArrowLeft size={20} className="cursor-pointer md:size-25" />
                </NavLink>
                <h1 className="text-lg md:text-2xl font-semibold">Job Applicants</h1>
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
                            {applicants.map((applicant: DataOutApplicant) => (
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
