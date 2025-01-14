import { DataOutEmployer, DataOutJob } from "@/dataType/fetch";
import React, { useEffect, useState } from "react";
import { AiOutlineDollar } from "react-icons/ai";
import {
    FaBuilding,
    FaMapMarkedAlt,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";

const JobDetail = (
    { job, onClose }: { job: DataOutJob, onClose: () => void }
) => {
    const [employer, setEmployer] = useState<DataOutEmployer | null>(null);
    const [jobseekerId, setJobseekerId] = useState("");
    const [formData, setFormData] = useState({
        id: 0,
        job_id: 0,
        jobseeker_id: "",
        jobletter: "",
        status: "process",
        applied_at: new Date().toISOString().slice(0, 10),
    });

    useEffect(() => {
        const fetchEmployer = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (!token) {
                    console.error("No access token found");
                    return;
                }

                if (!job || !job.employer_id) {
                    console.error("No employer ID found in job");
                    return;
                }

                const response = await fetch(
                    `https://ruang-nganggur-fast-api.vercel.app/users/user/${job.employer_id}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setEmployer(data.employer);
            } catch (error) {
                console.error("Error fetching employer data:", error);
            }
        };

        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (!token) {
                    console.error("No access token found");
                    return;
                }

                const response = await fetch("https://ruang-nganggur-fast-api.vercel.app/users/profile", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setJobseekerId(data.id);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        if (job && job.employer_id) {
            fetchEmployer();
        }
        fetchProfile();
    }, [job]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("access_token");
            console.log("Token:", token);
            if (!token) {
                console.error("No access token found");
                return;
            }

            const payload = {
                ...formData,
                job_id: job.id,
                jobseeker_id: jobseekerId,
            };

            console.log("Payload:", JSON.stringify(payload));

            const response = await fetch("https://ruang-nganggur-fast-api.vercel.app/applicants/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Application submitted successfully:", data);
            alert("Application submitted successfully!");
        } catch (error) {
            console.error("Error submitting application:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-[1100px] h-[600px] bg-primary text-white p-5 rounded-2xl overflow-y-hidden">
                <div className="bg-[#2c3b63] h-[20%] p-4 rounded-xl flex justify-between items-center">
                    <div>
                        <h1 className="lg:text-4xl font-medium mb-3">{job.role}</h1>
                        <p className="flex items-center gap-x-2 text-xl">
                            <FaBuilding className="text-accents" />
                            {employer ? employer.company_name : "PT. Undefined Indonesia"}
                        </p>
                    </div>
                    <button className="text-accents" onClick={onClose}>
                        <IoMdClose size={25} />
                    </button>
                </div>
                <div className="h-[78%] w-full mt-3 lg:flex gap-x-3">
                    <div className="bg-[#2c3b63] w-2/3 p-4 rounded-xl">
                        <p className="text-2xl font-medium mb-2">Detail Pekerjaan</p>
                        <div className="flex flex-col gap-y-1">
                            <div className="flex justify-between items-center">
                                <h1 className="flex items-center gap-x-2 text-lg">
                                    <FaMapMarkedAlt className="text-accents" />
                                    Lokasi : {job.location}
                                </h1>
                            </div>
                            <div>
                                <h1 className="flex items-center gap-x-2 text-lg">
                                    <AiOutlineDollar className="text-accents " />
                                    Perkiraan Gaji : {job.salary}
                                </h1>
                            </div>
                            <div>
                                <h1 className="flex items-center gap-x-2 mb-3 text-lg">
                                    <IoDocumentTextOutline className="text-accents" /> Deskripsi
                                </h1>
                                <p className="h-[260px] text-base opacity-65 bg-[#E1ECFF] text-primary p-4 rounded-md overflow-auto">
                                    {job.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 p-4 bg-[#2c3b63] rounded-lg">
                        <div className="text-primary">
                            <form onSubmit={handleSubmit}>
                                <div className=" bg-blue-100 rounded-lg p-4 flex flex-col gap-y-6 align-middle">
                                    <textarea
                                        name="jobletter"
                                        value={formData.jobletter}
                                        onChange={handleChange}
                                        className="bg-white px-4 py-2 w-full h-32"
                                        placeholder="Motivation Letter"
                                    />
                                </div>
                                <div className="mt-6 w-full max-w-md">
                                    <button
                                        type="submit"
                                        className="bg-yellow-500 text-black w-full py-4 rounded-lg text-center"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;
