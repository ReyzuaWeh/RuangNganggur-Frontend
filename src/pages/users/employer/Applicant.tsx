import DashboardLayout from "@components/DashboardLayout";
import NotFound from "@components/NotFound";
import Pagination from "@components/Paginations";
import { DataOutApplicant } from "@dataType/fetch";
import { RoleType, StatusAplicantType } from "@dataType/khusus";
import { getStatusColor } from "@pages/ApplyStatusColor";
import { useMyProfile } from "@provider/userProvider";
import fetchJob from "@utils/fetch/jobs";
import functionSets from "@utils/function";
import OurRoute from "@utils/route";
import swalError from "@utils/swal/error";
import swalSuccess from "@utils/swal/success";
import { useEffect, useState } from "react";

type GroupedApplicants = {
    [role: string]: DataOutApplicant[];
};

const Applicant = () => {
    const { profile } = useMyProfile();
    if (profile?.role !== RoleType.employer) return <NotFound is403={true} />
    const [applicants, setApplicants] = useState<DataOutApplicant[]>([]);
    const [loading, setLoading] = useState(false)
    // State untuk menyimpan halaman (current page) untuk masing-masing grup role
    const [groupPages, setGroupPages] = useState<{ [role: string]: number }>({});

    const itemsPerPage = 4; // Ubah sesuai kebutuhan

    // Ubah status applicant di state
    const handleStatusChange = (
        id: number | null | undefined,
        newStatus: StatusAplicantType
    ) => {
        const updatedApplicants = applicants.map((applicant) =>
            applicant.id === id ? { ...applicant, status: newStatus } : applicant
        );
        setApplicants(updatedApplicants);
    };

    // Ambil data applicant
    useEffect(() => {
        fetchJob
            .getApplicant({ employer_id: profile?.employer?.id, with_detail: true })
            .then((data) => {
                setApplicants(data.reverse());
            })
            .catch(async (err) => {
                if (err.status === 404) return swalError(err.status, "No applier yet");
                if (err.status !== 404) {
                    const jsonerr = await err.json()
                    return swalError(err.status, jsonerr.detail)
                };
                console.error(err);
            });
    }, [profile?.employer?.id]);

    // Fungsi untuk menyimpan perubahan data applicant
    const onSaveData = (id: number, applicant: DataOutApplicant) => {
        setLoading(true)
        fetchJob
            .updateApplicant({ id, dataUpdate: applicant })
            .then(() => {
                swalSuccess({
                    title: "Update Success",
                    message: "Applicant status has been successfully updated",
                });
            })
            .catch(async (err) => {
                swalError(err.status, "Cannot update data applicant");
                const errdata = await err.json();
                console.error(errdata);
            }).finally(() => {
                setLoading(false)
            });
    };

    // Grouping applicants berdasarkan role job
    const groupedApplicants: GroupedApplicants = applicants.reduce((groups, applicant) => {
        const role = applicant.job?.role || "Unknown";
        if (!groups[role]) groups[role] = [];
        groups[role].push(applicant);
        return groups;
    }, {} as GroupedApplicants);

    return (
        <DashboardLayout>
            <div className="flex items-center gap-x-4 mb-5 md:mb-10">
                <h1 className="text-lg md:text-2xl font-semibold">Job Applicants</h1>
            </div>

            {!applicants.length ? (
                <div className="flex justify-center items-center bg-white rounded h-[80vh]">
                    <p className="text-center text-gray-500 text-lg">No data</p>
                </div>
            ) : Object.entries(groupedApplicants).map(([role, applicantsGroup]) => {
                // Tentukan current page untuk grup ini; default ke 1 jika belum ada.
                const totalApplicants = applicantsGroup.length
                const currentPage = groupPages[role] || 1;
                const totalPages = Math.ceil(applicantsGroup.length / itemsPerPage);
                const currentApplicants = applicantsGroup.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                );

                return (
                    <div key={role} className="mb-10 bg-white border rounded p-4">
                        <h2 className="text-xl font-bold mb-4">
                            <a href={`${OurRoute.DataRoute["Job and Applicants"]}${applicantsGroup[0].job?.id}`}>
                                {role}
                            </a>
                        </h2>

                        {/* Tampilkan data applicant dalam format grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4">
                            {currentApplicants.map((applicant, index) => (
                                <div
                                    key={applicant.id}
                                    className="bg-white rounded-md border border-primary shadow-md p-4 flex flex-col"
                                >
                                    <div className="mb-2">
                                        <div className="flex justify-between">
                                            <h3 className="font-semibold">
                                                <a
                                                    href={`${OurRoute.DataRoute["Detail User"]}${applicant.jobseeker_id}?jobseeker=true`}
                                                    target="_blank"
                                                >
                                                    {`${applicant.jobseeker?.first_name} ${applicant.jobseeker?.last_name || ""
                                                        }`}
                                                </a>
                                            </h3>
                                            {/* Tampilkan nomor urut relatif dalam grup */}
                                            <p className="text-orange-400">{(totalApplicants - ((currentPage - 1) * itemsPerPage + index))}</p>
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            {functionSets.DateToString(applicant.applied_at)}
                                        </span>
                                    </div>

                                    <div className="mb-2 text-sm">
                                        <span className="font-medium">Job Letter: </span>
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
                                    </div>

                                    <div className="mb-2">
                                        <span className="font-medium">Status: </span>
                                        <select
                                            value={applicant.status as string}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    applicant.id,
                                                    e.target.value as StatusAplicantType
                                                )
                                            }
                                            className={`p-2 rounded-md focus:outline-none ${getStatusColor(applicant.status)}`}
                                        >
                                            {Object.values(StatusAplicantType).map((status) => (
                                                <option key={status} value={status}>
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        className="btn-primary p-2 rounded mt-auto"
                                        onClick={() => onSaveData(applicant.id as number, applicant)}
                                        disabled={loading}
                                    >
                                        {loading ? "Waiting..." : "Save"}
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Tampilkan Pagination jika total halaman lebih dari 1 */}
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page: number) =>
                                    setGroupPages((prev) => ({ ...prev, [role]: page }))
                                }
                            />
                        )}
                    </div>
                );
            })}
        </DashboardLayout>
    );
};

export default Applicant;
