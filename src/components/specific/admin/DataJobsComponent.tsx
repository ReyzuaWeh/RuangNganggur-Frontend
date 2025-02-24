import DownloadPembukuanComponent from "@components/DownloadPembukuanComponent";
import JobDetail from "@components/JobDetail";
import Pagination from "@components/Paginations"; // Pastikan path-nya sesuai dengan struktur proyek Anda
import { DataOutJob } from "@dataType/fetch";
import { tahun_akhir_web, tahun_awal_web } from "@utils/BaseData";
import fetchLog from "@utils/fetch/logs";
import fetchPembukuan from "@utils/fetch/pembukuan";
import functionSets from "@utils/function";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const JobCompanyPagination = () => {
    const [dataJobs, setDataJobs] = useState<DataOutJob[]>([]);
    const [selectedJob, setSelectedJob] = useState<DataOutJob | null>(null);
    const [loading, setLoading] = useState(true);
    /*** Mengelompokkan Jobs Berdasarkan Employer ***/
    const companiesMap = dataJobs.reduce((acc, job) => {
        if (job.employer) {
            const companyId = job.employer_id as number;
            if (!acc[companyId]) {
                acc[companyId] = {
                    id: companyId,
                    name: job.employer.company_name,
                    jobs: [] as DataOutJob[],
                };
            }
            acc[companyId].jobs.push(job);
        }
        return acc;
    }, {} as { [key: number]: { id: number; name: string; jobs: DataOutJob[] } });
    const sampleCompanies = Object.values(companiesMap);
    /*** Pagination untuk Companies ***/
    const companiesPerPage = 1;
    const [companyPage, setCompanyPage] = useState(1);
    const totalCompanyPages = Math.ceil(sampleCompanies.length / companiesPerPage);
    const currentCompanies = sampleCompanies.slice(
        (companyPage - 1) * companiesPerPage,
        companyPage * companiesPerPage
    );
    /*** Opsi Tahun untuk Unduh Pembukuan ***/
    const [years, setYears] = useState<Record<number, string>>({});
    const [selectedYear, setSelectedYear] = useState(`${tahun_awal_web}/${tahun_awal_web + 1}`);
    const handleDownload = () => {
        fetchPembukuan.getPembukuanJob(
            Number(selectedYear.split("/")[0]),
            Number(selectedYear.split("/")[1])
        )
            .then(async res => {
                // Sekarang header Content-Disposition seharusnya sudah tersedia
                const contentDisposition = res.headers.get("Content-Disposition");
                let filename = "download.xlsx";
                if (contentDisposition) {
                    const match = contentDisposition.match(/filename="(.+?)"/);
                    if (match) {
                        filename = match[1];
                    }
                }
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
                Swal.fire({
                    title: "Success!",
                    text: `Pembukuan ${selectedYear} berhasil diunduh.`,
                    icon: "success",
                });
            })
            .catch(async error => {
                if (error.status) {
                    const message = await error.json()
                    Swal.fire({
                        title: "Error!",
                        text: `Gagal mengunduh pembukuan: ${message.detail}`,
                        icon: "error",
                    });
                }
                console.error("Error downloading pembukuan:", error);
            });
    };
    const handlePreview = () => {
        setLoading(true)
        fetchLog.getJobsHistory(Number(selectedYear.split("/")[0]),
            Number(selectedYear.split("/")[1]), {
            with_owner: true
        }).then(data => {
            setDataJobs(data)
            setCompanyPage(1)
        }).catch(error => {
            console.error("Error fetching jobs:", error);
        }).finally(() => setLoading(false))
    }
    const confirmDownload = () => {
        Swal.fire({
            title: "Download Pembukuan",
            text: `Apakah Anda yakin ingin mengunduh pembukuan untuk tahun ${selectedYear}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                handleDownload();
            }
        });
    }
    /*** Pagination untuk Jobs per Company ***/
    // Setiap perusahaan menampilkan maksimal 6 job (grid 3 kolom x 2 baris)
    const jobsPerPage = 6;
    const [companyJobPages, setCompanyJobPages] = useState<{ [companyId: number]: number }>({});
    useEffect(() => {
        fetchLog.getJobsHistory(Number(selectedYear.split("/")[0]),
            Number(selectedYear.split("/")[1]), {
            with_owner: true
        }).then(data => {
            setDataJobs(data)
            setCompanyPage(1)
        }).catch(error => {
            console.error("Error fetching jobs:", error);
        }).finally(() => setLoading(false))
        Array.from({ length: tahun_akhir_web - tahun_awal_web }).forEach((_, index) => {
            setYears(prev => ({
                ...prev,
                [tahun_awal_web + index]: `${tahun_awal_web + index}/${tahun_awal_web + index + 1}`
            }))
        })
    }, [])
    return (
        <div className="max-w-full mx-auto p-4 space-y-8">
            <section>
                <h2 className="text-2xl font-semibold mb-4">Data Jobs</h2>
                <div className="space-y-4">
                    {!dataJobs.length ? loading ? (
                        <div className="bg-white p-4 flex justify-center items-center rounded shadow border space-y-4 min-h-[25vh]">
                            Fetching data.....
                        </div>
                    ) : (
                        <div className="bg-white p-4 flex justify-center items-center rounded shadow border space-y-4 min-h-[25vh]">
                            No data for these years
                        </div>
                    ) : currentCompanies.map((company) => {
                        // Mengambil halaman aktif untuk job pada perusahaan ini, default ke 1
                        const currentJobPage = companyJobPages[company.id] || 1;
                        const totalJobPages = Math.ceil(company.jobs.length / jobsPerPage);
                        const currentJobs = company.jobs.slice(
                            (currentJobPage - 1) * jobsPerPage,
                            currentJobPage * jobsPerPage
                        );
                        return (
                            <div key={company.id} className="bg-white p-4 rounded shadow border space-y-4">
                                {/* Header Company */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                    <div>
                                        <h3 className="font-semibold text-lg">{company.name}</h3>
                                        <p className="text-gray-600 text-sm">
                                            {company.jobs.length} jobs
                                        </p>
                                    </div>
                                </div>
                                {/* Daftar Job (Grid 3x2) */}
                                {company.jobs.length > 0 && (
                                    <div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {currentJobs.map((job) => {
                                                return (
                                                    <div key={job.id} className="border flex flex-col rounded-lg p-4 shadow-md text-sm">
                                                        <p>
                                                            <strong>Role:</strong> {job.role}
                                                        </p>
                                                        <p>
                                                            <strong>Location:</strong> {job.location}
                                                        </p>
                                                        <p>
                                                            <strong>Salary:</strong>{" "}
                                                            {job.salary ? functionSets.formatNumbertoIDR(job.salary) : "No Salary"}
                                                        </p>
                                                        <p>
                                                            <strong>Type:</strong> {functionSets.capitalizeFirstLetter(job.type_job?.replace(/_/g, " ") || "")}
                                                        </p>
                                                        <p className="w-full text-end">
                                                            <span className="font-semibold">Close :</span>{" "}
                                                            {job.close_date
                                                                ? functionSets.formatDatetoString(job.close_date)
                                                                : "N/A"}
                                                        </p>
                                                        <button
                                                            onClick={() => setSelectedJob(job)}
                                                            className="bg-blue-600 hover:bg-blue-900 transition-all self-end text-white py-1 px-3 mt-2 rounded w-full"
                                                        >
                                                            Detail
                                                        </button>
                                                    </div>
                                                )
                                            }
                                            )}
                                        </div>
                                        {/* Pagination untuk Job (jika lebih dari 6 job) */}
                                        {totalJobPages > 1 && (
                                            <div className="flex items-center justify-center gap-4 mt-4">
                                                <Pagination
                                                    currentPage={currentJobPage}
                                                    totalPages={totalJobPages}
                                                    onPageChange={(page) =>
                                                        setCompanyJobPages((prev) => ({ ...prev, [company.id]: page }))
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                {selectedJob && (<JobDetail job={selectedJob} onClose={() => setSelectedJob(null)} />)}
                {/* Pagination dan Unduh Pembukuan untuk Companies */}
                <div className="flex flex-col md:flex-row items-center justify-between mt-4">
                    {Boolean(totalCompanyPages) && <Pagination
                        currentPage={companyPage}
                        totalPages={totalCompanyPages}
                        onPageChange={setCompanyPage}
                    />}
                    <DownloadPembukuanComponent
                        years_option={years}
                        setSelectedYear={setSelectedYear}
                        handlePreview={handlePreview}
                        handleConfirmDownload={confirmDownload}
                    />
                </div>
            </section>
        </div>
    );
};

export default JobCompanyPagination;
