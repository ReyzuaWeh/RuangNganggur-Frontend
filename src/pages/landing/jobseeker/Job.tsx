import JobCard from "@components/JobCard";
import JobDetail from "@components/JobDetail";
import LandingLayout from "@components/LandingLayout";
import Pagination from "@components/Paginations";
import { DataOutJob } from "@dataType/fetch";
import fetchJob from "@utils/fetch/jobs";
import { useEffect, useState } from "react";

const Job = () => {
    const [jobs, setJobs] = useState<DataOutJob[]>([]); // State untuk menyimpan data job dari API
    const [selectedJob, setSelectedJob] = useState<DataOutJob | null>(null);
    const [filter, setFilter] = useState({
        roleOrEmployer: "",
        location: ""
    })
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 12;

    // Fungsi untuk mengambil data dari API
    const getJobs = fetchJob.getJobs

    // Hitung jumlah halaman total
    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    // Filter data untuk halaman saat ini
    const currentJobs = jobs.slice(
        (currentPage - 1) * jobsPerPage,
        currentPage * jobsPerPage
    );

    // Fungsi untuk menangani perubahan halaman
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFilter({
            ...filter,
            [name]: value
        })
    }
    useEffect(() => {
        getJobs({ with_owner: true }).then(e => {
            setJobs(e.reverse())
        }).catch((error) => {
            console.error("Error fetching jobs:", error);
        })
    }, []);
    return (
        <LandingLayout>
            <div className="bg-gradient-home text-white py-8">
                <form
                    className="flex flex-col justify-center items-center"
                    onSubmit={(e) => {
                        e.preventDefault();
                        getJobs({
                            ...filter,
                            with_owner: true
                        }).then(e => {
                            setJobs(e.reverse())
                        }).catch((error) => {
                            console.error("Error fetching jobs:", error);
                        })
                    }}
                >
                    <div className="bg-gray-300 p-4 mb-4 rounded-lg">
                        <h1 className="text-4xl text-accents font-semibold">
                            Ruang<span className="text-primary">Nganggur.</span>
                        </h1>
                    </div>

                    <div className="flex lg:flex-row flex-col mx-0 lg:mx-auto items-center gap-2 justify-center">
                        <input
                            type="text"
                            name="roleOrEmployer"
                            value={filter.roleOrEmployer}
                            className="bg-white text-primary w-full lg:w-1/2 p-2 rounded outline-none"
                            placeholder="Role or Company Name"
                            onChange={handleFilter}
                        />
                        <div className="lg:w-1/2 w-full flex flex-0 justify-between gap-x-2">
                            <input
                                type="text"
                                name="location"
                                value={filter.location}
                                className="bg-white text-primary w-3/4 p-2 rounded outline-none"
                                placeholder="Location"
                                onChange={handleFilter}
                            />
                            <button className="bg-accents p-2 w-1/4 rounded-lg text-primary text-sm">
                                Cari
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Tampilkan data job */}
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {currentJobs.map((job: DataOutJob) => (
                    <div className="flex justify-center md:mx-auto mx-0 min-w-full">
                        <JobCard
                            key={job.id}
                            role={job.role} // Gunakan properti dari respons API
                            company={`Company Name : ${job.employer?.company_name || "PT Undefined Indonesia"}`}
                            location={job.location}
                            salary={job.salary}
                            description={job.description || "...."}
                            onDetailClick={() => setSelectedJob(job)}
                        />
                    </div>
                ))}
            </div>

            {/* Tampilkan detail job jika ada */}
            {selectedJob && (<JobDetail job={selectedJob} onClose={() => setSelectedJob(null)} />)}

            {/* Pagination */}
            <div className="flex items-center justify-between p-4">
                <div className="p-4 text-center">
                    <p className="text-sm text-gray-600">
                        Showing {currentPage} of {totalPages} pages
                    </p>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </LandingLayout>
    );
};

export default Job;
